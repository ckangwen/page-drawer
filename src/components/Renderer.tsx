import { defineComponent } from '@vue/composition-api';
import { VNode } from "vue/types/umd";
import {
  useNamespacedGetters,
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
import { isHTMLTag } from '../libs/helper';
import { WidgetBuilder } from '../libs/widgets/WidgetBuilder';
type Props = {
  keys: TreeKey[];
};

export default defineComponent({
  name: "Renderer",
  props: {
    keys: Array
  },
  setup(props: Props) {
    const { componentData, mode } = useNamespacedState<EditorState>("editor", [
      "componentData",
      "mode"
    ]);
    const { currentComponent } = useNamespacedGetters('editor', ["currentComponent"])
    const { setHoveredUuid, setCurrentUuid } = useNamespacedMutations<
      EditorMutation
    >("editor", ["setHoveredUuid", "setCurrentUuid"]);
    const { setWidgetDrawerVisible } = useNamespacedMutations("app", [
      "setWidgetDrawerVisible"
    ]);

    const onClick = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      if (mode.value === 'read') return
      if (item?.id === ROOT_ID) return;
      setCurrentUuid(item.id);
    };
    const onDblclick = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      if (mode.value === 'read') return
      setWidgetDrawerVisible(true);
      setCurrentUuid(item.id);
    };
    const onMouseenter = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      if (mode.value === 'read') return

      const id = item.id;
      if (id === ROOT_ID) return;
      setHoveredUuid(id);
    };
    const onMouseleave = (e: MouseEvent, item: any) => {
      e.stopPropagation();
      if (mode.value === 'read') return
      const id = item.id;
      if (id === ROOT_ID) return;
      setHoveredUuid("");
    };

    return {
      componentData,
      currentComponent,
      onClick,
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
        let ComponentName: any = node[k].componentName || "div";
        if(!isHTMLTag(ComponentName)) {
          ComponentName = WidgetBuilder.getTemplate(ComponentName)
        }
        let children: VNode[] = [];
        const res = getNodes(node, node[k].children) || [];
        children = children.concat(res);

        if (classNames.indexOf("w100") > -1) {
          delete style.width;
        }
        if (classNames.indexOf("h100") > -1) {
          delete style.height;
        }

        const props = this.currentComponent ? this.currentComponent.props : {}

        return (
          <ComponentName
            class={(classNames || []).join(" ")}
            style={style}
            attrs={{
              id: node[k].id,
              "data-key": k
            }}
            props={{
              ...(this.currentComponent ? this.currentComponent.props : {})
            }}
            { ...props }
            onClick={(e: MouseEvent) => this.onClick(e, node[k])}
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
