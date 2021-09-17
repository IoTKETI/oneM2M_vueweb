<template>
<b-container>
  <div class="home-container">
    <b-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Configuration
      </div>
        <b-row :gutter="20">
          <b-col :span="8">
              <b-form-input label="host" v-model="connection.host"></b-form-input>
          </b-col>
          <b-col :span="8">
              <b-form-input label="Port" v-model.number="connection.port" type="number"></b-form-input>
          </b-col>
          <b-col :span="24">
            <b-button
              variant="success"
              type="button"
              class="m-1 conn-btn"
              :disabled="client.connected"
              @click="createConnection"
            >
              {{ client.connected ? 'Connected' : 'Connect' }}
            </b-button>

            <b-button v-if="client.connected" variant="danger" type="button" size="small" class="conn-btn" @click="destroyConnection">
              Disconnect
            </b-button>
          </b-col>
        </b-row>
    </b-card>
    <b-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Subscribe
      </div>
      <b-form ref="subscription" hide-required-asterisk size="small" label-position="top" :model="subscription">
        <b-row :gutter="20">
          <b-col :span="8">
              <b-form-input v-model="subscription.topic"></b-form-input>
          </b-col>
          <b-col :span="8">
            <b-button
              :disabled="!client.connected"
              type="button"
              variant="success"
              size="small"
              class="subscribe-btn"
              @click="doSubscribe"
            >
              {{ subscribeSuccess ? 'Subscribed' : 'Subscribe' }}
            </b-button>
            <b-button
              :disabled="!client.connected"
              type="button"
              variant="danger"
              size="small"
              class="subscribe-btn"
              style="margin-left:20px"
              @click="doUnSubscribe"
              v-if="subscribeSuccess"
            >
              Unsubscribe
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Publish
      </div>
        <b-row :gutter="20">
          <b-col :span="8">
              <b-form-input label="Topic" v-model="publish.topic"></b-form-input>
          </b-col>
          <b-col :span="8">
              <b-form-input v-model="publish.payload" size="small"></b-form-input>
          </b-col>
        </b-row>
      <b-col :span="24">
        <b-button :disabled="!client.connected" type="button" variant="success" size="small" class="m-2 publish-btn" @click="doPublish">
          Publish
        </b-button>
      </b-col>
    </b-card>
    <b-card shadow="always" style="margin-bottom:30px;">
      <div class="emq-title">
        Receive
      </div>
      <b-col :span="24">
        <b-form-textarea id="textres" v-model="receiveNews" rows="3" max-rows="20"></b-form-textarea>
      </b-col>
    </b-card>
  </div>
  </b-container>
</template>
<script>
import mqtt from 'mqtt'

export default {

  data(){
    return{
      connection: {
          host: '127.0.0.1',
          port: 9001,
          endpoint: '/mqtt',
          clean: true, // Reserved session
          connectTimeout: 4000, // Time out
          reconnectPeriod: 4000, // Reconnection interval
          // Certification Information
          clientId: 'mqttjs_3be2c321',
          username: 'keti_test',
          password: 'keti_test',
      },
      subscription: {
        topic: 'topic/mqtt',
        qos: 0,
      },
      publish: {
        topic: 'topic/browser',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    } 
  },
  methods: {
    // Create connection
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    doSubscribe() {
  const { topic, qos } = this.subscription
  this.client.subscribe(topic, { qos }, (error, res) => {
    console.log(error);
    if (error) {
      console.log('Subscribe to topics error', error)
      // return
    }
    this.subscribeSuccess = true
    console.log('Subscribe to topics res', res)
    })
    
},
doUnSubscribe() {
  const { topic } = this.subscription
  this.client.unsubscribe(topic, error => {
    if (error) {
      console.log('Unsubscribe error', error)
    }
  })
},
doPublish() {
  const { topic, qos, payload } = this.publication
  this.client.publish(topic, payload, qos, error => {
    if (error) {
      console.log('Publish error', error)
    }
  })
},
destroyConnection() {
  if (this.client.connected) {
    try {
      this.client.end()
      this.client = {
        connected: false,
      }
      console.log('Successfully disconnected!')
    } catch (error) {
      console.log('Disconnect failed', error.toString())
    }
  }
}
}
}
  // mounted() {
  //   this.sockets.listener.subscribe("user-connected", (data) => {
  //       debugger;
  //       console.log(data);
  //       this.$socket.emit("users");
  //   });
  //   this.$socket.emit("users");
  //   this.sockets.listener.subscribe("users", (data) => {
  //       console.log("users", data);
  //   });
  // }
</script>