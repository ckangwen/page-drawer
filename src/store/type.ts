import { ActionContext } from "vuex";

// Others
export type EditorMode = "read" | "edit";

export type TreeKey = string;

export interface NodeDeclaration {
  id: string;
  class: string[];
  style: Record<string, any>;
  children: TreeKey[];
  componentName: (() => JSX.Element) | string;
  parentId: string;
}
// State
export type RootState = {};

export type AppState = {
  stylePanelVisible: boolean;
  widgetDrawerVisible: boolean;
};

export type EditorState = {
  mode: EditorMode;
  canvasSize?: Record<"width" | "height", number>;
  componentData: Record<TreeKey, NodeDeclaration>;
  currentComponent?: any;
  currentUuid: TreeKey;
  hoveredUuid: TreeKey;
  snapshotData: any[];
  snapshotIndex: number;
};

// Mutations
export type EditorMutation = {
  setEditorMode: (state: EditorState, mode: EditorMode) => void;
  addChildren: (
    state: EditorState,
    { parentKey, childKey }: { parentKey: TreeKey; childKey: TreeKey }
  ) => void;
  deleteComponent: (state: EditorState, { key }: { key?: TreeKey }) => void;
  addComponent: (
    state: EditorState,
    { key, node }: { key: TreeKey; node: any }
  ) => void;
  updateStyle: (
    state: EditorState,
    { key, style }: { key?: TreeKey; style: any }
  ) => void;
  updateClass: (
    state: EditorState,
    { key, classNames }: { key?: TreeKey; classNames: string[] }
  ) => void;
  updateComponentName: (
    state: EditorState,
    {
      componentName,
      key
    }: { componentName: NodeDeclaration["componentName"]; key?: TreeKey }
  ) => void;
  setCurrentUuid: (state: EditorState, id: string) => void;
  setHoveredUuid: (state: EditorState, id: string) => void;
  recordSnapshot: (state: EditorState) => void;
  setComponentData: (state: EditorState, componentData: any[]) => void;
};

export type AppMutations = {
  setStylePanelVisible: (state: AppState, visible: boolean) => void;
  setWidgetDrawerVisible: (state: AppState, visible: boolean) => void;
};

// Actions
export type EditorAction = {
  undo: (injectee: ActionContext<EditorState, RootState>) => void;
  redo: (injectee: ActionContext<EditorState, RootState>) => void;
};
