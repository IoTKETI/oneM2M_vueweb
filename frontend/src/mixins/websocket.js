export default {
    methods: {
      sendMessage(message) {
        this.$store.dispatch("sendMessage", message);
      }
    }
  };
  