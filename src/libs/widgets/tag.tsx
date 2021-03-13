const settings = {
  type: {
    type: "string",
    title: "tag类型",
    "ui-widget": "select",
    enums: ["primary", "success", "danger", "warning"],
  },
  size: {
    type: "string",
    title: "大小",
    "ui-widget": "select",
    enums: ["large", "medium"],
  },
  color: {
    type: "string",
    title: "标签颜色",
  },
  plain: {
    type: "boolean",
    title: "是否为空心样式",
    default: true,
  },
  round: {
    type: "boolean",
    title: "是否为圆角样式",
    default: true,
  },
  mark: {
    type: "boolean",
    title: "是否为标记样式",
    default: true,
  },
  "text-color": {
    type: "string",
    title: "文本颜色，优先级高于 color 属性",
    default: "white",
  },
  closeable: {
    type: "boolean",
    title: "是否为可关闭标签",
    default: true,
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
  return (
    <van-tag props={props} {...props}>
      {props.text || "default"}
    </van-tag>
  );
};

export default {
  template: Component,
  settings,
};
