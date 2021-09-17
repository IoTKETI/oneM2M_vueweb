import Vue from "vue";
import Vuex from "vuex";

import websocket from "@/store/websocket.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    websocket
  }
});
