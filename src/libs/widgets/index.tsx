import Vue from "vue";
import Card from "./card";

import { WidgetSetting } from "@/types";

const widgets: Record<string, WidgetSetting> = {};

class WidgetCenter {
  get widgets() {
    return Vue.observable(widgets);
  }
  get widgetList() {
    return Object.values(this.widgets);
  }
  register(name: string, data: any) {
    Vue.set(this.widgets, name, data);
    return this;
  }
}

const widgetCenter = new WidgetCenter();

widgetCenter.register("card", Card);

export default widgetCenter;
