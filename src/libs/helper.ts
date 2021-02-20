// import HTMLPrettier from 'prettier/esm/standalone'
// import HTMLPlugin from 'prettier/esm/parser-html.mjs'
import { NodeDeclaration, TreeKey } from "../store/type";

type NodeTree = Omit<NodeDeclaration, "children"> & {
  children: NodeTree[];
  key: TreeKey;
};

export const ROOT_ID = "ROOT-ID";

export function transformToTree(
  data: Record<TreeKey, NodeDeclaration>,
  keys: TreeKey[] = [ROOT_ID]
) {
  if (Object.keys(data).length === 0) return [];
  return keys.map(k => {
    let item: NodeTree = {} as any;
    item = { ...data[k] } as any;
    item.key = k;
    if (data[k].children.length > 0) {
      item.children = transformToTree(data, data[k].children);
    }
    return item;
  });
}


const HTMLTag = [
  'html',    'body',    'base',
  'head',    'link',    'meta',
  'style',   'title',   'address',
  'article', 'aside',   'footer',
  'header',  'h1',      'h2',
  'h3',      'h4',      'h5',
  'h6',      'hgroup',  'nav',
  'section', 'div',     'dd',
  'dl',      'dt',      'figcaption',
  'figure',  'picture', 'hr',
  'img',     'li',      'main',
  'ol',      'p',       'pre',
  'ul',    'blockquote', 'iframe',  'tfoot',
  'a',        'b',          'abbr',    'bdi',     'bdo',
  'br',       'cite',       'code',    'data',    'dfn',
  'em',       'i',          'kbd',     'mark',    'q',
  'rp',       'rt',         'rtc',     'ruby',    's',
  'samp',     'small',      'span',    'strong',  'sub',
  'sup',      'time',       'u',       'var',     'wbr',
  'area',     'audio',      'map',     'track',   'video',
  'embed',    'object',     'param',   'source',  'canvas',
  'script',   'noscript',   'del',     'ins',     'caption',
  'col',      'colgroup',   'table',   'thead',   'tbody',
  'td',       'th',         'tr',      'button',  'datalist',
  'fieldset', 'form',       'input',   'label',   'legend',
  'meter',    'optgroup',   'option',  'output',  'progress',
  'select',   'textarea',   'details', 'dialog',  'menu',
  'menuitem', 'summary',    'content', 'element', 'shadow',
  'template'
]

export const isHTMLTag = (tag: string) => {
  return HTMLTag.indexOf(tag) > -1
}

export const getInitialComponentData: () => NodeDeclaration = () => {
  return {
    id: "",
    class: [],
    style: {},
    children: [],
    props: {},
    componentName: "div",
    parentId: ""
  }
}