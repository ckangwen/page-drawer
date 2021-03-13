const settings = {
  show: {
    type: "boolean",
    title: "是否显示弹窗",
  },
  title: {
    type: "string",
    title: "标题",
  },
  width: {
    type: "_string  number_",
    title: "弹窗宽度，默认单位为px",
    default: "320px",
  },
  message: {
    type: "string",
    title: "文本内容，支持通过换行",
  },
  theme: {
    type: "string",
    title: "样式风格，可选值为round-button",
    default: "default",
  },
  "message-align": {
    type: "string",
    title: "内容对齐方式，可选值为left right",
    default: "center",
  },
  "z-index": {
    type: "number",
    title: "z-index 层级",
    default: 100,
  },
  "class-name": {
    type: "string",
    title: "自定义类名，dialog 在自定义组件内时无效",
    default: "''",
  },
  "custom-style": {
    type: "string",
    title: "自定义样式",
    default: "''",
  },
  "show-confirm-button": {
    type: "boolean",
    title: "是否展示确认按钮",
    default: true,
  },
  "show-cancel-button": {
    type: "boolean",
    title: "是否展示取消按钮",
    default: true,
  },
  "confirm-button-text": {
    type: "string",
    title: "确认按钮的文案",
    default: "确认",
  },
  "cancel-button-text": {
    type: "string",
    title: "取消按钮的文案",
    default: "取消",
  },
  "confirm-button-color": {
    type: "string",
    title: "确认按钮的字体颜色",
    default: "#ee0a24",
  },
  "cancel-button-color": {
    type: "string",
    title: "取消按钮的字体颜色",
    default: "#333",
  },
  overlay: {
    type: "boolean",
    title: "是否展示遮罩层",
    default: true,
  },
  "overlay-style": {
    type: "_object_",
    title: "自定义遮罩层样式",
  },
  "close-on-click-overlay": {
    type: "boolean",
    title: "点击遮罩层时是否关闭弹窗",
    default: true,
  },
  "use-slot": {
    type: "boolean",
    title: "是否使用自定义内容的插槽",
    default: true,
  },
  "use-title-slot": {
    type: "boolean",
    title: "是否使用自定义标题的插槽",
    default: true,
  },
  "before-close": {
    type: "_(action) => boolean  Promise<boolean>_",
    title: "关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise",
  },
  transition: {
    type: "string",
    title: "动画名称，可选值为fade",
    default: "scale",
  },
  "confirm-button-open-type": {
    type: "string",
    title: "确认按钮的微信开放能力",
  },
};
export default {
  settings
}