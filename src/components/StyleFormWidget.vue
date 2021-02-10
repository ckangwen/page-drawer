<template>
  <div>
    <div class="style-control-container">
      <el-input
        v-for="(style, index) in data"
        :key="index"
        v-model="style.value"
        class="input-control"
        :size="size"
      >
        <el-select
          slot="prepend"
          v-model="style.key"
          :size="size"
          placeholder="请选择"
          :style="{ width: _keyWidth }"
          filterable
        >
          <el-option
            v-for="item in styleKeys"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-input>
    </div>
    <div class="input-control-footer">
      <el-button circle icon="el-icon-plus" @click="addStyle"></el-button>
      <el-button style="width: 150px" type="primary" @click="submit">
        确定
      </el-button>
    </div>
  </div>
</template>
<script>
const styleKeys = [
  "align-content",
  "align-items",
  "align-self",
  "background-attachment",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "background",
  "border-bottom",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-color",
  "border-left",
  "border-radius",
  "border-right",
  "border-style",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top",
  "border-width",
  "border",
  "bottom",
  "box-shadow",
  "box-sizing",
  "clear",
  "color",
  "column-count",
  "column-gap",
  "column-width",
  "content",
  "cursor",
  "display",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "font-size",
  "font-style",
  "font-variant",
  "font-weight",
  "grid",
  "height",
  "justify-content",
  "left",
  "letter-spacing",
  "line-height",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "list-style",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "mix-blend-mode",
  "opacity",
  "order",
  "outline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overflow",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "padding",
  "pointer-events",
  "position",
  "resize",
  "right",
  "text-align",
  "text-decoration",
  "text-indent",
  "text-overflow",
  "text-shadow",
  "text-transform",
  "top",
  "transform-origin",
  "transform",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "transition",
  "vertical-align",
  "white-space",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "z-index"
];
export default {
  name: "style-form",
  props: {
    size: {
      type: String,
      default: "small"
    },
    keyWidth: {
      type: [String, Number],
      default: 120
    }
  },
  data() {
    return {
      value: "",
      key: "margin",
      data: [{ key: "", value: "" }],
      styleKeys
    };
  },
  computed: {
    _keyWidth() {
      if (typeof this.keyWidth === "number") {
        return `${this.keyWidth}px`;
      } else {
        return this.keyWidth;
      }
    }
  },
  methods: {
    addStyle() {
      this.data.push({
        key: "",
        value: ""
      });
    },
    submit() {
      this.$emit("confirm", this.data);
    }
  }
};
</script>
<style scoped>
.input-control {
  margin-bottom: 10px;
}
.input-control-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
