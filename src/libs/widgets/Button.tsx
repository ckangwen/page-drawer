const settings = {
  text: {
    type: "string",
    title: "内部文字",
    default: "Button"
  },
  id: {
    type: "string",
    title: "标识符",
  },
  type: {
    type: "string",
    "ui-widget": "select",
    enums: ["primary", "success", "danger", "warning"],
    default: "default",
  },
  size: {
    type: "string",
    title: "按钮尺寸",
    "ui-widget": "select",
    enums: ["normal", "large", "small", "mini"],
    default: "normal",
  },
  color: {
    type: "string",
    title: "按钮颜色，支持传入linear-gradient渐变色",
  },
  icon: {
    type: "string",
    title: "左侧图标名称或图片链接",
  },
  "class-prefix": {
    type: "string",
    title: "图标类名前缀",
    default: "van-icon",
  },
  plain: {
    type: "boolean",
    title: "是否为朴素按钮",
    default: true,
  },
  block: {
    type: "boolean",
    title: "是否为块级元素",
    default: true,
  },
  round: {
    type: "boolean",
    title: "是否为圆形按钮",
    default: true,
  },
  square: {
    type: "boolean",
    title: "是否为方形按钮",
    default: true,
  },
  disabled: {
    type: "boolean",
    title: "是否禁用按钮",
    default: true,
  },
  hairline: {
    type: "boolean",
    title: "是否使用 0.5px 边框",
    default: true,
  },
  loading: {
    type: "boolean",
    title: "是否显示为加载状态",
    default: true,
  },
  "loading-text": {
    type: "string",
    title: "加载状态提示文字",
  },
  "loading-type": {
    type: "string",
    title: "加载状态图标类型",
    "ui-widget": "select",
    enums: ["spinner", "circular"],
    default: "circular",
  },
  "loading-size": {
    type: "string",
    title: "加载图标大小",
    default: "20px",
  },
  "custom-style": {
    type: "string",
    title: "自定义样式",
  },
  "open-type": {
    type: "string",
    title: "微信开放能",
  },
  "app-parameter": {
    type: "string",
    title: "打开APP时，向APP传递的参数",
  },
  "session-from": {
    type: "string",
    title: "会话来源",
  },
  "business-id": {
    type: "number",
    title: "客服消息子商户id",
  },
  "send-message-title": {
    type: "string",
    title: "会话内消息卡片标题",
    default: "当前标题",
  },
  "send-message-path": {
    type: "string",
    title: "会话内消息卡片点击跳转小程序路径",
    default: "当前分享路径",
  },
  "send-message-img": {
    type: "string",
    title: "sendMessageImg",
    default: "截图",
  },
  "show-message-card": {
    type: "string",
    title: "显示会话内消息卡片",
    default: "false",
  },
  "form-type": {
    type: "string",
    title: "用于 form 组件，可选值为submit reset，点击分别会触发 form 组件的 submit/reset 事件",
    "ui-widget": "select",
    enums: ["submit", "reset"]
  },
};


// const Component = (context: any) => {
//   let props: Record<string, any> = {};
//   if (context.data) {
//     props = Object.assign(
//       {},
//       {
//         class: context.data.class || "",
//         style: context.data.style || {},
//       },
//       context.data.attrs,
//       context.data.props
//     );
//   }
//   return (
//     <van-button props={props} {...props}>
//       {props.text || "default"}
//     </van-button>
//   );
// };

const Component =  {
  functional: true,
  render(h: any, ctx: any) {
    console.log(ctx)
    return h('van-button', ctx.props, [])
  },
}

export default {
  template: Component,
  settings,
};
