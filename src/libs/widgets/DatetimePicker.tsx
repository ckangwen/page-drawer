const settings = {
  value: {
    type: "_string",
    title: "当前选中值",
    default: "number_",
  },
  type: {
    type: "string",
    title: "类型，可选值为 date time year-month",
    default: "datetime",
  },
  "min-date": {
    type: "number",
    title: "可选的最小时间，精确到分钟",
    default: null,
  },
  "max-date": {
    type: "number",
    title: "可选的最大时间，精确到分钟",
    default: null,
  },
  "min-hour": {
    type: "number",
    title: "可选的最小小时，针对 time 类型",
    default: 0,
  },
  "max-hour": {
    type: "number",
    title: "可选的最大小时，针对 time 类型",
    default: 23,
  },
  "min-minute": {
    type: "number",
    title: "可选的最小分钟，针对 time 类型",
    default: 0,
  },
  "max-minute": {
    type: "number",
    title: "可选的最大分钟，针对 time 类型",
    default: 59,
  },
  filter: {
    type: "_(type, values) => values_",
    title: "选项过滤函数",
  },
  formatter: {
    type: "_(type, value) => value_",
    title: "选项格式化函数",
  },
  title: {
    type: "string",
    title: "顶部栏标题",
    default: "''",
  },
  "show-toolbar": {
    type: "boolean",
    title: "是否显示顶部栏",
    default: true,
  },
  loading: {
    type: "boolean",
    title: "是否显示加载状态",
    default: true,
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
};
export default {
  settings
}