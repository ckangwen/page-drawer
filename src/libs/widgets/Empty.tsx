const settings = {
  image: {
    type: "string",
    title: "图片类型,支持传入图片 URL",
    "ui-widget": "select",
    enums: ["default", "error", "network", "search"],
    "ui-props": {
      "allow-create": true,
      filterable: true
    },
    default: "default",
  },
  description: {
    type: "string",
    title: "图片下方的描述文字",
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
    <van-empty props={props} {...props}></van-empty>
  );
};

export default {
  template: Component,
  settings,
};

