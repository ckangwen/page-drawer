const Action = {
  name: {
    type: "string",
    title: "标题",
    default: "选项一"
  },
  subname: {
    type: "string",
    title: "二级标题",
    default: "选项一"
  },
  color: {
    type: "string",
    title: "选项文字颜色",
    default: "选项一"
  },
  className: {
    type: "string",
    title: "为对应列添加额外的 class",
    default: "选项一"
  },
  loading: {
    type: "boolean",
    title: "是否为加载状态"
  },
  disabled: {
    type: "boolean",
    title: "是否为禁用状态"
  }
}
const settings = {
  actions: {
    type: 'ObjectArray',
    title: "菜单选项",
    properties: Action,
    default: []
  },
  title: {
    type: "string",
    title: "标题",
  },
  description: {
    type: "string",
    title: "选项上方的描述信息",
  },
  "z-index": {
    type: "number",
    title: "z-index 层级",
    default: 100,
  },
  "cancel-text": {
    type: "string",
    title: "取消按钮文字",
  },
  overlay: {
    type: "boolean",
    title: "是否显示遮罩层",
  },
  round: {
    type: "boolean",
    title: "是否显示圆角",
    default: true,
  },
  "close-on-click-action": {
    type: "boolean",
    title: "是否在点击选项后关闭",
    default: true,
  },
  "close-on-click-overlay": {
    type: "boolean",
    title: "点击遮罩是否关闭菜单",
  },
  "safe-area-inset-bottom": {
    type: "boolean",
    title: "是否为 iPhoneX 留出底部安全距离",
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

  // TODO 此组件需要v-model v-model="show"
  return (
    <van-action-sheet props={props} {...props}></van-action-sheet>
  );
};

export default {
  template: Component,
  settings,
};

