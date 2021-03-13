const settings = {
  text: {
    type: "string",
    title: "内部文字",
    default: "文本"
  },
  dashed: {
    type: "boolean",
    title: "虚线",
    default: true,
  },
  hairline: {
    type: "boolean",
    title: "细线",
    default: true,
  },
  "content-position": {
    type: "string",
    title: "文本位置",
    "ui-widget": "select",
    enums: ["left", "center", "right"],
    default: "center"
  },
  "custom-style": {
    type: "string",
    title: "自定义样式",
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
    <van-divider props={props} {...props}>
      { props.text }
    </van-divider>
  );
};

export default {
  template: Component,
  settings,
};
