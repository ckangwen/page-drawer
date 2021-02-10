<template>
  <el-main>
    <div class="header">
      <el-form inline size="small">
        <el-form-item label="width">
          <el-input style="width: 100px" v-model="canvasSize.width"></el-input>
        </el-form-item>
        <el-form-item label="height">
          <el-input style="width: 100px" v-model="canvasSize.height"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      ref="containerEl"
      class="draw-content"
      :style="{
        width: canvasSize.width
      }"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
    >
      <div class="area-selector" ref="selector"></div>
      <Renderer :keys="[ROOT_ID]" />
    </div>

    <div class="btn"></div>

    <el-dialog
      :visible.sync="styleVisible"
      title="Style Edit"
      width="70%"
      @close="onDialogClose"
      @open="onDialogOpen"
    >
      <schema-form
        :formProps="{ 'label-position': 'top' }"
        v-model="schemaFormValue"
        :schema="schema"
        :widgets="schemaFormWidgets"
      ></schema-form>
      <el-button type="primary" @click="onCancal">取消</el-button>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-dialog>
  </el-main>
</template>
<script lang="ts">
import {
  AppMutations,
  AppState,
  EditorMutation,
  EditorState
} from "@/store/type";
import { defineComponent, ref, watch } from "@vue/composition-api";
import shortid from "shortid";
import {
  useNamespacedGetters,
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import Renderer from "@/components/Renderer";
import SchemaForm from "@ckangwen/schema-form";
import StyleFormWidget from "@/components/StyleFormWidget.vue";
import { AtomicClassNames, ROOT_ID as _ROOT_ID } from "@/libs";

const COLORS = [
  "#5237D8",
  "#46BD6F",
  "#AF4A86",
  "#FF8C00",
  "#EE3A8C",
  "#8470FF",
  "#FFD700",
  "#7D26CD",
  "#7FFFD4",
  "#008B8B"
];

export default defineComponent({
  name: "AppMain",
  components: {
    Renderer,
    SchemaForm,
    StyleFormWidget
  },
  setup() {
    const { mode } = useNamespacedState<EditorState>("editor", ["mode"]);
    const { currentComponent } = useNamespacedGetters("editor", [
      "currentComponent"
    ]);
    const { stylePanelVisible } = useNamespacedState<AppState>("app", [
      "stylePanelVisible"
    ]);
    const { setStylePanelVisible } = useNamespacedMutations<AppMutations>(
      "app",
      ["setStylePanelVisible"]
    );

    const styleVisible = ref(stylePanelVisible.value);
    watch(stylePanelVisible, val => {
      styleVisible.value = val;
    });

    const {
      addChildren,
      addComponent,
      setCurrentUuid,
      updateClass,
      updateStyle,
      deleteComponent
    } = useNamespacedMutations<EditorMutation>("editor", [
      "addChildren",
      "addComponent",
      "setCurrentUuid",
      "updateClass",
      "updateStyle",
      "deleteComponent"
    ]);

    const ROOT_ID = ref(_ROOT_ID);
    const canvasSize = ref({
      width: "100%",
      height: "100%"
    });
    const currentUuid = ref("");
    let isDragging = false;
    const startClient = ref({
      x: 0,
      y: 0
    });
    const dragStartTimeoutId = -1;
    let timeStamp = -1;
    const containerEl = ref<HTMLElement | null>(null);
    const selector = ref<HTMLElement | null>(null);

    const clearDrawState = () => {
      clearTimeout(dragStartTimeoutId);
      isDragging = false;
      if (selector.value) {
        selector.value.style.display = "none";
      }
    };

    const onDragStart = (e: MouseEvent) => {
      e.stopPropagation();
      if (mode.value === "read" || isDragging) return;

      isDragging = true;
      startClient.value.x = e.clientX;
      startClient.value.y = e.clientY;

      timeStamp = Date.now();

      if (selector.value) {
        selector.value.style.cssText = `display:block;
          left:${startClient.value.x}px;
          top:${startClient.value.y}px
          width:0;
          height:0;`;
      }
    };

    const onDragMove = (e: MouseEvent) => {
      e.stopPropagation();

      if (!isDragging) {
        clearDrawState();
        return;
      }

      const moveWidth = Math.abs(e.clientX - startClient.value.x);
      const moveHeight = Math.abs(e.clientY - startClient.value.y);

      const top =
        e.clientY < startClient.value.y ? e.clientY : startClient.value.y;
      const left =
        e.clientX < startClient.value.x ? e.clientX : startClient.value.x;

      if (top < 10 || left < 10) {
        clearDrawState();
        return;
      }

      if (selector.value) {
        selector.value.style.height = `${moveHeight}px`;
        selector.value.style.width = `${moveWidth}px`;
        selector.value.style.left = `${left}px`;
        selector.value.style.top = `${top}px`;
        selector.value.style.zIndex = "500";

        if (Date.now() - timeStamp > 600) {
          selector.value.style.background = "#67c23a";
          selector.value.style.border = "1px solid #67c23a";
        }
      }
    };

    const isFirstDraw = ref(false);

    const onDragEnd = (e: MouseEvent) => {
      e.stopPropagation();
      if (!isDragging) return;

      if (Date.now() - timeStamp < 600) {
        clearDrawState();
        return;
      }

      const container = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;

      if (!container) return;

      const width = Math.abs(e.clientX - startClient.value.x);
      const height = Math.abs(e.clientY - startClient.value.y);

      const domInfo = {
        id: "",
        class: [],
        style: {},
        children: [],
        componentName: "div",
        parentId: ""
      };

      const uuid = isFirstDraw.value ? "0" : shortid.generate();
      currentUuid.value = uuid;
      setCurrentUuid(uuid);
      domInfo.id = uuid;

      const randomIndex = Math.floor(Math.random() * 10);
      const key = container?.id || _ROOT_ID;

      domInfo.style = {
        width: `${width}px`,
        height: `${height}px`,
        background: COLORS[randomIndex]
      };

      addComponent({
        key: uuid,
        node: domInfo
      });

      addChildren({
        parentKey: key,
        childKey: uuid
      });

      clearDrawState();
      setStylePanelVisible(true);
    };

    const schema = ref({
      class: {
        title: "ClassName",
        type: "array",
        "ui-widget": "select",
        enums: AtomicClassNames
      },
      style: {
        title: "Style",
        type: "style"
      }
    });
    const schemaFormValue = ref({
      class: [],
      style: {}
    });
    const schemaFormWidgets = {
      style: StyleFormWidget
    };
    const submitForm = () => {
      const val = schemaFormValue.value;
      if (currentUuid.value && val) {
        if (val.class && val.class.length > 0) {
          updateClass({
            key: currentUuid.value,
            classNames: val.class
          });
        }
        if (val.style) {
          updateStyle({
            key: currentUuid.value,
            style: val.style
          });
        }
      }

      setStylePanelVisible(false);
    };

    const onCancal = () => {
      clearDrawState();
      deleteComponent({
        key: currentUuid.value
      });
    };
    const onDialogClose = () => {
      schemaFormValue.value = {
        class: [],
        style: {}
      };
      setStylePanelVisible(false);
    };
    const onDialogOpen = () => {
      schemaFormValue.value = currentComponent.value.style;
    };

    return {
      ROOT_ID,
      containerEl,
      selector,
      onDragStart,
      onDragMove,
      onDragEnd,

      styleVisible,
      stylePanelVisible,
      canvasSize,

      schema,
      schemaFormValue,
      schemaFormWidgets,
      submitForm,

      onCancal,
      onDialogClose,
      onDialogOpen
    };
  }
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 50px;
}
.draw-content {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .area-selector {
    background: #598fe6;
    position: fixed;
    width: 0;
    height: 0;
    display: none;
    top: 0;
    left: 0;
    opacity: 0.6;
    pointer-events: none;
  }

  .flexbox-root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
  }
}
</style>
