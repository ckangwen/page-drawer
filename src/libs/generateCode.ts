import HTMLPrettier from "prettier/esm/standalone";
import HTMLPlugin from "prettier/esm/parser-html.mjs";

import { NodeDeclaration, TreeKey } from "../store/type";
import { ROOT_ID, isHTMLTag } from './helper';
import { WidgetBuilder } from './widgets/WidgetBuilder';

type NodeTree = {
  componentName: string;
  className: string;
  style: string;
  props?: string;
  children: NodeTree[];
};
function toTree(data: Record<TreeKey, NodeDeclaration>, keys = [ROOT_ID]) {
  if (Object.keys(data).length === 0) return [];

  return keys.map(k => {
    const item = data[k];
    const style = item.style || {};
    const styleText = Object.keys(style)
      .map(p => {
        return `${p}: ${style[p]};`;
      })
      .join(" ");
    const node: NodeTree = {
      componentName: item.componentName,
      className: item.class ? item.class.join(" ") : "",
      style: styleText,
      children: toTree(data, item.children || [])
    };

    return node;
  });
}

function generateCode(data: NodeTree[]) {
  let code = "";
  data.forEach(item => {
    const { componentName, className, style, children = [] } = item;
    if (componentName && !isHTMLTag(componentName)) {
      const jsxCode = WidgetBuilder.get(componentName).templateString
      code += '\n' + jsxCode
      return
    }

    if (componentName && typeof componentName === 'string') {
      code += `<${componentName} `;
    }
    if (className) {
      code += `class="${className}" `;
    }
    if (style) {
      code += `style="${style}" `;
    }

    if (componentName === 'img') {
      code += '/>'
    } else {
      code += ">\n\t" + generateCode(children);
      code += `</${componentName}>`;
    }
  });
  return code;
}

export function generateFormattedCode(
  data: Record<TreeKey, NodeDeclaration>,
  keys = [ROOT_ID]
) {
  const treeData = toTree(data, keys);
  const code = generateCode(treeData);
  return HTMLPrettier.format(code, {
    parser: "html",
    plugins: [HTMLPlugin]
  });
}
