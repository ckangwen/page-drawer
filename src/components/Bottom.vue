<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawerVisible" direction="ltr">
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
  </div>
</template>
<script>
import widgetCenter from "@/libs/widgets";
import { defineComponent, ref, watch } from "@vue/composition-api";
import {
  useNamespacedState,
  useNamespacedMutations
} from "vuex-composition-helpers";
import Vue from "vue";

export default defineComponent({
  name: "Bottom",
  setup() {
    const { currentUuid } = useNamespacedState("editor", ["currentUuid"]);
    const { updateComponentName } = useNamespacedMutations("editor", [
      "updateComponentName"
    ]);
    const { widgetDrawerVisible } = useNamespacedState("app", [
      "widgetDrawerVisible"
    ]);

    const drawerVisible = ref(widgetDrawerVisible.value);
    watch(widgetDrawerVisible, val => {
      if (val) {
        drawerVisible.value = true;
      }
    });
    const list = widgetCenter.widgetList;

    const onSelectWidget = item => {
      updateComponentName({
        key: currentUuid.value,
        componentName: item.template
      });
      drawerVisible.value = false;
      Vue.nextTick();
    };

    return {
      drawerVisible,
      list,
      onSelectWidget
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
</style>
