import { FunctionalComponentOptions } from 'vue'
import { renderJSXToString } from '../renderJSXToString';
import TagSettings from './tag'

export type WidgetSetting = {
  name: string;
  title: string;
  icon: string;
  template: (context: FunctionalComponentOptions) => JSX.Element;
  templateString?: string
  children?: [];
  settings: Record<string, any>;
};

type RegisterWidgetType = {
  name: string;
  title: string;
  icon: string;
  children?: [];
  settings: Record<string, any>;
};

export class WidgetBuilder {
  static widgets:  Record<string, WidgetSetting> = {}

  static get widgetList() {
    return Object.keys(this.widgets).map(k => this.widgets[k])
  }

  static registerWidget(template: any, config: RegisterWidgetType) {
    if (config.name) {
      let templateString = ''
      if (template.functional) {
        templateString = renderJSXToString(template) || ''
      }
      this.widgets[config.name] = {
        template,
        ...config,
        templateString
      }
    }
  }


  static get(name: string) {
    return this.widgets[name]
  }

  static getTemplate(name: string) {
    return this.get(name).template || 'div'
  }

  static getWidgetSetting(name: string) {
    return this.get(name).settings
  }
}


WidgetBuilder.registerWidget(TagSettings.template, {
  name: 'tag',
  title: '标签',
  icon: 'el-icon-platform-eleme',
  settings: TagSettings.settings,
})