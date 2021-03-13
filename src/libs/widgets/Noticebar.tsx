const settings = {
  mode: {
    type: "string",
    title: "通告栏模式，可选值为 closeable link",
    default: "''",
  },
  text: {
    type: "string",
    title: "通知文本内容",
    default: "''",
  },
  color: {
    type: "string",
    title: "通知文本颜色",
    default: "#ed6a0c",
  },
  background: {
    type: "string",
    title: "滚动条背景",
    default: "#fffbe8",
  },
  "left-icon": {
    type: "string",
    title: "左侧[图标名称](#/icon)或图片链接",
  },
  delay: {
    type: "number",
    title: "动画延迟时间 (s)",
    default: 1,
  },
  speed: {
    type: "number",
    title: "滚动速率 (px/s)",
    default: 50,
  },
  scrollable: {
    type: "boolean",
    title: "是否开启滚动播放，内容长度溢出时默认开启",
    default: true,
  },
  wrapable: {
    type: "boolean",
    title: "是否开启文本换行，只在禁用滚动时生效",
    default: true,
  },
  "open-type": {
    type: "string",
    title: "微信开放能力",
    default: "",
  },
};
export default {
  settings
}