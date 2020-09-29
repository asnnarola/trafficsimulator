<template>
  <div>
    <vs-table :data="trafficVolumeTags">
      <template slot="header">
        <h3>Traffic Volume Size</h3>
      </template>
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Min</vs-th>
        <vs-th>Max</vs-th>
        <vs-th v-if="isAdmin">Update Text</vs-th>
        <vs-th v-if="isAdmin">Remove</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" id="range-row">
          <vs-td :data="data[indextr].tag_name">
            <span v-if="!(edit === indextr)">{{ data[indextr].tag_name }}</span>
            <vs-input
              v-if="(edit === indextr)"
              class="inputx"
              placeholder="Name"
              v-model="tag_name"
            />
          </vs-td>
          <vs-td :data="data[indextr].min_hit">
            <span v-if="!(edit === indextr)">{{ data[indextr].min_hit }}</span>
            <vs-input v-if="(edit === indextr)" class="inputx" placeholder="Min" v-model="min_hit" />
          </vs-td>
          <vs-td :data="data[indextr].max_hit">
            <span v-if="!(edit === indextr)">{{ data[indextr].max_hit }}</span>
            <vs-input v-if="(edit === indextr)" class="inputx" placeholder="Max" v-model="max_hit" />
          </vs-td>
          <vs-td :data="data[indextr].id" v-if="isAdmin">
            <vs-button
              @click="newtvt && (edit === indextr) ? addNewTrafficVolumeTag() : (edit === indextr) ? updateTag(data[indextr].id) : setData(data[indextr], indextr)"
              color="primary"
              type="filled"
            >{{ newtvt && (edit === indextr) ? 'Add New' : (edit === indextr) ? 'Update text' : 'Edit' }}</vs-button>
          </vs-td>
          <vs-td :data="data[indextr].id" v-if="isAdmin">
            <vs-button
              @click="removeTrafficVolumeTag(data[indextr].id)"
              color="danger"
              type="filled"
              :hidden="newtvt && (edit === indextr)"
            >Remove</vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-button
      v-if="isAdmin"
      @click="addNewTrafficRow"
      class="mb-base mt-4"
      type="filled"
      :disabled="edit"
    >ADD: New Google Search Traffic Ranges</vs-button>
    <vs-divider></vs-divider>&nbsp;
    <h3>Proxy Providers</h3>
    <!-- PROXY TABLE !-->
    <vs-table class="mt-4" :data="proxyList">
      <template slot="thead">
        <vs-th>Provider Name</vs-th>
        <vs-th>User</vs-th>
        <vs-th>Password</vs-th>
        <vs-th>Active ?</vs-th>
        <vs-th v-if="isAdmin">Update Provier</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" id="update-name">
          <vs-td :data="data[indextr].provider">
            <span>{{ data[indextr].provider }}</span>
          </vs-td>

          <vs-td :data="data[indextr].username">
            <span v-if="!(editProxy === indextr)">{{ data[indextr].username }}</span>
            <vs-input
              v-if="(editProxy === indextr)"
              class="is-label-placeholder"
              icon-pack="feather"
              icon="icon-user"
              placeholder="User"
              v-model="username"
            />
            <!-- <vs-input icon-pack="feather" icon="icon-user" class="is-label-placeholder" /> -->
          </vs-td>

          <vs-td :data="data[indextr].password">
            <span v-if="!(editProxy === indextr)">{{ data[indextr].password }}</span>
            <vs-input
              v-if="(editProxy === indextr)"
              class="is-label-placeholder"
              icon-pack="feather"
              icon="icon-user"
              placeholder="Password"
              v-model="password"
            ></vs-input>
            <!-- <vs-input icon-pack="feather" icon="icon-lock" class="is-label-placeholder" /> -->
          </vs-td>

          <vs-td :data="data[indextr].active">
            <vs-checkbox v-model="active" :checked="data[indextr].active"></vs-checkbox>
          </vs-td>

          <vs-td v-if="isAdmin" :data="data[indextr].id">
            <vs-button
              @click="(editProxy === indextr) ? updateProxyList(data[indextr].id):setUpdateData(data[indextr],indextr)"
              color="primary"
              type="filled"
            >{{(editProxy === indextr) ? 'Update ' : 'Edit'}}</vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-divider></vs-divider>&nbsp;
    <h3>Spike Up/ Down-Config Variables</h3>&nbsp;
    <!-- CONFIG TABLE !-->
    <template>
      <vx-card>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Spike_Percent_Chance</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{ tpc_spike_chance }}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_spike_chance" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Downturn_Percent_Chance</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{tpc_downturn_chance}}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_downturn_chance" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Spike_for_days</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{tpc_spike_days}}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_spike_days" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Downturn_for_days</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{tpc_downturn_days}}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_downturn_days" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Spike_to_how_many_Levels_Up</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{tpc_spike_levels}}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_spike_levels" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Spike_to_how_many_Levels_Down</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span v-if="!editSpike">{{tpc_downturn_levels}}</span>
            <vs-input v-if="editSpike" class="w-full" type="number" v-model="tpc_downturn_levels" />
          </div>
        </div>

        <vs-button
          v-if="isAdmin"
          @click="editSpike ? updateSpikeList() : editSpikeList()"
          class="mb-base mt-4"
          type="filled"
        >{{ editSpike ? 'Update' : 'Edit' }} Spike Up/ Down Config</vs-button>
      </vx-card>
    </template>
  </div>
</template>

<script>
import vSelect from "vue-select";
import axios from "axios";
export default {
  data() {
    return {
      tpc_spike_chance: "",
      tpc_downturn_chance: "",
      tpc_spike_days: "",
      tpc_downturn_days: "",
      tpc_spike_levels: "",
      tpc_downturn_levels: "",
      editSpike: false,
      spikeList: [],
      trafficVolumeTags: [],
      proxyList: [],
      newSpikeList: {},
      tag_name: null,
      min_hit: null,
      max_hit: null,
      edit: null,
      editProxy: null,
      newtvt: false,
      checkbox2: false,
      username: null,
      password: null,
      provider: null,
      input1: null,
      input2: null,
      spike_days: null,
      downturn_days: null,
      level: null,
      active: null
    };
  },
  components: {
    "v-select": vSelect
  },
  computed: {
    isAdmin() {
      return this.$store.state.userRole === "admin";
    }
  },
  mounted() {
    this.getTrafficVolumeTags();
    this.getProxyList();
    this.getSpikeList();
  },
  methods: {
    editSpikeList() {
      this.editSpike = true;
    },
    getTrafficVolumeTags() {
      this.$http
        .get("http://adminapi.varuntandon.com/v1/tvt")
        .then(response => {
          this.trafficVolumeTags = response.data.tags;
          console.log(response);
        })
        .catch(error => console.log(error));
    },
    updateTag(tag_id) {
      this.$http
        .put(`http://adminapi.varuntandon.com/v1/tvt/${tag_id}`, {
          tag_name: this.tag_name,
          min_hit: this.min_hit,
          max_hit: this.max_hit
        })
        .then(response => {
          if (response.data.success) {
            var newTag = {
              id: tag_id,
              tag_name: this.tag_name,
              min_hit: this.min_hit,
              max_hit: this.max_hit
            };
            this.trafficVolumeTags = this.trafficVolumeTags.map(tag =>
              tag.id === tag_id ? (tag = newTag) : tag
            );
            this.tag_name = null;
            this.min_hit = null;
            this.max_hit = null;
            this.edit = -1;
          }
        })
        .catch(error => console.log(error));
    },
    setData(data, index) {
      // this.provider = provider;
      this.tag_name = data.tag_name;
      this.min_hit = data.min_hit;
      this.max_hit = data.max_hit;
      this.edit = index;
    },
    addNewTrafficRow() {
      this.trafficVolumeTags.push({
        tag_name: "",
        min_hit: null,
        max_hit: null
      });
      this.edit = this.trafficVolumeTags.length - 1;
      this.newtvt = true;
    },
    addNewTrafficVolumeTag() {
      const newTag = {
        tag_name: this.tag_name,
        min_hit: this.min_hit,
        max_hit: this.max_hit
      };
      this.$http
        .post("http://adminapi.varuntandon.com/v1/tvt", newTag)
        .then(response => {
          if (response.data.success) {
            console.log("tvt added!");
            this.getTrafficVolumeTags();
            this.tag_name = null;
            this.min_hit = null;
            this.max_hit = null;
            this.edit = -1;
            this.newtvt = false;
          } else {
            console.log("tvt already exist!");
          }
          console.log("tvt response", response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeTrafficVolumeTag(tag_id) {
      this.$http
        .delete(`http://adminapi.varuntandon.com/v1/tvt/${tag_id}`)
        .then(response => {
          if (response.data.success) {
            const index = this.trafficVolumeTags.findIndex(
              tag => tag.id === tag_id
            );
            this.trafficVolumeTags.splice(index, 1);
            console.log("Removed Successfully");
          }
        });
    },
    getProxyList() {
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/proxy",
        headers: { "content-type": "application/json" }
      })
        .then(response => {
          console.log("firstResponse", response);
          this.proxyList = response.data.accounts;
          console.log("response", this.proxyList, response.data.accounts);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateProxyList(account_id) {
      axios
        .put(`http://adminapi.varuntandon.com/v1/proxy/${account_id}`, {
          provider: this.provider,
          username: this.username,
          password: this.password,
          active: this.active
        })
        .then(function(response) {
          if (response.data.success) {
            var newProxy = {
              //id: account_id,
              provider: this.provider,
              username: this.username,
              password: this.password,
              active: this.active
            };

            this.proxyList = this.proxyList.map(acc =>
              acc.id === account_id ? (acc = newProxy) : acc
            );
            this.provider = null;
            this.username = null;
            this.password = null;
            this.edit = -1;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setUpdateData(data, index) {
      this.provider = data.provider;
      this.username = data.username;
      this.password = data.password;
      this.active = data.active;
      this.editProxy = index;
    },
    getSpikeList() {
      var this_pointer = this;
      this.$http
        .get("http://adminapi.varuntandon.com/v1/config/tpc")
        .then(response => {
          this_pointer.spikeList = response.data;

          this_pointer.tpc_spike_chance = response.data.tpc_spike_chance;

          this_pointer.tpc_downturn_chance = response.data.tpc_downturn_chance;

          this_pointer.tpc_spike_days = response.data.tpc_spike_days;

          this_pointer.tpc_downturn_days = response.data.tpc_downturn_days;

          this_pointer.tpc_spike_levels = response.data.tpc_spike_levels;

          this_pointer.tpc_downturn_levels = response.data.tpc_downturn_levels;

          console.log("response generated", this_pointer.spikeList);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateSpikeList() {
      var this_pointer = this;
      axios
        .put("http://adminapi.varuntandon.com/v1/config/tpc", {
          tpc_spike_chance: parseInt(this_pointer.tpc_spike_chance),

          tpc_downturn_chance: parseInt(this_pointer.tpc_downturn_chance),

          tpc_spike_days: parseInt(this_pointer.tpc_spike_days),

          tpc_downturn_days: parseInt(this_pointer.tpc_downturn_days),

          tpc_spike_levels: parseInt(this_pointer.tpc_spike_levels),

          tpc_downturn_levels: parseInt(this_pointer.tpc_downturn_levels)
        })
        .then(response => {
          if (response.data.success) {
            this_pointer.newSpikeList = response.data;

            this_pointer.tpc_spike_chance =
              response.data.newSpikeList.tpc_spike_chance;

            this_pointer.tpc_downturn_chance =
              response.data.newSpikeList.tpc_downturn_chance;

            this_pointer.tpc_spike_days =
              response.data.newSpikeList.tpc_spike_days;

            this_pointer.tpc_downturn_days =
              response.data.newSpikeList.tpc_downturn_days;

            this_pointer.tpc_spike_levels =
              response.data.newSpikeList.tpc_spike_levels;

            this_pointer.tpc_downturn_levels =
              response.data.newSpikeList.tpc_downturn_levels;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.vs-con-input {
  width: min-content !important;
  padding: 0 !important;
  margin: 0 !important;
}
.vs-con-input-label.vs-input.inputx {
  width: min-content !important;
  padding: 0 !important;
  margin: 0 !important;
}
.inputx {
  min-width: 70% !important;
  padding: 0 !important;
  /* width: min-content !important; */
}
</style>