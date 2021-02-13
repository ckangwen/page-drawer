<template>
  <el-header class="header">
    <el-form inline size="small">
      <el-form-item label="width">
        <el-input style="width: 100px" v-model="size.width"></el-input>
      </el-form-item>
      <el-form-item label="height">
        <el-input style="width: 100px" v-model="size.height"></el-input>
      </el-form-item>
    </el-form>
    <div class="action">
      <div class="action-item" @click="showCode">
        <span class="iconfont c-code"></span>
      </div>
    </div>
  </el-header>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import { AppMutations, AppState } from "../store/type";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const { canvasSize } = useNamespacedState<AppState>("app", ["canvasSize"]);
    const { setCanvasSize, setCodeDialogVisible } = useNamespacedMutations<
      AppMutations
    >("app", ["setCanvasSize", "setCodeDialogVisible"]);

    const size = ref(canvasSize.value);
    watch(
      size,
      val => {
        setCanvasSize(val);
      },
      { deep: true }
    );

    const showCode = () => {
      setCodeDialogVisible(true);
    };

    return {
      size,
      showCode
    };
  }
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.action {
  .action-item {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
  }
}
</style>
