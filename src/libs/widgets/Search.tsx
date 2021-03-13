const settings = {
  name: {
    type: "string",
    title: "在表单内提交时的标识符",
  },
  label: {
    type: "string",
    title: "搜索框左侧文本",
  },
  shape: {
    type: "string",
    title: "形状，可选值为 round",
    default: "square",
  },
  value: {
    type: "_string",
    title: "当前输入的值",
    default: "number_",
  },
  background: {
    type: "string",
    title: "搜索框背景色",
    default: "#f2f2f2",
  },
  "show-action": {
    type: "boolean",
    title: "是否在搜索框右侧显示取消按钮",
    default: true,
  },
  "action-text": {
    type: "boolean",
    title: "取消按钮文字",
    default: true,
  },
  focus: {
    type: "boolean",
    title: "获取焦点",
    default: true,
  },
  error: {
    type: "boolean",
    title: "是否将输入内容标红",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用输入框",
    default: true,
  },
  readonly: {
    type: "boolean",
    title: "是否只读",
    default: true,
  },
  clearable: {
    type: "boolean",
    title: "是否启用清除控件",
    default: true,
  },
  maxlength: {
    type: "number",
    title: "最大输入长度，设置为 -1 的时候不限制最大长度",
    default: -1,
  },
  "use-action-slot": {
    type: "boolean",
    title: "是否使用 action slot",
    default: true,
  },
  placeholder: {
    type: "string",
    title: "输入框为空时占位符",
  },
  "placeholder-style": {
    type: "string",
    title: "指定占位符的样式",
  },
  "input-align": {
    type: "string",
    title: "输入框内容对齐方式，可选值为 center right",
    default: "left",
  },
  "use-left-icon-slot": {
    type: "boolean",
    title: "是否使用输入框左侧图标 slot",
    default: true,
  },
  "use-right-icon-slot": {
    type: "boolean",
    title: "是否使用输入框右侧图标 slot",
    default: true,
  },
  "left-icon": {
    type: "string",
    title:
      "输入框左侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-left-icon-slot，则该属性无效）",
    default: "search",
  },
  "right-icon": {
    type: "string",
    title:
      "输入框右侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-right-icon-slot，则该属性无效）",
  },
};

export default {
  settings
}
