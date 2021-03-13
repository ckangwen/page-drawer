const settings = {
  name: {
    type: "string",
    title: "在表单内提交时的标识符",
  },
  value: {
    type: "_string  number_",
    title: "输入值",
    default: "最小值",
  },
  min: {
    type: "_string  number_",
    title: "最小值",
    default: "1",
  },
  max: {
    type: "_string  number_",
    title: "最大值",
  },
  step: {
    type: "_string  number_",
    title: "步长",
    default: "1",
  },
  integer: {
    type: "boolean",
    title: "是否只允许输入整数",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用",
    default: true,
  },
  "disable-input": {
    type: "boolean",
    title: "是否禁用输入框",
    default: true,
  },
  "async-change": {
    type: "boolean",
    title: "是否开启异步变更，开启后需要手动控制输入值",
    default: true,
  },
  "input-width": {
    type: "_string  number_",
    title: "输入框宽度，默认单位为 px",
    default: "32px",
  },
  "button-size": {
    type: "_string  number_",
    title: "按钮大小，默认单位为 px，输入框高度会和按钮大小保持一致",
    default: "28px",
  },
  "show-plus": {
    type: "boolean",
    title: "是否显示增加按钮",
    default: true,
  },
  "show-minus": {
    type: "boolean",
    title: "是否显示减少按钮",
    default: true,
  },
  "decimal-length": {
    type: "number",
    title: "固定显示的小数位数",
  },
  theme: {
    type: "string",
    title: "样式风格，可选值为 round",
  },
  "disable-plus": {
    type: "boolean",
    title: "是否禁用增加按钮",
  },
  "disable-minus": {
    type: "boolean",
    title: "是否禁用减少按钮",
  },
  "long-press": {
    type: "boolean",
    title: "是否开启长按手势",
    default: true,
  },
};

export default {
  settings
}