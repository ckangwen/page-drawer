<template>
  <el-header class="header">
    <div class="header__left">
      <el-form inline size="small">
        <el-form-item label="width">
          <el-input style="width: 100px" v-model="size.width"></el-input>
        </el-form-item>
        <el-form-item label="height">
          <el-input style="width: 100px" v-model="size.height"></el-input>
        </el-form-item>
      </el-form>
      <div class="header__left-extra">
        <div class="item">
          <span class="iconfont c-mobile" @click="setMobileSize"></span>
        </div>
        <div class="item">
          <span class="iconfont c-desktop" @click="setDesktopSize"></span>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="action-item" @click="clear">
        <span class="iconfont c-clear"></span>
      </div>
      <div class="action-item" @click="showStructure">
        <span class="iconfont c-structure"></span>
      </div>
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
import { AppMutations, AppState, EditorMutation } from "../store/type";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const { canvasSize } = useNamespacedState<AppState>("app", ["canvasSize"]);
    const { setCanvasSize, setCodeDialogVisible } = useNamespacedMutations<
      AppMutations
    >("app", ["setCanvasSize", "setCodeDialogVisible"]);
    const {
      clearComponentData
    } = useNamespacedMutations<EditorMutation>('editor', ['clearComponentData'])

    const size = ref(canvasSize.value);
    watch(
      size,
      val => {
        setCanvasSize(val);
      },
      { deep: true }
    );

    const showCode = () => {
      setCodeDialogVisible({
        visible: true,
        action: 'code'
      });
    };
    const showStructure = () => {
      setCodeDialogVisible({
        visible: true,
        action: 'structure'
      });
    }
    const clear = () => {
      clearComponentData()
    }
    const setMobileSize = () => {
      setCanvasSize({
        width: "365px",
        height: "100%"
      })
    }
    const setDesktopSize = () => {
      setCanvasSize({
        width: "100%",
        height: "100%"
      })
    }


    return {
      size,
      showCode,
      showStructure,
      clear,
      setMobileSize,
      setDesktopSize
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
  &__left {
    display: flex;
    align-items: center;
    height: 100%;
    &-extra {
      display: flex;
      margin-bottom: 18px;

      .item {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.action {
  display: flex;
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
