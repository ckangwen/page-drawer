const settings = {
  value: {
    type: "number",
    title: "当前进度百分比，取值范围为 0-100",
    default: 0,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用滑块",
    default: true,
  },
  max: {
    type: "number",
    title: "最大值",
    default: 100,
  },
  min: {
    type: "number",
    title: "最小值",
    default: 0,
  },
  step: {
    type: "number",
    title: "步长",
    default: 1,
  },
  "bar-height": {
    type: "string",
    title: "进度条高度，默认单位为 px",
  },
  "active-color": {
    type: "string",
    title: "进度条激活态颜色",
    default: "#1989fa",
  },
  "inactive-color": {
    type: "string",
    title: "进度条默认颜色",
    default: "#e5e5e5",
  },
};

export default {
  settings
}