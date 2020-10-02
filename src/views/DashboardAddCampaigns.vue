<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT WITH ICON-->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <span>
              <b>
                <h3>Add New Campaign</h3>
              </b>
            </span>
          </vx-input-group>
          <div class="flex items-center">
            <vs-button
              class="justify-end mb-base mr-3"
              type="filled"
              :to="{ path: '/dashboard/allcampaign' }"
            >Back to Campaigns</vs-button>
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
              <v-select :options="type" v-model="campaign_type" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
            <vs-textarea v-model="keywords" height="100px" />

            <!-- <vs-input
              type="text"
              class="w-full"
              v-model="keywords"
              placeholder="Search.."
            />-->
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
          <vs-button type="border" text-color="#28C76F" @click="updateSearchKeywords">Update Keyword</vs-button>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Search Method</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <v-select :options="search_method" v-model="search" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
              <vs-input type="text" class="w-full" v-model="url" />

              <template slot="append">
                <div class="append-text btn-addon">
                  <vs-button color="primary">Search</vs-button>
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
            <vs-select class="w-full select-large" label="Traffic Volume" v-model="volume">
              <vs-select-item
                :key="index"
                :value="item.tag_name"
                :text="`${item.min_hit}-${item.max_hit}`"
                v-for="(item, index) in volume_size"
                class="w-full"
              />
            </vs-select>
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
              <v-select
                label="labelState"
                v-model="paused"
                :options="InitialStatus"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </template>
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Length of Time Range to spend in seconds.</strong>
              <span>(Format: 70,120)</span>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <template>
              <vs-input type="text" class="w-full" v-model="stay_duration" />
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
            <!-- <vs-select class="w-full select-large" label="Traffic Volume" v-model="volume">
              <vs-select-item
                :key="index"
                :value="item.tag_name"
                :text="`${item.min_hit}-${item.max_hit}`"
                v-for="(item,index) in volume_size"
                class="w-full"
              />
            </vs-select>-->
            <vs-select class="w-full select-large" label="Country" v-model="country_code">
              <vs-select-item value text="Select Country" disabled></vs-select-item>
              <vs-select-item
                :key="index"
                :value="item.iso"
                :text="`${item.country}-${item.iso}`"
                v-for="(item, index) in countryList"
                class="w-full"
              />
            </vs-select>
          </div>
        </div>

        <div class="vx-row mb-6" v-if="country_code == 'US'">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Location State</strong>
            </span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-select class="w-full select-large" label="States" v-model="stateName">
              <vs-select-item
                :key="index"
                :value="item.state"
                :text="`${item.state}-${item.iso}`"
                v-for="(item, index) in stateList"
                class="w-full"
              />
            </vs-select>
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
            <vs-button class="mr-3 mb-2" color="success" @click="addCampaignList">Submit</vs-button>
            <vs-button color="warning" type="border" class="mb-2">Cancel</vs-button>
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
import _ from "underscore";
import "flatpickr/dist/flatpickr.css";
import { countries } from "../assets/utils/country";
import { states } from "../assets/utils/state";
export default {
  data() {
    return {
      client: null,
      clients: [],
      type: ["search", "direct"],
      paused: { labelState: "Active", val: false },
      paused: "Active",
      stay_duration: "",
      volume_size: [],
      campaign_name: " ",
      brand_name: " ",
      keywords: null,
      keyword_formating: "",
      search: "addressbar",
      campaign_type: "search",
      country_code: "US",
      city: "",
      volume: "",
      start_date: null,
      end_date: null,
      setDescrption: "",
      url: "",
      countryList: countries,
      stateList: states,
      stateName: "",
      search_method: ["url", "addressbar"],
      InitialStatus: [
        { labelState: "Active", val: false },
        { labelState: "In-Active", val: true }
      ],
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
    updateSearchKeywords() {
      console.log(
        "this.keyword_formating",
        this.keyword_formating.length,
        this.keyword_formating.indexOf("KW")
      );

      if (!_.isEmpty(this.keyword_formating)) {
        var mainDivideString = this.keyword_formating.indexOf("KW");
        if (mainDivideString >= 1) {
          var substringFirstPart = this.keyword_formating.substr(
            0,
            mainDivideString - 1
          );
          var substringSecondPart = this.keyword_formating.substr(
            mainDivideString + 3,
            this.keyword_formating.length
          );

          if (!_.isEmpty(this.keywords)) {
            var keyWords = this.keywords.split("\n");
            var singleLineKeyWords = "";
            keyWords.map((data, index) => {
              singleLineKeyWords =
                index == 0
                  ? substringFirstPart + " " + data + " " + substringSecondPart
                  : singleLineKeyWords +
                    "\n" +
                    substringFirstPart +
                    " " +
                    data +
                    " " +
                    substringSecondPart;
            });
            this.keywords = singleLineKeyWords;
          }
        } else {
          var formatData = this.keyword_formating.split("KW");

          if (!_.isEmpty(this.keywords)) {
            var keyWords = this.keywords.split("\n");
            var singleLineKeyWords = "";
            keyWords.map((data, index) => {
              singleLineKeyWords =
                index == 0
                  ? data + formatData[1]
                  : singleLineKeyWords + "\n" + data + formatData[1];
            });
            this.keywords = singleLineKeyWords;
          }
        }
      }
    },
    addCampaignList() {
      var keyWords = [];
      if (!_.isEmpty(this.keywords)) {
        keyWords = this.keywords.split("\n");
        keyWords.map((data, index) => {
          keyWords[index] = data.toLowerCase();
        });
      }

      var this_pointer = this;
      axios({
        method: "post",
        url: "http://adminapi.varuntandon.com/v1/campaigns",
        data: {
          client:
            this.client && this.client.client_name && this.client.client_name
              ? this.client.client_name
              : undefined,
          campaign_name: _.isEmpty(this.campaign_name)
            ? undefined
            : this.campaign_name,
          brand_name: _.isEmpty(this.brand_name) ? undefined : this.brand_name,
          stay_duration: _.isEmpty(this.stay_duration)
            ? undefined
            : this.stay_duration,
          start_date: !_.isEmpty(this.start_date) ? this.start_date : undefined,
          end_date: !_.isEmpty(this.end_date) ? this.end_date : undefined,
          country: this.country_code,
          search_method: this.search,
          type: this.campaign_type,
          url: this.url,
          volume_size: this.volume,
          state: this.stateName,
          city: ["houston", "brooklyn"],
          keywords: keyWords && keyWords.length ? keyWords : undefined,
          paused: this.paused.val,
          city_targeting_method: "priority"
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
            this_pointer.client = null;
            this_pointer.campaign_type = "search";
            this_pointer.paused.val = false;
            this_pointer.campaign_name = null;
            this_pointer.brand_name = null;
            this_pointer.stay_duration = null;
            this_pointer.start_date = null;
            this_pointer.end_date = null;
            this_pointer.country_code = null;
            this_pointer.url = null;
            this_pointer.stateName = null;
            this_pointer.city = null;
            this_pointer.paused = null;
            this_pointer.city_targeting_method = null;
            this_pointer.volume = null;
            this_pointer.keywords = null;
            this_pointer.keyword_formating = null;
            this_pointer.setDescrption = null;
          }
        })
        .catch(function(error, response) {
          var errorResponse = Object.assign({}, error);
          if (
            errorResponse.response.data.detail[0] &&
            errorResponse.response.data.detail[0].loc &&
            errorResponse.response.data.detail[0].loc.length
          ) {
            this_pointer.$vs.notify({
              title:
                errorResponse.response.data.detail[0].loc[2] +
                " " +
                errorResponse.response.data.detail[0].msg,
              color: "danger",
              position: "top-right"
            });
          } else {
            this_pointer.$vs.notify({
              title: errorResponse.response.data.detail[0],
              color: "danger",
              position: "top-right"
            });
          }
        });
    },
    setDescrptionFn(event) {
      console.log("cliemts", this.client, event);
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
    console.log(this.countries);
  }
};
</script>

<style scoped>
h4 {
  margin-left: 500px;
}
</style>
