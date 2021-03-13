const settings = {
  title: {
    type: "string",
    title: "标题",
  },
  desc: {
    type: "string",
    title: "描述",
  },
  status: {
    type: "string",
    title: "状态",
  },
  "use-footer-slot": {
    type: "boolean",
    title: "是否使用 footer slot",
    default: true,
  },
};
export default {
  settings
}