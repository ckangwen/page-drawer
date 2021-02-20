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
      <Codemirror :code="code" :mode="mode" @change="onCodeChange" />
      <div class="code-bottom">
        <el-button type="primary" style="width: 120px;" @click="downloadFile">下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import {
  useNamespacedState,
  useNamespacedMutations
} from "vuex-composition-helpers";
import SchemaForm from "@ckangwen/schema-form";

import Codemirror from "@/components/Codemirror.vue";
import { AppMutations, AppState, EditorMutation, EditorState } from "@/store/type";
import { generateFormattedCode } from "@/libs";
import { saveAs } from 'file-saver'
import { WidgetBuilder } from '@/libs/widgets/WidgetBuilder';

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
    const { updateComponentName, deleteStyleProperty } = useNamespacedMutations<EditorMutation>(
      "editor",
      ["updateComponentName", "updateClass", "updateStyle", "deleteStyleProperty"]
    );

    const {
      codeDialogVisible,
      widgetDrawerVisible,
      codeActionType
    } = useNamespacedState<AppState>(
      "app",
      [
        "codeDialogVisible",
        "widgetDrawerVisible",
        "codeActionType"
      ]
    );

    const { setCodeDialogVisible, setWidgetDrawerVisible } = useNamespacedMutations<AppMutations>("app", [
      "setCodeDialogVisible",
      "setWidgetDrawerVisible"
    ]);

    const onDrawerVisibleChange = (val: boolean) => {
      setWidgetDrawerVisible(val)
    }
    const list = WidgetBuilder.widgetList;

    const onSelectWidget = (item: any) => {
      deleteStyleProperty({
        key: currentUuid.value,
        prop: 'background'
      })
      updateComponentName({
        key: currentUuid.value,
        componentName: item.name,
      });
      setWidgetDrawerVisible(false)
    };

    /* code */
    const code = ref("");
    const mode = ref("text/x-vue")
    const onCodeVisibleChange = (val: boolean) => {
      setCodeDialogVisible({
        visible: val
      })
    }
    watch(codeDialogVisible, val => {
      if (val) {
        if (codeActionType.value === 'code') {
          mode.value = "text/x-vue"
          const codeStr = generateFormattedCode(componentData.value);
          code.value = codeStr
        }
        if (codeActionType.value === 'structure') {
          mode.value = "application/json"
          code.value = JSON.stringify(componentData.value, null, 2)
        }
      }
    });

    const onCodeChange = (val: any) => {
      code.value = val;
    };
    const onCodeDialogClose = () => {
      setCodeDialogVisible({
        visible: false
      });
    };
    const onCodeDialogOpen = () => {
      //
    };

    const downloadFile = () => {
      const blob = new Blob([code.value], { type: 'text/plain;charset=utf-8' })
      let fileName = `${Date.now()}.vue`
      if (codeActionType.value === 'structure') {
        fileName = `${Date.now()}.json`
      }
      saveAs(blob, fileName)
    }

    return {
      widgetDrawerVisible,
      onDrawerVisibleChange,
      list,
      onSelectWidget,
      code,
      mode,
      codeDialogVisible,
      onCodeVisibleChange,
      onCodeChange,
      onCodeDialogClose,
      onCodeDialogOpen,
      downloadFile
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
