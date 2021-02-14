<template>
  <el-aside class="aside" :width="width + 'px'">
    <div class="trigger" @click="triggleMode">
      <span :class="stateIcon"></span>
    </div>
    <el-tabs
      class="tab"
      tab-position="left"
      type="border-card"
      v-model="tabName"
    >
      <el-tab-pane name="tree">
        <span slot="label">
          <el-tooltip
            class="item"
            effect="dark"
            content="组件树"
            placement="right"
          >
            <i class="iconfont c-tree"></i>
          </el-tooltip>
        </span>
        <el-tree
          :data="tree"
          nodeKey="id"
          :defaultExpandAll="true"
          :renderContent="renderContent"
          :indent="10"
          @node-contextmenu="onTreeNodeContextmenu"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane name="template">
        <span slot="label">
          <el-tooltip
            class="item"
            effect="dark"
            content="模板"
            placement="right"
          >
            <i class="iconfont c-template"></i>
          </el-tooltip>
        </span>
        <div class="template-tab-content">
          <div class="cell" v-for="(item) in LayoutTemplateList" :key="item.name" @click="selectTemplate(item)">
            <span class="icon el-icon-help"></span>
            <div>{{ item.title }}</div>
          </div>
          <div class="cell">
            <input type="file" name="file" class="file-input" @change="onUploadTemplate">
            <span class="icon iconfont c-plus"></span>
            <div>添加模板</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <ContextMenu ref="contextmenu">
      <li class="contextmenu-item" @click="deleteNode">删除</li>
    </ContextMenu>
  </el-aside>
</template>
<script lang="ts">
import { CreateElement } from "vue";
import { computed, defineComponent, ref } from "@vue/composition-api";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import ContextMenu from "vue-context-menu";
import { EditorMutation, EditorState } from "@/store/type";
import { ROOT_ID, transformToTree } from "@/libs";
import LayoutTemplates, { LayoutTemplateType } from '@/libs/layout-templates'
import Vue from "vue";

export default defineComponent({
  name: "Aside",
  components: {
    ContextMenu
  },
  setup() {
    const { mode, componentData, currentUuid } = useNamespacedState<
      EditorState
    >("editor", ["mode", "componentData", "currentUuid"]);
    const {
      setEditorMode,
      setCurrentUuid,
      deleteComponent,
      setComponentData
    } = useNamespacedMutations<EditorMutation>("editor", [
      "setEditorMode",
      "setComponentData",
      "setCurrentUuid",
      "deleteComponent",
      "updateStyle"
    ]);
    const width = ref(200);
    const tabName = ref("tree");
    const tree = computed(() => {
      return transformToTree(componentData.value, [ROOT_ID]);
    });
    const renderContent = (h: CreateElement, { node }: any) => {
      return h("div", {}, [node.data.id]);
    };

    const stateIcon = computed(() => {
      return mode.value === "read" ? "iconfont c-readonly" : "iconfont c-rect";
    });
    const triggleMode = () => {
      const nextMode = mode.value === "edit" ? "read" : "edit";
      setEditorMode(nextMode);
    };

    const contextmenu = ref<any>(null);
    const onTreeNodeContextmenu = (e: MouseEvent, node: any) => {
      setCurrentUuid(node.id);
      if (contextmenu.value) {
        contextmenu.value.open();
      }
    };
    const deleteNode = () => {
      deleteComponent({
        key: currentUuid.value
      });
      Vue.nextTick();
    };


    const list = Object.keys(LayoutTemplates).map(k => {
      return {
        name: k,
        ...(LayoutTemplates[k])
      }
    })
    const LayoutTemplateList = ref(list)
    const selectTemplate = (item: LayoutTemplateType) => {
      if (item.template) {
        setComponentData(item.template)
      }
    }
    const onUploadTemplate = (event: any) => {
      const files = event.target.files
      if (!files || !files.length) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const config = event.target ?  event.target.result : ''
          // TODO check template
          if (typeof config === 'string') {
            LayoutTemplateList.value.push({
              name: `upload${Date.now()}`,
              title: 'upload',
              template: JSON.parse(config) as any
            })
          }
          return config
        } catch (e) {
          throw new Error(e)
        }
      }
      reader.readAsText(files[0])
    }

    return {
      stateIcon,
      triggleMode,
      tabName,
      width,
      renderContent,
      tree,
      contextmenu,
      onTreeNodeContextmenu,
      deleteNode,
      LayoutTemplateList,
      selectTemplate,
      onUploadTemplate
    };
  }
});
</script>
<style>
.el-tabs--border-card>.el-tabs__content {
  padding: 10px !important;
}
</style>
<style lang="scss" scoped>
.aside {
  height: calc(100vh - 60px);

  .trigger {
    display: inline-block;
    height: 40px;
    width: 57px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
  }
  .tab {
    border: 0;
    height: calc(100vh - 100px);
    box-shadow: none;
  }
}

.template-tab-content {
  display: flex;
  flex-wrap: wrap;

  .cell {
    position: relative;
    width: 50%;
    padding: 10px 0;
    border-radius: 7px;
    cursor: pointer;
    font-size: 12px;
    text-align: center;

    .icon {
      font-size: 25px;
    }

    &:hover {
      background: #e2eaf3;
      color: #409EFF;
    }

    .file-input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

.contextmenu-item {
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
