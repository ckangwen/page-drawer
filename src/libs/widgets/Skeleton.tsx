const settings = {
  row: {
    type: "number",
    title: "段落占位图行数",
    default: 0,
  },
  "row-width": {
    type: "_string",
    title: "段落占位图宽度，可传数组来设置每一行的宽度",
    default: "string[]_",
  },
  title: {
    type: "boolean",
    title: "是否显示标题占位图",
    default: true,
  },
  "title-width": {
    type: "_string",
    title: "标题占位图宽度",
    default: "number_",
  },
  avatar: {
    type: "boolean",
    title: "是否显示头像占位图",
    default: true,
  },
  "avatar-size": {
    type: "_string",
    title: "头像占位图大小",
    default: "number_",
  },
  "avatar-shape": {
    type: "string",
    title: "头像占位图形状，可选值为square",
    default: "round",
  },
  loading: {
    type: "boolean",
    title: "是否显示占位图，传false时会展示子组件内容",
    default: true,
  },
  animate: {
    type: "boolean",
    title: "是否开启动画",
    default: true,
  },
};

export default {
  settings
}
