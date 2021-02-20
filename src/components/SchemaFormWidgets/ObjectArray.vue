<template>
  <div>
    <el-collapse v-model="activeNames">
      <template v-for="(item, index) in models">
        <el-collapse-item :key="index" :name="index">
          <template slot="title">
            {{ `Item ${index + 1}`
            }}<i class="el-icon-circle-close" style="margin-left: 10px"></i>
          </template>
          <div
            v-for="(child, idx) in forms"
            :key="idx"
            class="object-array-form-widget"
          >
            <label class="input-label" :style="{ width }">{{
              child.title
            }}</label>
            <el-input
              class="input-control"
              v-if="child.type === 'string'"
              v-model="item[child.property]"
              :size="size"
            ></el-input>
            <el-switch
              class="input-control"
              v-else-if="child.type === 'boolean'"
              v-model="item[child.property]"
              :size="size"
            ></el-switch>
            <el-checkbox-group
              class="input-control"
              v-else-if="child.type === 'array' && !child['ui-widget']"
              v-model="item[child.property]"
              :size="size"
            >
              <el-checkbox
                v-for="option in transformEnums(child.enums)"
                :key="option.value"
                :label="option.value"
                >{{ option.label }}</el-checkbox
              >
            </el-checkbox-group>
            <el-select
              class="input-control"
              v-else-if="
                child.type === 'array' && child['ui-widget'] === 'select'
              "
              v-model="item[child.property]"
              :size="size"
            >
              <el-option
                v-for="option in transformEnums(child.enums)"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              ></el-option>
            </el-select>
          </div>
        </el-collapse-item>
      </template>
    </el-collapse>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="onAdd"
      size="small"
      style="margin-top: 15px"
      >添加一项</el-button
    >
    <el-button
      type="success"
      icon="el-icon-check"
      @click="onConfirm"
      size="small"
      style="margin-top: 15px; float: right"
      >确 定</el-button
    >
  </div>
</template>
<script lang="ts">
import SchemaForm from "@ckangwen/schema-form";
import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "ObjectArray",
  components: {
    SchemaForm,
  },
  props: {
    schema: Object,
  },
  setup(props, ctx) {
    const { schema = {} } = props;
    const { properties = {}, width = "80px", size = "small" } = schema;
    const activeNames = ref([0]);

    const models = ref<Record<string, any>[]>([{}]);
    const onAdd = () => {
      models.value.push({});
    };
    const onConfirm = () => {
      ctx.emit("input", models.value);
    };

    const forms = computed(() => {
      return Object.keys(properties).map((k) => {
        if (properties[k].default || properties[k].default === false) {
          models.value.forEach((item) => {
            item[k] = properties[k].default;
          });
        }
        return {
          property: k,
          ...(properties[k] || {}),
        };
      });
    });

    const transformEnums = (enums: any[]) => {
      if (!enums) return [];
      if (Array.isArray(enums)) {
        return enums.map((item) => {
          if (
            typeof item === "number" ||
            (typeof item === "string" && typeof item === "boolean")
          ) {
            return {
              value: item,
              label: item,
            };
          } else if (item.label && item.value) {
            return item;
          } else if (item.label) {
            return {
              value: item.label,
              label: item.label,
            };
          } else if (item.value) {
            return {
              value: item.value,
              label: item.value,
            };
          }
        });
      }
      return [];
    };
    return {
      activeNames,
      models,
      onAdd,
      onConfirm,
      width,
      properties,
      size,
      forms,
      transformEnums,
    };
  },
});
</script>
<style lang="scss" scoped>
.object-array-form-widget {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .input-label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .input-control {
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }
}
</style>