<template>
  <div>
    <el-collapse v-model="activeNames">
      <template v-for="(item, index) in currentValue">
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
              :value="item[child.property]"
              @input="(val) => onValueChange(index, child.property, val)"
              :size="size"
            ></el-switch>
            <el-checkbox-group
              class="input-control"
              v-else-if="child.type === 'array' && !child['ui-widget']"
              :value="item[child.property]"
              @input="(val) => onValueChange(index, child.property, val)"
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
              :value="item[child.property]"
              @input="(val) => onValueChange(index, child.property, val)"
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
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
import Vue from 'vue';
export default defineComponent({
  name: "ObjectArray",
  components: {
    SchemaForm,
  },
  props: {
    schema: Object,
    value: Array
  },
  setup(props, ctx) {
    const { schema = {} } = props;
    const { properties = {}, width = "", size = "small" } = schema;
    const activeNames = ref([0]);

    let val: any[] = []
    if (!props.value || ( props.value && props.value.length === 0 )) {
      val = [{}]
    } else {
      val = props.value?.map(item => {
        if (item && typeof item === 'object') return item
        else return {}
      }) || [{}]
    }

    const currentValue = ref<Record<string, any>[]>(val);
    const onAdd = () => {
      currentValue.value.push({});
    };
    watch(currentValue, (val) => {
      ctx.emit("input", val);
    }, { immediate: true, deep: true })

    const onConfirm = () => {
      ctx.emit("input", currentValue.value);
    };

    const forms = computed(() => {
      return Object.keys(properties).map((k) => {
        if (properties[k].default || properties[k].default === false) {
          currentValue.value.forEach((item) => {
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

    const onValueChange = (index: number, key: string, val: any) => {
      Vue.set(currentValue.value[index], key, val)
    }
    const nice = ref([true, true])
    return {
      nice,
      activeNames,
      currentValue,
      onAdd,
      onConfirm,
      width,
      properties,
      size,
      forms,
      transformEnums,
      onValueChange
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
    min-width: 80px;
  }
  .input-control {
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }
}
</style>