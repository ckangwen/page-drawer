<template>
  <div>
    <el-drawer title="我是标题" :visible="widgetDrawerVisible" @update:visible="onDrawerVisibleChange" direction="ltr">
      <div>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
          @click="onSelectWidget(item)"
        >
          <span :class="item.icon"></span>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </el-drawer>
    <!-- code -->
    <el-dialog
      :visible="codeDialogVisible"
      @update:visible="onCodeVisibleChange"
      title="Code Edit"
      width="70%"
      @close="onCodeDialogClose"
      @open="onCodeDialogOpen"
    >
      <Codemirror :code="code" @change="onCodeChange" />
      <div class="code-bottom">
        <el-button type="primary" style="width: 120px;">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { defineComponent, ref, watch } from "@vue/composition-api";
import {
  useNamespacedState,
  useNamespacedMutations
} from "vuex-composition-helpers";
import SchemaForm from "@ckangwen/schema-form";

import Codemirror from "@/components/Codemirror.vue";
import widgetCenter from "@/libs/widgets";
import { AppMutations, EditorMutation, EditorState } from "@/store/type";
import { generateFormattedCode } from "@/libs";

export default defineComponent({
  name: "Bottom",
  components: {
    SchemaForm,
    Codemirror
  },
  setup() {
    const { currentUuid, componentData } = useNamespacedState<EditorState>(
      "editor",
      ["currentUuid", "componentData"]
    );
    const { updateComponentName } = useNamespacedMutations<EditorMutation>(
      "editor",
      ["updateComponentName", "updateClass", "updateStyle"]
    );

    const { codeDialogVisible, widgetDrawerVisible } = useNamespacedState(
      "app",
      ["codeDialogVisible", "widgetDrawerVisible"]
    );

    const { setCodeDialogVisible, setWidgetDrawerVisible } = useNamespacedMutations<AppMutations>("app", [
      "setCodeDialogVisible",
      "setWidgetDrawerVisible"
    ]);

    const onDrawerVisibleChange = (val: boolean) => {
      setWidgetDrawerVisible(val)
    }
    const list = widgetCenter.widgetList;

    const onSelectWidget = (item: any) => {
      updateComponentName({
        key: currentUuid.value,
        componentName: item.template,
        templateName: item.templateName
      });
      setWidgetDrawerVisible(false)
      Vue.nextTick();
    };

    /* code */
    const code = ref("");
    const onCodeVisibleChange = (val: boolean) => {
      setCodeDialogVisible(val)
    }
    watch(codeDialogVisible, val => {
      if (val) {
        const codeStr = generateFormattedCode(componentData.value);
        code.value = codeStr
      }
    });

    const onCodeChange = (val: any) => {
      code.value = val;
    };
    const onCodeDialogClose = () => {
      setCodeDialogVisible(false);
    };
    const onCodeDialogOpen = () => {
      //
    };

    return {
      widgetDrawerVisible,
      onDrawerVisibleChange,
      list,
      onSelectWidget,
      code,
      codeDialogVisible,
      onCodeVisibleChange,
      onCodeChange,
      onCodeDialogClose,
      onCodeDialogOpen
    };
  }
});
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}
.code-bottom {
  margin-top: 10px;
}
</style>
