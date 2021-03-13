const settings = {
  show: {
    type: "boolean",
    title: "是否显示弹出层",
    default: true,
  },
  "z-index": {
    type: "number",
    title: "z-index 层级",
    default: 100,
  },
  overlay: {
    type: "boolean",
    title: "是否显示遮罩层",
    default: true,
  },
  position: {
    type: "string",
    title: "弹出位置，可选值为 top bottom right left",
    default: "center",
  },
  duration: {
    type: "_number",
    title: "动画时长，单位为毫秒",
    default: "object_",
  },
  round: {
    type: "boolean",
    title: "是否显示圆角",
    default: true,
  },
  "custom-style": {
    type: "string",
    title: "自定义弹出层样式",
    default: "",
  },
  "overlay-style": {
    type: "string",
    title: "自定义遮罩层样式",
    default: "",
  },
  "close-on-click-overlay": {
    type: "boolean",
    title: "是否在点击遮罩层后关闭",
    default: true,
  },
  closeable: {
    type: "boolean",
    title: "是否显示关闭图标",
    default: true,
  },
  "close-icon": {
    type: "string",
    title: "关闭图标名称或图片链接",
    default: "cross",
  },
  "safe-area-inset-bottom": {
    type: "boolean",
    title: "是否为 iPhoneX 留出底部安全距离",
    default: true,
  },
  "safe-area-inset-top": {
    type: "boolean",
    title: "是否留出顶部安全距离（状态栏高度）",
    default: true,
  },
};
export default {
  settings
}