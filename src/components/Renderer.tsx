import { defineComponent } from "@vue/composition-api";
import { VNode } from "vue/types/umd";
import {
  useNamespacedMutations,
  useNamespacedState
} from "vuex-composition-helpers";
import {
  EditorState,
  NodeDeclaration,
  TreeKey,
  EditorMutation
} from "../store/type";
import styles from "./renderer.module.scss";
import { ROOT_ID } from "@/libs";

type Props = {
  keys: TreeKey[];
};

export default defineComponent({
  name: "Renderer",
  props: {
    keys: Array
  },
  setup(props: Props) {
    const { componentData } = useNamespacedState<EditorState>("editor", [
      "componentData"
    ]);
    const { setHoveredUuid, setCurrentUuid } = useNamespacedMutations<
      EditorMutation
    >("editor", ["setHoveredUuid", "setCurrentUuid"]);
    const { setWidgetDrawerVisible } = useNamespacedMutations("app", [
      "setWidgetDrawerVisible"
    ]);

    const onDblclick = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      setWidgetDrawerVisible(true);
      setCurrentUuid(item.id);
    };
    const onMouseenter = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      const id = item.id;
      if (id === ROOT_ID) return;
      setHoveredUuid(id);
    };
    const onMouseleave = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      const id = item.id;
      if (id === ROOT_ID) return;
      setHoveredUuid("");
    };

    return {
      componentData,
      onDblclick,
      onMouseenter,
      onMouseleave
    };
  },
  render() {
    const getNodes = (
      node: Record<TreeKey, NodeDeclaration>,
      keys: TreeKey[]
    ) => {
      if (!keys || keys.length === 0) return;

      return keys.map(k => {
        if (!node[k]) return [] as any;
        const classNames = node[k].class;
        const style = node[k].style;
        const ComponentName = node[k].componentName || "div";
        let children: VNode[] = [];
        const res = getNodes(node, node[k].children) || [];
        children = children.concat(res);

        if (classNames.indexOf("w100") > -1) {
          delete style.width;
        }
        if (classNames.indexOf("h100") > -1) {
          delete style.height;
        }

        return (
          <ComponentName
            class={(classNames || []).join(" ")}
            style={style}
            attrs={{
              id: node[k].id,
              "data-key": k
            }}
            onDblclick={(e: MouseEvent) => this.onDblclick(e, node[k])}
            onMouseenter={(e: MouseEvent) => this.onMouseenter(e, node[k])}
            onMouseleave={(e: MouseEvent) => this.onMouseleave(e, node[k])}
          >
            {children}
          </ComponentName>
        );
      });
    };

    const nodes = this.componentData as Record<TreeKey, NodeDeclaration>;
    const keys = this.keys;

    return <div class={styles["flexbox-root"]}>{getNodes(nodes, keys)}</div>;
  }
});
