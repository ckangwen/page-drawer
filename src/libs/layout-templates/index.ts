import BasicTemplate from './basic.json'
import { TreeKey, NodeDeclaration } from '../../store/type';

export type LayoutTemplateType = {
  name?: string
  title: string
  template: Record<TreeKey, NodeDeclaration>
}

const layoutTemplates: Record<string, LayoutTemplateType> = {
  basic: {
    title: 'Demo',
    template: BasicTemplate
  }
}

export const checkTemplate = (obj: Record<string, any>) => {
  // 1. 检查是否有重复键名
  // 2. 检查是否有id,class,componentName,parentId
}

export default layoutTemplates

