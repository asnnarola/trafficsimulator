<template>
  <div class="vx-row">

    <!-- VERTICAL LAYOUT -->
  <div class="vx-col md:w-4/3 w-full mb-base">
     <vx-card title="Client Details">
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
              <label>Client Name</label>
            <vs-input class="w-full" v-model="input9" />
          </div>
        </div>
                <div class="mt-5">
                    <label>Add Description</label>
                    <vs-textarea v-model="textarea"/>
                </div>
          <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button class="mr-3 mb-2" @click="addClientFn">Submit</vs-button>
                    <vs-button color="warning" type="border" class="mb-2" @click="input9 = input10 = input11 = input12 = ''; check3 = false;">Cancel</vs-button>
                </div>
          </div>
      </vx-card>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data () {
    return {
      check3: '',
      input9: '',
      input10: '',
      input11: '',
      input12: '',
      textarea: ''
    }
  },
  methods: {
          addClientFn(){
                axios({
                  method: 'post',
                  url: 'http://adminapi.varuntandon.com/v1/clients',
                  data:{
                    'client_name': 'mihir',
                    'description': 'hello'
                  },
                  headers: {'content-type': 'application/json'}
                })

                .then(function(response){
                  console.log('response',response);
                })
                
                .catch(function(response){
                  console.log(error);
                })
          }
  } 
}

</script>