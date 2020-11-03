<template>
  <div class="vx-row">
    <!-- VERTICAL LAYOUT -->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <span>
              <b>
                <h3>Client Details</h3>
              </b>
            </span>
          </vx-input-group>
          <div class="flex items-center">
            <vs-button
              class="justify-end mb-base mr-3"
              type="filled"
              :to="{ path: '/dashboard/client' }"
            >Back to Clients</vs-button>
          </div>
        </div>

        <div class="vx-row mb-6" :data="clientValue">
          <div class="vx-col w-full">
            <label>Client Name</label>
            <vs-input class="w-full mt-1" v-model="clientValue.client_name" />
          </div>

          <div class="vx-col w-full mt-5">
            <label>Add Description</label>
            <div class="mt-1">
              <vs-textarea v-model="clientValue.description" height="150px" />
            </div>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              class="mr-3 mb-2"
              color="success"
              @click="edit ? updateClient() : addClientFn()"
            >
              {{
              edit ? "Update" : "Submit"
              }}
            </vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              @click="
                client_name = description = '';
                check3 = false;
              "
            >Cancel</vs-button>
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
      edit: false,
      check3: "",
      clientId: null,
      clients: [],
      client_name: "",
      description: "",
      clientValue: {
        client_name: "",
        description: ""
      },

      newClient: {}
    };
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      (this.clientId = this.$route.query.clientId),
        (this.clientValue.client_name = this.$route.query.clientName),
        (this.clientValue.description = this.$route.query.clientDescription);
      this.edit = true;
    }
  },
  methods: {
    addClientFn() {
      var this_pointer = this;

      axios({
        method: "post",
        url: "https://adminapi.varuntandon.com/v1/clients",
        data: {
          client_name: this.clientValue.client_name,
          description: this.clientValue.description
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
            (this_pointer.clientValue.client_name = null),
              (this_pointer.clientValue.description = null);
            this_pointer.$router.push("/dashboard/client");
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
    },
    // getClientFn(id) {
    //   axios
    //     .get("https://adminapi.varuntandon.com/v1/clients")
    //     .then(response => {
    //       console.log("firstResponse", response);
    //       this.clients = response.data.clients;
    //       this.clientValue = {
    //         client_name: this.clients[parseInt(this.clientId) - 1].client_name,
    //         description: this.clients[parseInt(this.clientId) - 1].description
    //       };
    //       console.log("Clientresponse", this.clientValue);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    updateClient(clientId) {
      //var this_pointer = this;
      // this.edit = true;

      this.$http
        .put(`https://adminapi.varuntandon.com/v1/client/${this.clientId}`, {
          // client_name: this_pointer.clientValue.client_name,
          description: this.clientValue.description
        })
        .then(response => {
          console.log("===>", response);
          if (response.data.success) {
            this.$vs.notify({
              title: "Client Updated",
              color: "success",
              position: "top-right"
            });
            this.$router.push("/dashboard/client");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
