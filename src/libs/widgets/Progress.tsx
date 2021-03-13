const settings = {
  inactive: {
    type: "boolean",
    title: "是否置灰",
    default: true,
  },
  percentage: {
    type: "number",
    title: "进度百分比",
    default: 0,
  },
  "stroke-width": {
    type: "_string",
    title: "进度条粗细，默认单位为px",
    default: "number_",
  },
  "show-pivot": {
    type: "boolean",
    title: "是否显示进度文字",
    default: true,
  },
  color: {
    type: "string",
    title: "进度条颜色",
    default: "#1989fa",
  },
  "text-color": {
    type: "string",
    title: "进度文字颜色",
    default: "#fff",
  },
  "track-color": {
    type: "string",
    title: "轨道颜色",
    default: "#e5e5e5",
  },
  "pivot-text": {
    type: "string",
    title: "文字显示",
    default: "百分比文字",
  },
  "pivot-color": {
    type: "string",
    title: "文字背景色",
    default: "与进度条颜色一致",
  },
};
export default {
  settings
}