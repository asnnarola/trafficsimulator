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
      <div v-if="isAdmin" class="flex items-center">
        <vs-button class="mb-base mr-3" @click="addClient">Add Client</vs-button>
      </div>
    </div>

    <vs-divider></vs-divider>

    <vs-table v-model="selected" pagination max-items="50" search :data="users">
      <template slot="header">
        <h3>Clients</h3>
      </template>
      <template slot="thead">
        <vs-th sort-key="client_name">Client Name</vs-th>
        <vs-th sort-key="description">Description</vs-th>
        <vs-th sort-key>Date</vs-th>
        <vs-th v-if="isAdmin" sort-key="actions">Actions</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.client_name">
            {{
            tr.client_name
            }}
          </vs-td>

          <vs-td :data="tr.description">
            {{
            tr.description
            }}
          </vs-td>
          <vs-td :data="tr.date"></vs-td>
          <vs-td v-if="isAdmin">
            <div class="d-flex">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="editClient(tr)"
              />
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
      removeClient: [],
      clientId: null
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.userRole === "admin";
    }
  },
  methods: {
    addClient() {
      this.$router.push("/dashboard/clientdescription");
    },
    getClientFn() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/clients?limit=100",
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
    editClient(data) {
      console.log("i am here");
      // localStorage.setItem("storedData", true);
      this.$router.push({
        path: "/dashboard/clientdescription",
        query: {
          clientId: data.id,
          clientDescription: data.description,
          clientName: data.client_name
        }
      });
    },
    // displayClientDetails(clientInfo){
    //   this.$router.push
    // },
    removeClientData(client_id) {
      console.log("client_id", client_id);
      this.$http
        .delete(
          `https://adminapi.varuntandon.com/v1/campaigns/client/${this.deleteClientId}`
        )
        .then(response => {
          if (response.data.success) {
            const index = this.users.findIndex(c => c.id === client_id);
            this.users.splice(index, 1);
            this.popupActive = false;
            this.getClientFn();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteClientFn(client_id) {
      this.popupActive = true;
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
