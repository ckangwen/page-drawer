<template>
  <el-aside class="sitting-aside">
    <el-tabs :value="activeTabName" @input="onTabNameChange" type="border-card" class="tabs">
      <el-tab-pane name="0" class="tab-pane">
        <span slot="label"> <i class="el-icon-date"></i> 样式 </span>
        <schema-form
          :formProps="{ 'label-position': 'top' }"
          v-model="schemaFormValue"
          :schema="schema"
          :widgets="schemaFormWidgets"
        ></schema-form>
        <el-button type="primary" style="width: 100%" @click="submitForm"
          >提交</el-button
        >
      </el-tab-pane>
      <el-tab-pane name="1" class="tab-pane">
        <span slot="label"> <i class="el-icon-date"></i> 属性 </span>
        <schema-form
          :formProps="{ 'label-position': 'top' }"
          v-model="componentSettingValue"
          :schema="componentSettingSchema"
        ></schema-form>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import SchemaForm from "@ckangwen/schema-form";
import {
  useNamespacedGetters,
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import { AtomicClassNames, isHTMLTag, TABNAMES } from "@/libs";
import StyleFormWidget from "@/components/StyleProperty/Style.vue";
import { AppMutations, AppState, EditorMutation, EditorState } from "@/store/type";
import { WidgetBuilder } from "@/libs/widgets/WidgetBuilder";

export default defineComponent({
  name: "Setting",
  components: {
    StyleFormWidget,
    SchemaForm,
  },
  setup() {
    const { currentUuid } = useNamespacedState<EditorState>("editor", [
      "currentUuid"
    ]);

    const { currentComponent } = useNamespacedGetters("editor", [
      "currentComponent"
    ]);

    const { updateClass, updateStyle, updateProps } = useNamespacedMutations<EditorMutation>(
      "editor",
      ["updateClass", "updateStyle", "updateProps"]
    );

    const { activeTabName } = useNamespacedState<AppState>("app", [
      "activeTabName"
    ]);
    const {
      setActiveTabName
    } = useNamespacedMutations<AppMutations>('app', [
      "setActiveTabName"
    ])
    const onTabNameChange = (val: TABNAMES) => {
      setActiveTabName(val)
    }

    const componentSettingSchema = ref({})
    const componentSettingValue = ref({})
    watch(activeTabName, val => {
      if (val == TABNAMES['ATTRIBUTE']) {
        const name = currentComponent.value.componentName
        if (name && !isHTMLTag(name)) {
          componentSettingSchema.value = WidgetBuilder.getWidgetSetting(name)
        }
      }
    });
    watch(componentSettingValue, () => {
      if (currentUuid.value) {
        updateProps({
          props: componentSettingValue.value
        })
      }
    }, { deep: true, immediate: true })

    const schema = ref({
      class: {
        title: "ClassName",
        type: "array",
        "ui-widget": "select",
        enums: AtomicClassNames,
        "ui-props": {
          style: {
            width: "100%"
          },
          filterable: true
        }
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
      style: StyleFormWidget,
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
    };

    watch(currentUuid, () => {
      schemaFormValue.value.class = currentComponent.value.class;
      schemaFormValue.value.style = currentComponent.value.style;
    });
    return {
      activeTabName,
      onTabNameChange,
      componentSettingValue,
      componentSettingSchema,
      schema,
      schemaFormValue,
      schemaFormWidgets,
      submitForm
    };
  }
});
</script>
<style lang="scss">
.sitting-aside {
  height: calc(100vh - 60px);
}
.tabs {
  height: 99%;

  .el-tabs__content {
    height: calc(100% - 70px);
    overflow: auto;
  }
}
</style>
