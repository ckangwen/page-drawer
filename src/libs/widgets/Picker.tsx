const settings = {
  columns: {
    type: "array",
    title: "对象数组，配置每一列显示的数据",
    default: "[]",
  },
  "show-toolbar": {
    type: "boolean",
    title: "是否显示顶部栏",
    default: true,
  },
  "toolbar-position": {
    type: "string",
    title: "顶部栏位置，可选值为bottom",
    default: "top",
  },
  title: {
    type: "string",
    title: "顶部栏标题",
    default: "''",
  },
  loading: {
    type: "boolean",
    title: "是否显示加载状态",
    default: true,
  },
  "value-key": {
    type: "string",
    title: "选项对象中，文字对应的 key",
    default: "text",
  },
  "item-height": {
    type: "number",
    title: "选项高度",
    default: 44,
  },
  "confirm-button-text": {
    type: "string",
    title: "确认按钮文字",
    default: "确认",
  },
  "cancel-button-text": {
    type: "string",
    title: "取消按钮文字",
    default: "取消",
  },
  "visible-item-count": {
    type: "number",
    title: "可见的选项个数",
    default: 6,
  },
  "default-index": {
    type: "number",
    title: "单列选择器的默认选中项索引，多列选择器请参考下方的 Columns 配置",
    default: 0,
  },
};
export default {
  settings
}