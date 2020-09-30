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

        <div class="vx-row mb-6" :data="clients">
          <div class="vx-col w-full">
            <label>Client Name</label>
            <vs-input class="w-full mt-1" v-model="client_name" />
          </div>

          <div class="vx-col w-full mt-5">
            <label>Add Description</label>
            <div class="mt-1">
              <vs-textarea v-model="description" height="150px" />
            </div>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" color="success" @click="addClientFn">
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
      check3: "",
      edit: false,
      clientId: null,
      clients: [],
      client_name: "",
      description: "",
      clientInfo: {
        client_name: "",
        description: ""
      }
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
    },
    getClientFn(client_id) {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/clients",
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          this_pointer.clientInfo = response.data;
          console.log("response", clientInfo);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.id = this.$route.query.clientId;
      this.client_name = this.$route.query.clientName;
      this.description = this.$route.query.clientDescription;
      this.edit = true;
    }
    this.getClientFn(this.clientId);
  }
};
</script>
