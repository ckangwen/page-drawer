<template>
  <div class="overlay" :style="overlayStyle">
    <div class="btn"></div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from "@vue/composition-api";
import { useNamespacedState } from "vuex-composition-helpers";

export default defineComponent({
  name: "EditableOverlay",
  setup() {
    const { hoveredUuid } = useNamespacedState("editor", ["hoveredUuid"]);
    const initialStyle = {
      top: "-100px",
      left: "-100px"
    };
    const overlayStyle = computed(() => {
      if (!hoveredUuid.value) return initialStyle;
      const rect = document
        .getElementById(hoveredUuid.value)
        ?.getBoundingClientRect();
      if (rect) {
        return {
          width: Number(rect.width) + "px",
          height: Number(rect.height) + "px",
          top: Number(rect.top) + "px",
          left: Number(rect.left) + "px"
        };
      } else {
        return initialStyle;
      }
    });

    const onClick = e => {
      e.stopPropagation();
      console.log(hoveredUuid.value);
    };

    return {
      overlayStyle,
      onClick
    };
  }
});
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  background: rgba(104, 182, 255, 0.35);
  z-index: 2000;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}
.btn {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 45px;
  background: rgba(104, 182, 255, 0.9);
  border-radius: 100%;
  z-index: 2021;
  &::before {
    content: " ";
    position: absolute;
    width: 60%;
    height: 6px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 4px;
  }
  &::after {
    content: " ";
    position: absolute;
    height: 60%;
    width: 6px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 4px;
  }
}
</style>
