import Vue from "vue";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import { cloneDeep, omit } from "lodash";
import { RootState, EditorState, EditorMode, TreeKey } from "../type";
import { ROOT_ID } from "@/libs";

const deleteComponent = (
  key: TreeKey,
  componentData: EditorState["componentData"]
) => {
  const currentComponent = componentData[key];
  // 删除父节点中的id
  const parentId = currentComponent.parentId;
  if (parentId) {
    const parent = componentData[parentId];
    const index = parent.children.indexOf(key);
    index > -1 && parent.children.splice(index, 1);
  }

  // 删除子节点
  const childIds = currentComponent.children;
  if (childIds && childIds.length > 0) {
    childIds.forEach(id => {
      deleteComponent(id, componentData);
    });
  }

  const newData = omit(componentData, [key]);
  return newData;
};

const state: EditorState = {
  mode: "read",
  componentData: {
    [ROOT_ID]: {
      id: ROOT_ID,
      class: [],
      style: {
        width: "100%",
        height: "100%"
      },
      children: [],
      componentName: "div",
      parentId: ""
    }
  },
  currentComponent: null,
  currentUuid: "",
  hoveredUuid: "",
  snapshotData: [],
  snapshotIndex: -1
};

const getters: GetterTree<EditorState, RootState> = {
  currentComponent(state) {
    return state.componentData[state.currentUuid];
  }
};

const mutations: MutationTree<EditorState> = {
  setEditorMode(state, mode: EditorMode) {
    state.mode = mode;
  },
  addChildren(state, { parentKey, childKey }) {
    state.componentData[parentKey].children.push(childKey);
    state.componentData[childKey].parentId = parentKey;
  },
  addComponent(state, { key, node }) {
    if (!key) key = state.currentUuid;

    Vue.set(state.componentData, key, node);
  },
  deleteComponent(state, { key }) {
    if (!key) key = state.currentUuid;

    const newComponentData = deleteComponent(key, state.componentData);

    Vue.set(state, "componentData", newComponentData);
  },
  updateStyle(state, { key, style }) {
    if (!key) key = state.currentUuid;

    state.componentData[key].style = {
      ...state.componentData[key].style,
      ...style
    };
  },
  updateClass(state, { key, classNames }) {
    state.componentData[key].class = classNames;
  },
  updateComponentName(state, { componentName, key, templateName }) {
    if (!key) key = state.currentUuid;
    state.componentData[key].componentName = componentName;
    state.componentData[key].templateName = templateName;
  },
  setCurrentUuid(state, id) {
    state.currentUuid = id;
  },
  setHoveredUuid(state, id) {
    state.hoveredUuid = id;
  },
  setComponentData(state, componentData = []) {
    Vue.set(state, "componentData", componentData);
  },
  recordSnapshot(state) {
    state.snapshotData[++state.snapshotIndex] = cloneDeep(state.componentData);

    if (state.snapshotIndex < state.snapshotData.length - 1) {
      state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1);
    }
  }
};

const actions: ActionTree<EditorState, RootState> = {
  undo({ state, commit }) {
    if (state.snapshotIndex >= 0) {
      state.snapshotIndex--;
      commit(
        "setComponentData",
        cloneDeep(state.snapshotData[state.snapshotIndex])
      );
    }
  },
  redo({ state, commit }) {
    if (state.snapshotIndex < state.snapshotData.length - 1) {
      state.snapshotIndex++;
      commit(
        "setComponentData",
        cloneDeep(state.snapshotData[state.snapshotIndex])
      );
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
