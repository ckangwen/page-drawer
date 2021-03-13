const settings = {
  show: {
    type: "boolean",
    title: "是否展示遮罩层",
    default: true,
  },
  "z-index": {
    type: "_string",
    title: "z-index 层级",
    default: "number_",
  },
  duration: {
    type: "_string",
    title: "动画时长，单位秒",
    default: "number_",
  },
  "class-name": {
    type: "string",
    title: "自定义类名",
  },
  "custom-style": {
    type: "string",
    title: "自定义样式",
  },
};
export default {
  settings
}