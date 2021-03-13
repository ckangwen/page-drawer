const settings = {
  "offset-top": {
    type: "number",
    title: "吸顶时与顶部的距离，单位px",
    default: 0,
  },
  "z-index": {
    type: "number",
    title: "吸顶时的 z-index",
    default: 99,
  },
  container: {
    type: "_function_",
    title: "一个函数，返回容器对应的 NodesRef 节点",
  },
  "scroll-top": {
    type: "number",
    title: "当前滚动区域的滚动位置，非 null 时会禁用页面滚动事件的监听",
  },
};

export default {
  settings
}