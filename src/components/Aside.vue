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
      </el-tab-pane>
    </el-tabs>

    <ContextMenu ref="contextmenu">
      <li class="contextmenu-item" @click="deleteNode">删除</li>
      <li class="contextmenu-item" @click="editStyle">修改样式</li>
    </ContextMenu>
  </el-aside>
</template>
<script lang="ts">
import { CreateElement } from "vue";
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import ContextMenu from "vue-context-menu";
import { EditorMutation, EditorState } from "@/store/type";
import { ROOT_ID, transformToTree } from "@/libs";
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
    const { setStylePanelVisible } = useNamespacedMutations("app", [
      "setStylePanelVisible"
    ]);
    const {
      setEditorMode,
      setCurrentUuid,
      deleteComponent
    } = useNamespacedMutations<EditorMutation>("editor", [
      "setEditorMode",
      "setCurrentUuid",
      "deleteComponent",
      "updateStyle"
    ]);
    const width = ref(200);
    const tabName = ref("tree");
    watch(
      tabName,
      val => {
        if (val === "tree") {
          width.value = 200;
        }
      },
      { immediate: true }
    );
    const tree = computed(() => {
      console.log(componentData.value);
      return transformToTree(componentData.value, [ROOT_ID]);
    });
    // const tree = ref({});
    // watch(
    //   componentData,
    //   val => {
    //     if (val) {
    //       tree.value = transformToTree(val, [ROOT_ID]);
    //     }
    //     Vue.nextTick();
    //   },
    //   { immediate: true }
    // );
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
    const editStyle = () => {
      setStylePanelVisible(true);
    };

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
      editStyle
    };
  }
});
</script>
<style lang="scss" scoped>
.aside {
  height: 100vh;

  .trigger {
    display: inline-block;
    height: 40px;
    width: 55px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .tab {
    border: 0;
    height: calc(100vh - 40px);
    box-shadow: none;
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
