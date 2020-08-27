<template>
  <vx-card>
    <div class="flex flex-wrap items-center justify-between">
      <vx-input-group class="mb-base mr-3">
        <span>
          <b><h3>All Clients</h3></b>
        </span>
      </vx-input-group>
      <div class="flex items-center">
        <vs-button class="mb-base mr-3" @click="addClient"
          >Add Client</vs-button
        >
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
        <!-- <vs-th sort-key="id">ID</vs-th> -->
        <vs-th sort-key="actions">Actions</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].client_name">{{
            data[indextr].client_name
          }}</vs-td>

          <vs-td :data="data[indextr].description">{{
            data[indextr].description
          }}</vs-td>
          <vs-td>
            <div class="d-flex">
              <vs-button
                color="success"
                type="gradient"
                icon-pack="feather"
                icon="icon-edit"
                icon-after
                @click="editClient(data[indextr])"
                >Edit</vs-button
              >
              <vs-button
                color="danger"
                type="gradient"
                icon-pack="feather"
                icon="icon-trash"
                icon-after
                @click="editClient(data[indextr])"
                >Delete</vs-button
              >
            </div>
          </vs-td>
          <!-- <vs-td :data="data[indextr].id">
                        {{data[indextr].website}}
          </vs-td>-->
        </vs-tr>
      </template>
    </vs-table>
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
      AnotherDate: null
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
    editClient(clientInfo) {
      this.$router.push({
        name: "dashboard-clientdescription",
        params: {
          clientInfo: clientInfo
        }
      });
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
