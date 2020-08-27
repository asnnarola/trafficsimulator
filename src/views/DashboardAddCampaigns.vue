<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT WITH ICON-->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <span>
              <b><h3>Add New Campaign</h3></b>
            </span>
          </vx-input-group>
          <div class="flex items-center">
            <vs-button
              class="justify-end mb-base mr-3"
              type="filled"
              :to="{ path: '/dashboard/allcampaign' }"
              >Back to Campaigns</vs-button
            >
          </div>
        </div>
        <vs-divider></vs-divider>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Client</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <template>
              <v-select
                v-model="client"
                label="client_name"
                @input="setDescrptionFn"
                :options="clients"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              ></v-select>
            </template>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>{{ this.setDescrption }}</strong>
            </span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Campaign Name</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input type="text" class="w-full" v-model="campaign_name" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Campaign Type</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select
                :options="type"
                v-model="campaign_type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Brand Name</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input type="text" class="w-full" v-model="brand_name" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Search Keywords</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">

              <vs-textarea v-model="keywords"
              height="100px"
               />

            <!-- <vs-input
              type="text"
              class="w-full"
              v-model="keywords"
              placeholder="Search.."
            /> -->
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Keyword Formatting</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <vs-input type="text" class="w-full" v-model="keyword_formating" />
          </div>
          <vs-button type="border" text-color="#28C76F"
            >Update Keyword</vs-button
          >
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Search Method</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select
                :options="search_method"
                v-model="search"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Search URL</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <!-- <vs-input type="text" class="w-full"  v-model="input8" /> -->
            <vx-input-group class="mb-base">
              <vs-input />

              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button color="primary" :to="{ path: '/dashboard/client' }"
                    >Search</vs-button
                  >
                </div>
              </template>
            </vx-input-group>
          </div>
          <!-- <vs-button color="warning" type="filled" :to="{ path: '/dashboard/campaign' }">Object Path</vs-button> -->
        </div>
        <vs-divider></vs-divider>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Traffic Volume- Visitors per day</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select
                label="tag_name"
                :value="tag_name"
                v-model="volume"
                :options="volume_size"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Start Date</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <flat-pickr
              class="w-full"
              :config="configFromdateTimePicker"
              v-model="start_date"
              placeholder="Start Date"
              @on-change="onFromChange"
            />
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>End Date</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/2 w-full">
            <flat-pickr
              class="w-full"
              :config="configTodateTimePicker"
              v-model="end_date"
              placeholder="End Date"
              @on-change="onToChange"
            />
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Initial Status</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select :options="paused" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            </template>
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Lenght of Time Range to spend in seconds.</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select
                :options="stay_duration"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Location Country</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template></template>
            <v-select
              label="countryName"
              :options="country"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Location State</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select
                label="stateName"
                :options="state"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Location Cities</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <div>
                <vs-textarea v-model="city" />
              </div>
            </template>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              class="mr-3 mb-2"
              color="success"
              @click="addCampaignList"
              >Submit</vs-button
            >
            <vs-button color="warning" type="border" class="mb-2"
              >Cancel</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vselect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  data() {
    return {
      client: null,
      clients: [],
      type: ["search", "direct"],
      paused: [],
      stay_duration: [],
      country: [],
      state: [],
      volume_size: [],
      campaign_name: " ",
      brand_name: " ",
      keywords: null,
      keyword_formating: "",
      search: "addressbar",
      campaign_type: "search",
      city: "",
      volume: "",
      start_date: " ",
      end_date: " ",
      setDescrption: "",
      search_method: ["url", "addressbar"],
      configFromdateTimePicker: {
        minDate: new Date(),
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: null
      }
    };
  },
  methods: {
    onFromChange(selectedDates, dateStr, instance) {
      this.$set(this.configTodateTimePicker, "minDate", dateStr);
    },
    onToChange(selectedDates, dateStr, instance) {
      this.$set(this.configFromdateTimePicker, "maxDate", dateStr);
    },
    getCampaignClient() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/clients?limit=100",
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          this_pointer.clients = response.data.clients;
          // response.data.clients.forEach(record => {
          //   this_pointer.clients.push(record.client_name);
          // });
          console.log(this_pointer.clients);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addCampaignList() {
      var this_pointer = this;
      axios({
        method: "post",
        url: "http://adminapi.varuntandon.com/v1/campaigns",
        data: {
          client: this.client.client_name,
          campaign_name: this.campaign_name,
          brand_name: this.brand_name,
          stay_duration: "3,15",
          start_date: this.start_date,
          end_date: this.end_date,
          country: "us",
          search_method: this.search,
          type: this.campaign_type,
          url: "http://www.bet365.com",
          volume_size: this.volume.tag_name
        },
        headers: {
          "content-type": "application/json"
        }
      })
        .then(function(response) {
          console.log("response", response);
          if (response.data.success) {
            this_pointer.$vs.notify({
              title: "Campaign Added",
              color: "success",
              position: "top-right"
            });
            this_pointer.campaign_name = null;
            //(this_pointer.description = null);
          } else {
            this_pointer.$vs.notify({
              title: "Campaign Already Exist",
              color: "danger",
              position: "top-right"
            });
          }
        })
        .catch(function(error) {
          // this_pointer.$vs.notify({
          //   title: "Campaign Already Exist",
          //   color: "danger",
          //   position: "top-right"
          // });
        });
    },
    setDescrptionFn(event) {
      console.log("cliemts",this.client,event)
      this.setDescrption = event.description;
    },
    addVolumeTag() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/tvt",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          this_pointer.volume_size = response.data.tags;
          // response.data.tags.forEach(record => {
          //   this_pointer.tags.push(record.tag_name);
          // });
          console.log(this_pointer.volume_size);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    "v-select": vselect,
    flatPickr
  },
  mounted() {
    this.getCampaignClient();
    //this.addCampaignName();
    this.addVolumeTag();
  }
};
</script>

<style scoped>
h4 {
  margin-left: 500px;
}
</style>
