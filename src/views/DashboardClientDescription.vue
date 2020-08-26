<template>
  <div class="vx-row">
    <!-- VERTICAL LAYOUT -->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card title="Client Details">
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <label>Client Name</label>
            <vs-input class="w-full" v-model="client_name" />
          </div>
        </div>
        <div class="mt-5">
          <label>Add Description</label>
          <vs-textarea v-model="description" />
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" @click="addClientFn ">{{ edit ? 'Update' : 'Submit'}}</vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              @click="client_name = description =  ''; check3 = false;"
            >Cancel</vs-button>
            <vs-button
              class="justify-end"
              color="success"
              type="filled"
              :to="{ path: '/dashboard/client' }"
            >Back to Clients</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      check3: "",
      client_name: "",
      description: "",
      edit: false
    };
  },
  methods: {
    addClientFn() {
      var this_pointer = this;
      axios({
        method: "post",
        url: "http://adminapi.varuntandon.com/v1/clients",
        data: {
          client_name: this.client_name,
          description: this.description
        },
        headers: {
          "content-type": "application/json"
        }
      })
        .then(function(response) {
          console.log("response", response);
          if (response.data.success) {
            this_pointer.$vs.notify({
              title: "Client Added",
              color: "success",
              position: "top-right"
            });
            (this_pointer.client_name = null),
              (this_pointer.description = null);
          } else {
            this_pointer.$vs.notify({
              title: "Client Already Exist",
              color: "danger",
              position: "top-right"
            });
          }
        })
        .catch(function(error) {
          this_pointer.$vs.notify({
            title: "Client Already Exist",
            color: "danger",
            position: "top-right"
          });
        });
    }
  },
  mounted() {
    if (Object.keys(this.$route.params).length) {
      this.client_name = this.$route.params.clientInfo.client_name;
      this.description = this.$route.params.clientInfo.description;
      this.edit = true;
    }
  }
};
</script>
