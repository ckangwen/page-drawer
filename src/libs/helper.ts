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
