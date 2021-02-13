import { AppState } from "../type";
import { MutationTree } from "vuex";
import { TABNAMES } from "@/libs";

const state: AppState = {
  stylePanelVisible: false,
  widgetDrawerVisible: false,
  codeDialogVisible: false,
  codeActionType: '',
  activeTabName: TABNAMES["STYLE"],
  canvasSize: {
    width: "100%",
    height: "100%"
  }
};

const mutations: MutationTree<AppState> = {
  setStylePanelVisible(state, visible) {
    state.stylePanelVisible = visible;
  },
  setWidgetDrawerVisible(state, visible) {
    state.widgetDrawerVisible = visible;
  },
  setCodeDialogVisible(state, { visible, action = '' }) {
    state.codeDialogVisible = visible;
    state.codeActionType = action
  },
  setActiveTabName(state, name) {
    state.activeTabName = name;
  },
  setCanvasSize(state, size) {
    state.canvasSize = size;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
