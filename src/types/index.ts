export type WidgetSetting = {
  name: string;
  tag: string;
  label: string;
  icon: string;
  config: Record<string, any>;
  template: (...args: any[]) => JSX.Element;
  children?: [];
};
