import { AppState } from "../type";
import { MutationTree } from "vuex";

const state: AppState = {
  stylePanelVisible: false,
  widgetDrawerVisible: false
};

const mutations: MutationTree<AppState> = {
  setStylePanelVisible(state, visible) {
    state.stylePanelVisible = visible;
  },
  setWidgetDrawerVisible(state, visible) {
    state.widgetDrawerVisible = visible;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
