const settings = {
  time: {
    type: "number",
    title: "倒计时时长，单位毫秒",
  },
  format: {
    type: "string",
    title: "时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒",
    default: "HH:mm:ss",
  },
  "auto-start": {
    type: "boolean",
    title: "是否自动开始倒计时",
    default: true,
  },
  millisecond: {
    type: "boolean",
    title: "是否开启毫秒级渲染",
    default: true,
  },
  "use-slot": {
    type: "boolean",
    title: "是否使用自定义样式插槽",
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
    <van-count-down props={props} {...props}></van-count-down>
  );
};

export default {
  template: Component,
  settings,
};