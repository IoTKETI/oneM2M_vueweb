<template>
 <div class="home">
    <button @click="connect">connect</button>
    <button @click="disconnect">Disconnect</button>
     <b-form-textarea id="textres" v-model="socketData" rows="10" max-rows="20"></b-form-textarea>
</div>
</template>
<script>


export default {

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      connected: false,
      socketData: '',
    };
  },
  // mounted() {
  //     // this.connect();
  //     this.connect(),
  //     this.onMessge(),
  //     this.disconnect()
  //     // this.onMessge
  //     // this.created();
  // },
  created(){
      this.connect();
      this.onMessge(),
      this.disconnect();
  },
  methods: {
    connect(){
       this.$options.sockets.onopen = data => {
        console.log("connect@");
        console.log(data);
        this.connected = true;
      };
    },
    onMessge(){
      this.$options.sockets.onmessage = data => {
        this.messageReceived(data);
      };
      // this.$options.sockets.onmessage = (value) => {
      //   let msg = JSON.parse(value);
      //     console.log(msg);
      //     return this.socketData = JSON.stringify(msg)

      // };
    },
    disconnect() {
      // this.disconnect();
      this.$options.sockets.onclose = data => {
        console.log("disconnect");
        console.log(data);
      };

      this.connected = false;
    },
    messageReceived(raw_message){
      console.log("raw_message:" + raw_message);
    }
  }
}
</script>