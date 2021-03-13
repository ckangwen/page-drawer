const settings = {
  name: {
    type: "string",
    title: "在表单内提交时的标识符",
  },
  checked: {
    type: "_any_",
    title: "开关选中状态",
    default: "false",
  },
  loading: {
    type: "boolean",
    title: "是否为加载状态",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否为禁用状态",
    default: true,
  },
  size: {
    type: "string",
    title: "开关尺寸",
    default: "30px",
  },
  "active-color": {
    type: "string",
    title: "打开时的背景色",
    default: "#1989fa",
  },
  "inactive-color": {
    type: "string",
    title: "关闭时的背景色",
    default: "#fff",
  },
  "active-value": {
    type: "_any_",
    title: "打开时的值",
    default: "true",
  },
  "inactive-value": {
    type: "_any_",
    title: "关闭时的值",
    default: "false",
  },
};

export default {
  settings
}