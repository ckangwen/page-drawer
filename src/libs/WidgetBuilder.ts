import { FunctionalComponentOptions } from 'vue'
import { renderJSXToString } from './renderJSXToString';
import TagConfig from './widgets/Tag'
import CellConfig from './widgets/Cell'
import CheckboxConfig from './widgets/Checkbox'
import ButtonConfig from './widgets/Button'

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


WidgetBuilder.registerWidget(TagConfig.template, {
  name: 'tag',
  title: '标签',
  icon: 'iconfont c-tag',
  settings: TagConfig.settings,
})

WidgetBuilder.registerWidget(CellConfig.template, {
  name: 'cell',
  title: '单元格',
  icon: 'iconfont c-cell',
  settings: CellConfig.settings,
})
WidgetBuilder.registerWidget(CheckboxConfig.template, {
  name: 'checkbox',
  title: '复选框',
  icon: 'iconfont c-checkbox',
  settings: CheckboxConfig.settings,
})
WidgetBuilder.registerWidget(ButtonConfig.template, {
  name: 'button',
  title: '按钮',
  icon: 'iconfont c-button',
  settings: ButtonConfig.settings,
})
