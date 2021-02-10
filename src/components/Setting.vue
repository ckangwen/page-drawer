<template>
  <el-aside>
    <el-tabs v-model="tabName" type="border-card" class="tabs">
      <el-tab-pane name="COMMON" class="tab-pane">
        <span slot="label"> <i class="el-icon-date"></i> 通用配置 </span>
        <el-form size="small" label-position="top">
          <el-form-item label="ClassName" style="text-align: left;">
            <el-input v-model="commonFormData.className"></el-input>
          </el-form-item>
          <el-form-item label="Style" style="text-align: left;">
            <StyleFormWidget />
          </el-form-item>
          <el-button @click="onOpenDrawer">添加子节点</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="CUSTOMIZE" class="tab-pane">
        <span slot="label"> <i class="el-icon-date"></i> 组件配置 </span>
        <schema-form :schema="schema" v-model="schemaValue" />
      </el-tab-pane>
    </el-tabs>

    <el-drawer
      title="我是标题"
      :visible.sync="drawerVisible"
      :with-header="false"
    >
      <div>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="component-item"
          @click="addComponent(item)"
        >
          <div class="component-body">
            {{ item.label }}
          </div>
        </div>
      </div>
    </el-drawer>
  </el-aside>
</template>
<script>
import { defineComponent, ref, watch } from "@vue/composition-api";
import StyleFormWidget from "@/components/StyleFormWidget";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import SchemaForm from "@/components/schema-form";
import { EditorState } from "../store/type";
import { find, findIndex, throttle } from "lodash";
import widgetCenter from "@/libs/widgets";

export default defineComponent({
  name: "Setting",
  components: {
    StyleFormWidget,
    SchemaForm
  },
  setup() {
    const {
      selectedUuid,
      componentData,
      selectedComponentConfig
    } = useNamespacedState("editor", [
      "selectedUuid",
      "componentData",
      "selectedComponentConfig"
    ]);
    const { setComponentData } = useNamespacedMutations("editor", [
      "setComponentData"
    ]);
    const tabName = ref("COMMON");
    const commonFormData = ref({
      className: "",
      style: []
    });
    const schema = ref({});
    const schemaValue = ref({});

    const handler = throttle(val => {
      if (selectedUuid.value) {
        const config = find(componentData.value, {
          uuid: selectedUuid.value
        });

        config.className += val.className;
        const index = findIndex(componentData.value, {
          uuid: selectedUuid.value
        });
        componentData.value.splice(index, 1, config);

        setComponentData(componentData.value);
      }
    }, 1000);

    watch(commonFormData, handler, { deep: true });

    watch(tabName, val => {
      if (val === "CUSTOMIZE") {
        schema.value = selectedComponentConfig.value;
      }
    });
    watch(
      schemaValue,
      val => {
        if (val) {
          //
        }
      },
      { deep: true }
    );

    const drawerVisible = ref(false);
    const list = widgetCenter.widgetList;
    const onOpenDrawer = () => {
      drawerVisible.value = true;
    };

    return {
      tabName,
      commonFormData,
      schema,
      schemaValue,
      list,
      drawerVisible,
      onOpenDrawer
    };
  }
});
</script>
<style lang="scss">
.tabs {
  height: 99%;

  .el-tabs__content {
    height: calc(100vh - 131px);
    overflow: auto;
  }
}
</style>
