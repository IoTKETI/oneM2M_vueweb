import Vue from "vue";

const state = {
  socket: {
    message: {},
    isConnected: false,
    reconnectError: false
  }
};

const getters = {};

const actions = {
  sendMessage: function({ commit }, message) {
    commit("SOCKET_SEND_MESSAGE", message);
  }
};

const mutations = {
  SOCKET_ONMESSAGE(state, message) {
    console.log("Recieved message:", message);
    state.socket.message = message;
  },
  SOCKET_ONOPEN(state, event) {
    console.log(`Connected to ${event.currentTarget.url}`);
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE(state, event) {
    console.log(`Disconnected from ${event.currentTarget.url}`);
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event);
  },
  SOCKET_RECONNECT(state, count) {
    console.info(state, count);
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
  SOCKET_SEND_MESSAGE(state, message) {
    state.socket.isConnected && Vue.prototype.$socket.sendObj(message);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
