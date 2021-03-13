const settings = {
  name: {
    type: "string",
    title: "在表单内提交时的标识符",
  },
  label: {
    type: "string",
    title: "输入框左侧文本",
  },
  size: {
    type: "string",
    title: "单元格大小",
    "ui-widget": "select",
    enums: ["large"]
  },
  value: {
    type: "string",
    title: "当前输入的值",
  },
  type: {
    type: "string",
    title: "可设置为任意原生类型",
    "ui-widget": "select",
    enums: ["text", "number", "idcard", "textarea", "digit"],
    default: "text",
  },
  fixed: {
    type: "boolean",
    title:
      "如果 type 为 textarea 且在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true",
    default: true,
  },
  focus: {
    type: "boolean",
    title: "获取焦点",
    default: true,
  },
  border: {
    type: "boolean",
    title: "是否显示内边框",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用输入框",
    default: true,
  },
  readonly: {
    type: "boolean",
    title: "是否只读",
    default: true,
  },
  clearable: {
    type: "boolean",
    title: "是否启用清除控件",
    default: true,
  },
  clickable: {
    type: "boolean",
    title: "是否开启点击反馈",
    default: true,
  },
  required: {
    type: "boolean",
    title: "是否显示表单必填星号",
    default: true,
  },
  center: {
    type: "boolean",
    title: "是否使内容垂直居中",
    default: true,
  },
  password: {
    type: "boolean",
    title: "是否是密码类型",
    default: true,
  },
  "title-width": {
    type: "string",
    title: "标题宽度",
    default: "6.2em",
  },
  maxlength: {
    type: "number",
    title: "最大输入长度，设置为 -1 的时候不限制最大长度",
    default: -1,
  },
  placeholder: {
    type: "string",
    title: "输入框为空时占位符",
  },
  "placeholder-style": {
    type: "string",
    title: "指定 placeholder 的样式",
  },
  "custom-style": {
    type: "string",
    title: "自定义样式",
  },
  "is-link": {
    type: "boolean",
    title: "是否展示右侧箭头并开启点击反馈",
    default: true,
  },
  "arrow-direction": {
    type: "string",
    title: "箭头方向，可选值为 left up down",
  },
  "show-word-limit": {
    type: "boolean",
    title: "是否显示字数统计，需要设置maxlength属性",
    default: true,
  },
  error: {
    type: "boolean",
    title: "是否将输入内容标红",
    default: true,
  },
  "error-message": {
    type: "string",
    title: "底部错误提示文案，为空时不展示",
    default: "''",
  },
  "error-message-align": {
    type: "string",
    title: "底部错误提示文案对齐方式",
    "ui-widget": "select",
    enums: ["center", "right"],
  },
  "input-align": {
    type: "string",
    title: "输入框内容对齐方式",
    "ui-widget": "select",
    enums: ["left", "center", "right"],
    default: "left",
  },
  autosize: {
    type: "boolean",
    title: "是否自适应内容高度",
  },
  "left-icon": {
    type: "string",
    title: "左侧图标名称或图片链接",
  },
  "right-icon": {
    type: "string",
    title: "右侧图标名称或图片链接",
  },
  "confirm-type": {
    type: "string",
    title: "设置键盘右下角按钮的文字，仅在 type='text' 时生效",
    default: "done",
  },
  "confirm-hold": {
    type: "boolean",
    title: "点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效",
    default: true,
  },
  "hold-keyboard": {
    type: "boolean",
    title: "focus 时，点击页面的时候不收起键盘",
    default: true,
  },
  "cursor-spacing": {
    type: "number",
    title: "输入框聚焦时底部与键盘的距离",
    default: 50,
  },
  "adjust-position": {
    type: "boolean",
    title: "键盘弹起时，是否自动上推页面",
    default: true,
  },
  "show-confirm-bar": {
    type: "boolean",
    title: "是否显示键盘上方带有'完成'按钮那一栏，只对 textarea 有效",
    default: true,
  },
  "selection-start": {
    type: "number",
    title: "光标起始位置，自动聚集时有效，需与 selection-end 搭配使用",
    default: -1,
  },
  "selection-end": {
    type: "number",
    title: "光标结束位置，自动聚集时有效，需与 selection-start 搭配使用",
    default: -1,
  },
  "auto-focus": {
    type: "boolean",
    title: "自动聚焦，拉起键盘",
    default: true,
  },
  "disable-default-padding": {
    type: "boolean",
    title: "是否去掉 iOS 下的默认内边距，只对 textarea 有效",
    default: true,
  },
  cursor: {
    type: "number",
    title: "指定 focus 时的光标位置",
    default: -1,
  },
};

const Component = (context: any) => {
  let props: Record<string, any> = {};
  if (context.data) {
    props = Object.assign(
      {},
      {
        class: context.data.class || "",
        style: context.data.style || {},
      },
      context.data.attrs,
      context.data.props
    );
  }

  // TODO 此组件需要v-model v-model="show"
  return (
    <van-field props={props} {...props}></van-field>
  );
};

export default {
  template: Component,
  settings,
};

