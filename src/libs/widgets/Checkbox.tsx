const CheckboxSettings = {
  text: {
    type: "string",
    title: "文字",
    default: "文字"
  },
  name: {
    type: "string",
    title: "Name",
  },
  shape: {
    type: "string",
    title: "形状",
    "ui-widget": "select",
    enums: ["round", "square"],
  },
  value: {
    type: "boolean",
    title: "是否为选中状态",
  },
  disabled: {
    type: "boolean",
    title: "是否禁用单选框",
  },
  "label-disabled": {
    type: "boolean",
    title: "是否禁用单选框内容点击",
    default: true,
  },
  "label-position": {
    type: "string",
    title: "文本位置",
    "ui-widget": "select",
    enums: ["left", "right"],
    default: "right",
  },
  "use-icon-slot": {
    type: "boolean",
    title: "是否使用 icon slot",
    default: true,
  },
  "checked-color": {
    type: "string",
    title: "选中状态颜色",
    default: "#1989fa",
  },
  "icon-size": {
    type: "string",
    title: "icon 大小",
    default: "20px",
  },
};
const CheckboxGroupSettings = {
  name: {
    type: "string",
    title: "Name",
  },
  value: {
    type: "array",
    title: "Checkbox的值",
    default: [],
  },
  disabled: {
    type: "boolean",
    title: "是否禁用所有单选框",
  },
  max: {
    type: "number",
    title: "设置最大可选数",
    default: 0,
  },
  items: {
    title: "复选框设置",
    type: "ObjectArray",
    properties: CheckboxSettings,
    default: []
  }
};

const Component = (context: any) => {
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
  const { name, value, max, disabled, items = [], style = {}, class: className } = props
  return (
    <div class={className} style={style}>
      <van-checkbox-group name={name} value={value} max={max} disabled={disabled}>
        {
          items.map((item: Record<string, any>) => {
            return (
              <van-checkbox props={item} { ...item } >{ item.text }</van-checkbox>
            )
          } )
        }
      </van-checkbox-group>
    </div>
  )
};

export default {
  template: Component,
  settings: CheckboxGroupSettings,
};
