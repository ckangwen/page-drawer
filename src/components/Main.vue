<template>
  <el-main style="padding-top: 0;">
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
  </el-main>
</template>
<script lang="ts">
import { AppState, EditorMutation, EditorState } from "@/store/type";
import { defineComponent, ref } from "@vue/composition-api";
import shortid from "shortid";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import Renderer from "@/components/Renderer";
import SchemaForm from "@ckangwen/schema-form";
import StyleFormWidget from "@/components/StyleFormWidget.vue";
import { getInitialComponentData, ROOT_ID as _ROOT_ID } from "@/libs";
import randomColor from "randomcolor";
export default defineComponent({
  name: "AppMain",
  components: {
    Renderer,
    SchemaForm,
    StyleFormWidget
  },
  setup() {
    const { mode } = useNamespacedState<EditorState>("editor", ["mode"]);
    const { stylePanelVisible, canvasSize } = useNamespacedState<AppState>(
      "app",
      ["stylePanelVisible", "canvasSize"]
    );

    const {
      addChildren,
      addComponent,
      setCurrentUuid
    } = useNamespacedMutations<EditorMutation>("editor", [
      "addChildren",
      "addComponent",
      "setCurrentUuid",
      "updateClass",
      "updateStyle",
      "deleteComponent"
    ]);

    const ROOT_ID = ref(_ROOT_ID);
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

      const domInfo = getInitialComponentData()

      const uuid = shortid.generate();
      setCurrentUuid(uuid);
      domInfo.id = uuid;

      const key = container?.id || _ROOT_ID;

      domInfo.style = {
        width: `${width}px`,
        height: `${height}px`,
        background: randomColor()
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
    };

    return {
      ROOT_ID,
      containerEl,
      selector,
      onDragStart,
      onDragMove,
      onDragEnd,

      stylePanelVisible,
      canvasSize
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
  height: 100%;
  margin: 0 auto;
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
