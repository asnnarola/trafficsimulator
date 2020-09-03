<template>
  <vx-card>
    <div class="flex flex-wrap items-center justify-between">
      <vx-input-group class="mb-base mr-3">
        <span>
          <b>
            <h3>All Clients</h3>
          </b>
        </span>
      </vx-input-group>
      <div class="flex items-center">
        <vs-button class="mb-base mr-3" @click="addClient">Add Client</vs-button>
      </div>
    </div>

    <vs-divider></vs-divider>

    <vs-table v-model="selected" pagination max-items="10" search :data="users">
      <template slot="header">
        <h3>Clients</h3>
      </template>
      <template slot="thead">
        <vs-th sort-key="client_name">Client Name</vs-th>
        <vs-th sort-key="description">Description</vs-th>
        <vs-th sort-key="description">Date</vs-th>
        <!-- <vs-th sort-key="id">ID</vs-th> -->
        <vs-th sort-key="actions">Actions</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].client_name">
            {{
            data[indextr].client_name
            }}
          </vs-td>

          <vs-td :data="data[indextr].description">
            {{
            data[indextr].description
            }}
          </vs-td>
          <vs-td :data="data[indextr].date"></vs-td>
          <vs-td>
            <div class="d-flex">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="deleteClientFn(tr.id)"
              />
            </div>
          </vs-td>
          <!-- <vs-td :data="data[indextr].id">
                        {{data[indextr].website}}
          </vs-td>-->
        </vs-tr>
        <div class="demo-alignment">
          <vs-popup
            class="holamundo"
            title="Are you sure to want delete all the campaigns of this client ?"
            :active.sync="popupActive"
          >
            <span>
              <strong></strong>
            </span>
            <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button
              class="mr-3 mb-2"
              color="warning"
              type="border"
              @click="removeClientData"
            >Yes</vs-button>
            <vs-button
              class="mr-3 mb-2"
              color="warning"
              type="border"
              @click="popupActive=false"
            >No</vs-button>
            </div>
          </vs-popup>
        </div>
      </template>
    </vs-table>

    <!-- POPUP !-->
  </vx-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selected: [],
      tableList: [
        "vs-th: Component",
        "vs-tr: Component",
        "vs-td: Component",
        "thread: Slot",
        "tbody: Slot",
        "header: Slot"
      ],
      users: [],
      date: null,
      AnotherDate: null,
      popupActive: false,
      setName: "",
      removeClient: []
    };
  },
  methods: {
    addClient() {
      this.$router.push("/dashboard/clientdescription");
    },
    getClientFn() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/clients?limit=100",
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          this_pointer.users = response.data.clients;
          console.log("response", this_pointer.users, response.data.clients);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setClientNameFn(event) {
      console.log("clients", this.client, event);
      this.setName = event.data[indextr].client_name;
    },
    editClient(clientInfo) {
      this.$router.push({
        name: "dashboard-clientdescription",
        params: {
          clientInfo: clientInfo
        }
      });
    },
    removeClientData(client_id) {
      console.log("client_id", client_id);
      this.$http
        .delete(
          "http://adminapi.varuntandon.com/v1/campaigns/client/" +
            this.deleteClientId
        )
        .then(response => {
          if (response.data.success) {
            this.$vs.notify({
              title: "Client deleted Successfully",
              color: "success",
              position: "top-right"
            });
            console.log("rrresponse", response.data.success);
          } else {
            this.$vs.notify({
              title: "Error",
              color: "danger",
              position: "top-right"
            });
          }
        });
    },
    deleteClientFn(client_id) {
      this.popupActive = true;
      //client_list = this.clients.client_id;
      this.deleteClientId = client_id;
    }
  },
  mounted() {
    this.getClientFn();
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
}
.d-flex button {
  margin: 0 0.5rem;
}

</style>
