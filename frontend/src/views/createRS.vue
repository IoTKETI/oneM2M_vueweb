<template>

  <b-container>
    <h2>Create Resource</h2>
    <b-row>
    <b-col align-self="baseline">
        <div role="group">
       
          <label for="input-live">Platform Address:</label>
          <b-form-input
            id="Platform"
            v-model="data_obj.Platform_addr"
            :state="data_obj.Platform_addr.length >= 9"
            placeholder="Enter your Platform Addr"
            trim
          ></b-form-input>

          <label for="input-live">Resource ID(To):</label>
          <b-form-input
            id="resid"
            v-model="data_obj.Res_Id"
            :state="data_obj.Res_Id.length >= 3"
            placeholder="Enter your Resource ID(TO)"
            trim
          ></b-form-input>

          <label for="input-live">Resource name:</label>
          <b-form-input
            id="res_name"
            v-model="res_name"
            :state="res_name.length >= 1"
            ref="res_name"
            @change=change
            placeholder="Enter your Resource name"
            trim
          ></b-form-input>

          <br>
          <h3>Headers</h3>

          <label for="input-live">X-M2M-RI:</label>
          <b-form-input
            id="xm2mri"
            v-model="data_obj.X_M2M_RI"
            :state="data_obj.X_M2M_RI.length >= 4"
            placeholder="Enter X-M2M RI"
            trim
          ></b-form-input>

           <label for="input-live">X-M2M-Origin:</label>
            <b-form-input
            id="xm2morigin"
            v-model="data_obj.X_M2M_Origin"
            :state="data_obj.X_M2M_Origin.length >= 1"
            placeholder="Enter X-M2M Origin"
            trim
            ></b-form-input>
        
          <label for="input-live">Accept:</label>
          <b-form-input
            id="accept"
            v-model="data_obj.Accept"
            :state="data_obj.Accept.length >= 6"
            placeholder="Enter Accept"
            trim
            ></b-form-input>

            <br>
          <div>
            <button type="button" class="m-1 btn btn-outline-dark " @click="ae_print">AE</button>
            <button type="button" class="m-1 btn btn-outline-dark " @click="cnt_print">Container</button>
            <button type="button" class="m-1 btn btn-outline-dark " @click="cin_print">ContentInstence</button>
            <button type="button" class="m-1 btn btn-outline-dark " @click="sub_print">Subscription</button>
          </div>
        </div>
     </b-col>
            
     <b-col align-self="stretch"><h5>Request</h5>
       <b-card shadow="always">
          <div>
                <b>Header</b>
                <b-table ref="reqtable" style="font-size: 0.9rem;" small stacked :items="req_items" :fields="req_fields">

                </b-table>
                <b>Body</b>
               <b-form-textarea style="font-size: 0.8rem;" id="textreq" v-model="request_text" rows="10" max-rows="22"></b-form-textarea>
          </div>
        </b-card>  
     </b-col>

    </b-row>
          <br>
    <b-row>
     <b-col sm="6" md="5" lg="6">
            <b-button variant="dark" size="lg" @click="post_requst">Send</b-button> 
     </b-col>
     <b-col sm="6" md="5" offset-md="2" lg="6" offset-lg="0"><h5>Response</h5>
       <b-card shadow="always">
         <div>
           <b>Header</b>
           <b-table ref="restable" style="font-size: 0.9rem;" small stacked :items="res_items" :fields="res_fields">
            
           </b-table>
           <b>Body</b> {{(this.res_status)}}
           <b-form-textarea style="font-size: 0.8rem;" id="textres" v-model="response_text" rows="10" max-rows="20"></b-form-textarea>
         </div>
       </b-card> 
     </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios"

export default {
    data() {
      return {
        res_name:'',
          data_obj: {
            Platform_addr: '127.0.0.1:7579',
            Res_Id:'Mobius',
            X_M2M_RI:'1234',
            X_M2M_Origin:'S',
            Accept:'application/json',
        },
        req_fields:[
                {key:"X-M2M-RI",class: 'text-center'},
                {key:"X-M2M-Origin",class: 'text-center'},
                {key:"Content-Type",class: 'text-center'},
                {key:"Accept",class: 'text-center'}
        ],
        req_items:[
               {"X-M2M-RI":"","X-M2M-Origin":"","Content-Type":"","Accept":""},
        ],
        res_fields:[
                {key:"X-M2M-RI",class: 'text-center'},
                {key:"X-M2M-RSC",class: 'text-center'},
                {key:"X-M2M-RVI",class: 'text-center'},
                {key:"Content-Length",class: 'text-center'},
                {key:"Content-Type",class: 'text-center'},
        ],
        res_items:[
               {"X-M2M-RI":"","X-M2M-RSC":"","X-M2M-RVI":"","Content-Length":"","Content-Type":""},
        ],
        headers_text: "",
        request_text: "",
        response_text: "",
        res_mess:'',
        res_errmess:'',
        res_status:''
      }
    },
    methods:{
      request_header_change(obj){
        console.log(obj);
        this.req_items[0]["X-M2M-RI"] = obj["X-M2M-RI"];
        this.req_items[0]["X-M2M-Origin"] = obj["X-M2M-Origin"];
        this.req_items[0]["Content-Type"] = obj["Content-Type"];
        this.req_items[0]["Accept"] = obj["Accept"];
        this.$refs.reqtable.refresh();
      },
      response_header_change(obj){
        console.log(obj);
        this.res_items[0]["X-M2M-RI"] = obj["X-M2M-RI"];
        this.res_items[0]["X-M2M-RSC"] = obj["X-M2M-RSC"];
        this.res_items[0]["X-M2M-RVI"] = obj["X-M2M-RVI"];
        this.res_items[0]["Content-Length"] = obj["Content-Length"];
        this.res_items[0]["Content-Type"] = obj["Content-Type"];
        this.$refs.restable.refresh();
      },
      ae_print () {
        let ae_obj = {};
        ae_obj["m2m:ae"] ={}
        ae_obj["m2m:ae"].rn = "ae_test"
        ae_obj["m2m:ae"].api = "0.2.481.2.0001.001.000111"
        ae_obj["m2m:ae"].lbl = ["key1","key2"]
        ae_obj["m2m:ae"].rr = true
        ae_obj["m2m:ae"].rn = this.res_name 
        
        this.data_obj["Content-Type"] = 'applicaton/json;ty=2'
        this.data_obj["body"] = ae_obj

        let headers = {}
        headers["X-M2M-RI"] = this.data_obj.X_M2M_RI
        headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin
        headers["Accept"] = this.data_obj.Accept
        headers["Content-Type"] = this.data_obj["Content-Type"]

        this.req_display_obj = ae_obj
        this.request_header_change(headers)
        return this.request_text = JSON.stringify(ae_obj, undefined, 2)
      },
      cnt_print () {
        let cnt_obj = {};
        cnt_obj["m2m:cnt"] ={}
        cnt_obj["m2m:cnt"].rn = "cnt_test"
        cnt_obj["m2m:cnt"].lbl = ["API"]

        cnt_obj["m2m:cnt"].rn = this.res_name 
        this.data_obj["Content-Type"] = 'applicaton/json;ty=3'
        this.data_obj["body"] = cnt_obj

        let headers = {}
        headers["X-M2M-RI"] = this.data_obj.X_M2M_RI
        headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin
        headers["Accept"] = this.data_obj.Accept
        headers["Content-Type"] = this.data_obj["Content-Type"]
        this.req_display_obj = cnt_obj
        this.request_header_change(headers)
        return this.request_text = JSON.stringify(this.req_display_obj, undefined, 2)
      },
      cin_print () {
        let cin_obj = {};
        cin_obj["m2m:cin"] ={}
        cin_obj["m2m:cin"].con = this.res_name
        
       
        this.data_obj["Content-Type"] = 'applicaton/json;ty=4'
        this.data_obj["body"] = cin_obj
        
        let headers = {}
        headers["X-M2M-RI"] = this.data_obj.X_M2M_RI
        headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin
        headers["Accept"] = this.data_obj.Accept
        headers["Content-Type"] = this.data_obj["Content-Type"]
        this.req_display_obj=cin_obj
        this.request_header_change(headers)
        
        return this.request_text = JSON.stringify(this.req_display_obj, undefined, 2)
      },
      sub_print () {
        let sub_obj = {};
        sub_obj["m2m:sub"] ={}
        sub_obj["m2m:sub"].rn = "sub"
        sub_obj["m2m:sub"].enc = {}
        sub_obj["m2m:sub"].enc.net = [3]
        sub_obj["m2m:sub"].exc = 0        
        sub_obj["m2m:sub"].rn = this.res_name 
        sub_obj["m2m:sub"].nu = ["http://127.0.0.1:8369"]
        this.data_obj["Content-Type"] = 'applicaton/json;ty=23'
        this.data_obj["body"] = sub_obj

        let headers = {}
        headers["X-M2M-RI"] = this.data_obj.X_M2M_RI
        headers["X-M2M-Origin"] = this.data_obj.X_M2M_Origin
        headers["Accept"] = this.data_obj.Accept
        headers["Content-Type"] = this.data_obj["Content-Type"]
        
        this.req_display_obj=sub_obj
        this.request_header_change(headers)
        
        return this.request_text = JSON.stringify(this.req_display_obj, undefined, 2)
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
            this.res_status = response.status
            let headers = {}
            headers["X-M2M-RI"] = response.headers["x-m2m-ri"]
            headers["X-M2M-RSC"] = response.headers["x-m2m-rsc"]
            headers["X-M2M-RVI"] = response.headers["x-m2m-rvi"]
            headers["Content-Length"] = response.headers["content-length"]
            headers["Content-Type"] = response.headers["content-type"]
            this.response_header_change(headers)
            
            return this.response_text = JSON.stringify(this.res_mess, undefined, 2)
          })
          .catch(error => {
            this.res_errmess = error.response.data
            if(error.response.status === 409){
              this.res_status = error.response.status
            }else if(error.response.status === 404){
              this.res_status = error.response.status  
            }
            let headers = {}
            headers["X-M2M-RI"] = error.response.headers["x-m2m-ri"]
            headers["X-M2M-RSC"] = error.response.headers["x-m2m-rsc"]
            headers["X-M2M-RVI"] = error.response.headers["x-m2m-rvi"]
            headers["Content-Length"] = error.response.headers["content-length"]
            headers["Content-Type"] = error.response.headers["content-type"]
            this.response_header_change(headers)

            return this.response_text = this.res_errmess
          });
      }
    }
  }
</script>