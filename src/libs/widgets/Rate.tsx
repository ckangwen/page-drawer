const settings = {
  name: {
    type: "string",
    title: "在表单内提交时的标识符",
  },
  value: {
    type: "number",
    title: "当前分值",
  },
  count: {
    type: "number",
    title: "图标总数",
    default: 5,
  },
  size: {
    type: "_string",
    title: "图标大小，默认单位为 px",
    default: "number_",
  },
  gutter: {
    type: "_string",
    title: "图标间距，默认单位为 px",
    default: "number_",
  },
  color: {
    type: "string",
    title: "选中时的颜色",
    default: "#ffd21e",
  },
  "void-color": {
    type: "string",
    title: "未选中时的颜色",
    default: "#c7c7c7",
  },
  icon: {
    type: "string",
    title: "选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon)",
    default: "star",
  },
  "void-icon": {
    type: "string",
    title: "未选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon)",
    default: "star-o",
  },
  "allow-half": {
    type: "boolean",
    title: "是否允许半选",
    default: true,
  },
  readonly: {
    type: "boolean",
    title: "是否为只读状态 \b",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用评分",
    default: true,
  },
  "disabled-color": {
    type: "string",
    title: "禁用时的颜色",
    default: "#bdbdbd",
  },
  touchable: {
    type: "boolean",
    title: "是否可以通过滑动手势选择评分",
    default: true,
  },
};
export default {
  settings
}