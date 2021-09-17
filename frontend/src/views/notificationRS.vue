<template>
  <b-container>
    <h2>Notification Resource</h2>
    <b-row :gutter="20">
          <b-col :span="8">
              <b-form-input label="host" v-model="host"></b-form-input>
          </b-col>
          <b-col :span="8">
              <b-form-input label="Port" v-model.number="port" type="number"></b-form-input>
          </b-col>
          <b-col :span="24">
            <b-button
              variant="success"
              type="button"
              class="m-1 conn-btn"
              :disabled="this.connected"
              @click="connSubmit"
            >
              {{ connected ? 'Connected' : 'Connect' }}
            </b-button>
            <b-button v-if="this.connected" variant="danger" type="button" size="small" class="conn-btn" @click="closeSubmit">
              Disconnect
            </b-button>
          </b-col>
    <b-row>
            <b-card shadow="always" style="margin-bottom:30px;">
        <div class="emq-title">
          Receive
        </div>
        <b-col :span="24">
          <b-button variant="success" type="button" size="small" class="m-1 conn-btn" @click="recv_start">
              START
          </b-button>
          <b-button variant="danger" type="button" size="small" class="m-1 conn-btn" @click="recv_stop">
              STOP
          </b-button>
          <b-form-textarea id="textres" v-model="response_text" rows="3" max-rows="20"></b-form-textarea>
        </b-col>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios"
import {mixin as VueTimers} from 'vue-timers'
export default {
    data() {
      return {
        response_text: "",
        connected:false,
        rev_connted:false,
        host: '127.0.0.1',
        port: '8369',
      }
    },
    mixins: [VueTimers],
    timers: {
          getData:{time:1000, repeat:true}
    },
    methods:{
      sub_print () {
        let sub_obj = {};
        sub_obj["m2m:sub"] ={}
        sub_obj["m2m:sub"].rn = "sub"
        sub_obj["m2m:sub"].enc = {}
        sub_obj["m2m:sub"].enc.net = [3]

        sub_obj["m2m:sub"].rn = this.res_name 
        sub_obj["m2m:sub"].nu = ["http://127.0.0.1/3000"]
        this.data_obj["Content-Type"] = 'applicaton/json;ty=23'
        this.data_obj["body"] = sub_obj
        return this.request_text = JSON.stringify(this.data_obj, undefined, 2)
      },
      post_requst(){
        let url = "http://" + this.data_obj.Platform_addr + "/" + this.data_obj.Res_Id
        const headers = {}
        headers["X-M2M-RI"] = this.data_obj.X_M2M_RI
        headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin
        headers["Accept"] = this.data_obj.Accept
        headers["Content-Type"] = this.data_obj["Content-Type"]
        
        let body = this.data_obj.body
        axios.post(url, body, { headers })
          .then(response =>{
            this.res_mess = response.data;
            console.log(this.res_mess, response.status);
            let res_obj = {}
            res_obj.status = response.status
            res_obj.Body = this.res_mess

            return this.response_text = JSON.stringify(res_obj, undefined, 2)
          })
          .catch(error => {
            this.res_errmess = error.message
            return this.response_text = this.res_errmess
          });
      },
      connSubmit () {
      
          this.connected = true;
          axios.post('http://localhost:3000/notion', {
        
          host: this.host,
          port: this.port
      })
        .then((response) => {
          this.output = response.data
        })
        .catch((error) => {
          this.output = error
        })
      },
      closeSubmit () {
          if(this.rev_connted==true){
            this.$timers.stop('getData')
          }
          this.connected = false
          axios.post('http://localhost:3000/noticlose', {
          
          })
            .then((response) => {
              this.output = response.data
            })
            .catch((error) => {
              this.output = error
            })
      },
    getData() {
        axios.get('http://localhost:3000/getdata')
          .then((response) => {
          console.log(response.data);
          return this.response_text = JSON.stringify(response.data, undefined, 2)
        })
    },
    recv_start(){
        this.$timer.start('getData')
        this.rev_connted = true
    },
    recv_stop(){
        this.$timer.stop('getData')
        this.rev_connted = false
    }
  }
}
</script>