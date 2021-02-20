const settings = {
  text: {
    title: "text",
    type: "string",
    default: "TEXT",
  },
  type: {
    title: "type",
    type: "string",
    "ui-widget": "select",
    enums: ["success", "info", "warning", "danger"],
  },
  closable: {
    title: "closable",
    type: "boolean",
  },
  hit: {
    title: "hit",
    type: "boolean",
  },
  color: {
    title: "color",
    type: "string",
  },
  size: {
    title: "size",
    type: "string",
    "ui-widget": "select",
    enums: ["medium", "small", "mini"],
  },
  effect: {
    title: "effect",
    type: "string",
    "ui-widget": "select",
    enums: ["dark", "light", "plain"],
    default: "light",
  },
};

const Tag = (context: any) => {
  let props: Record<string, any> = {}
  if (context.data) {
    props = Object.assign(
      {},
      {
        class: context.data.class || '',
        style: context.data.style || {},
      },
      context.data.attrs,
      context.data.props,
    );
  }
  console.log('props', props)
  return <el-tag props={props} {...props}>{props.text || "default"}</el-tag>;
};

export default {
  template: Tag,
  settings,
};
