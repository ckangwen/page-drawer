const settings = {
  color: {
    type: "string",
    title: "颜色",
    default: "#c9c9c9",
  },
  type: {
    type: "string",
    title: "类型，可选值为 spinner",
    default: "circular",
  },
  size: {
    type: "_string",
    title: "加载图标大小，默认单位为 px",
    default: "number_",
  },
  "text-size": {
    type: "_string",
    title: "文字大小，默认单位为为 px",
    default: "number_",
  },
  vertical: {
    type: "boolean",
    title: "是否垂直排列图标和文字内容",
    default: true,
  },
};
export default {
  settings
}