<template>
  <form>
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
                  name="client_name"
                  @input="setDescrptionFn"
                  :options="clients"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                ></v-select>
              </template>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong id="a">{{ this.setDescrption }}</strong>
              </span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Campaign Name</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vx-input-group>
                <vs-input
                  :danger="hasError"
                  :danger-text="errorText"
                  class="w-full"
                  v-model="campaign_name"
                  name="campaign_name"
                />
              </vx-input-group>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Campaign Type</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
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
            <div class="vx-col sm:w-1/3 w-full">
              <vs-input
                :danger="errorBrand"
                :danger-text="errorTextBrand"
                type="text"
                name="brand_name"
                class="w-full"
                v-model="brand_name"
              />
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
            <vs-button
              type="border"
              text-color="#28C76F"
              @click="updateSearchKeywords"
            >Update Keyword</vs-button>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Search Method</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <template>
                <v-select
                  :options="search_method"
                  v-model="search"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  @input="selectSearch"
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
              <vx-input-group class="mb-base">
                <vs-input
                  type="text"
                  class="w-full"
                  v-model="searchUrl"
                  :disabled="search=='addressbar'"
                />
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
            <div class="vx-col sm:w-1/3 w-full">
              <v-select
                :options="volume_size"
                label="tag_name"
                class="w-full"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                v-model="volume"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('volume')"
              >{{ errors.first('volume') }}</span>
            </div>
          </div>

          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Start Date</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <flat-pickr
                class="w-full"
                v-model="start_date"
                name="start_date"
                placeholder="Start Date"
                :config="configTodateTimePicker"
              />
              <!-- <datepicker
                :format="format"
                v-model="start_date"
                name="start_date"
                placeholder="Start Date"
                :highlighted="value"
              ></datepicker>-->
            </div>
          </div>

          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>End Date</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <flat-pickr
                class="w-full"
                v-model="end_date"
                placeholder="End Date"
                :config="configTodateTimePicker"
              />
              <!-- <datepicker
                :format="format"
                v-model="end_date"
                name="end_date"
                placeholder="End Date"
              ></datepicker>-->
            </div>
          </div>

          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Initial Status</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
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
            <div class="vx-col sm:w-1/3 w-full">
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
            <div class="vx-col sm:w-1/3 w-full">
              <v-select
                :options="countryList"
                label="countryData"
                v-model="country_code"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                @input="checkCountry"
                :value="country_code"
              />
            </div>
          </div>

          <div class="vx-row mb-6" v-if="isUs">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Location State</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <v-select
                :options="stateList"
                label="stateData"
                v-model="stateName"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('state')"
              >{{ errors.first('state') }}</span>
            </div>
          </div>

          <div class="vx-row mb-6" v-if="isUs">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Location Cities</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <template>
                <div>
                  <vs-textarea v-model="cityName" />
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
  </form>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import vselect from "vue-select";
import Datepicker from "vuejs-datepicker";
import _ from "underscore";
import { countries } from "../assets/utils/country";
import { states } from "../assets/utils/state";

import toHtml from "string-to-html";

export default {
  // watch: {
  //   volume: function(v) {
  //     console.log(v);
  //   },
  //   country_code: function(b) {
  //     console.log(b);
  //   }
  // },
  mounted() {
    this.checkCountry();
    // this.selectSearch();

    this.getCampaignClient();
    //this.addCampaignName();
    this.addVolumeTag();
    console.log(this.countries);
    this.countryList.map(function(a) {
      return (a.countryData = a.country + " - " + a.iso);
    });

    this.stateList.map(function(z) {
      return (z.stateData = z.state + " - " + z.iso);
    });
  },
  data() {
    return {
      client: null,
      isUs: false,
      clients: [],
      type: ["search", "direct"],
      paused: { labelState: "Active", val: false },
      // paused: "Active",
      stay_duration: "",
      volume_size: [],
      campaign_name: "",
      brand_name: "",
      keywords: null,
      keyword_formating: "",
      search: "addressbar",
      campaign_type: "search",
      country_code: { countryData: "United States - US", iso: "US" },
      cityName: "",
      volume: "",
      start_date: null,
      end_date: null,
      format: "MM-dd-yyyy",
      setDescrption: "",
      searchUrl: "",
      countryList: countries,
      stateList: states,
      stateName: "",
      lastkeyword_formating: "",
      updateKeywordFirstTime: false,
      search_method: ["url", "addressbar"],
      InitialStatus: [
        { labelState: "Active", val: false },
        { labelState: "In-Active", val: true }
      ],
      configTodateTimePicker: {
        allowInput: false,
        dateFormat: "m-d-Y",
        minDate: new Date()
      }
    };
  },
  computed: {
    hasError() {
      return this.campaign_name.length < 4 || this.campaign_name.length > 80;
    },
    errorText() {
      if (this.campaign_name.length < 4) {
        return "Campaign Name should be at least 6 characters";
      }
      if (this.campaign_name.length > 80) {
        return "Campaign Name should be at most 80 characters";
      }
      return "";
    },
    errorBrand() {
      return this.brand_name.length < 4 || this.brand_name.length > 80;
    },
    errorTextBrand() {
      if (this.brand_name.length < 4) {
        return "Brand Name should be at least 6 characters";
      }
      if (this.brand_name.length > 80) {
        return "Brand Name should be at most 80 characters";
      }
      return "";
    }
  },
  methods: {
    getCampaignClient() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/clients?limit=100",
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
    checkCountry() {
      console.log(
        "this.countrycode of checkcountry",
        this.country_code,
        this.isUs
      );
      if (
        this.country_code &&
        this.country_code.countryData == "United States - US"
      ) {
        this.isUs = true;
      } else {
        this.isUs = false;
      }
    },
    updateSearchKeywords() {
      console.log(
        "this.keyword_formating",
        this.keyword_formating.length,
        this.keyword_formating.toLowerCase().indexOf("kw")
      );

      if (!_.isEmpty(this.keyword_formating)) {
        var mainDivideString = this.keyword_formating
          .toLowerCase()
          .indexOf("kw");
        if (mainDivideString >= 0) {
          var substringFirstPart = this.keyword_formating.substr(
            0,
            mainDivideString - 1
          );
          var substringSecondPart = this.keyword_formating.substr(
            mainDivideString + 3,
            this.keyword_formating.length
          );

          if (this.updateKeywordFirstTime) {
            var lastmainDivideString = this.lastkeyword_formating
              .toLowerCase()
              .indexOf("kw");
            if (lastmainDivideString >= 0) {
              var lastsubstringFirstPart = this.lastkeyword_formating.substr(
                0,
                lastmainDivideString - 1
              );
              var lastsubstringSecondPart = this.lastkeyword_formating.substr(
                lastmainDivideString + 3,
                this.lastkeyword_formating.length
              );

              if (!_.isEmpty(lastsubstringFirstPart)) {
                this.keywords = this.keywords.replace(
                  new RegExp(lastsubstringFirstPart + " ", "g"),
                  ""
                );
              }

              if (!_.isEmpty(lastsubstringSecondPart)) {
                this.keywords = this.keywords.replace(
                  new RegExp(" " + lastsubstringSecondPart, "g"),
                  ""
                );
              }

              //console.log("substringFirstPart",substringFirstPart,substringSecondPart)
            }
          }

          if (!_.isEmpty(this.keywords)) {
            var keyWords = this.keywords.split("\n");
            var singleLineKeyWords = "";
            keyWords.map((data, index) => {
              singleLineKeyWords =
                index == 0
                  ? substringFirstPart +
                    (_.isEmpty(substringFirstPart) ? "" : " ") +
                    data +
                    " " +
                    substringSecondPart
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
          this.updateKeywordFirstTime = true;
          this.lastkeyword_formating = this.keyword_formating;
        } else {
          // var formatData = this.keyword_formating.toLowerCase().indexOf("kw");
          // if (!_.isEmpty(this.keywords)) {
          //   var keyWords = this.keywords.split("\n");
          //   var singleLineKeyWords = "";
          //   keyWords.map((data, index) => {
          //     singleLineKeyWords =
          //       index == 0
          //         ? data + formatData[1]
          //         : singleLineKeyWords + "\n" + data + formatData[1];
          //   });
          //   this.keywords = singleLineKeyWords;
          // }
        }
      }
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    selectSearch() {
      if (this.search == "addressbar") {
        //this.searchUrl = document.location.href;
      } else {
        //this.searchUrl = "";
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
      console.log("==>", this.start_date);
      console.log("text", this.formatDate(this.start_date));
      console.log("FirstText", this.formatDate(this.end_date));
      let startingDate = this_pointer.formatDate(this_pointer.start_date);
      let endingDate = this_pointer.formatDate(this_pointer.end_date);
      this_pointer.cityName = this_pointer.cityName.includes(",")
        ? this_pointer.cityName.split(",")
        : [this_pointer.cityName];
      console.log("url", this_pointer.url);
      console.log("countryCode", this_pointer.country_code.iso);

      axios({
        method: "post",
        url: "https://adminapi.varuntandon.com/v1/campaigns",
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
          start_date: !_.isEmpty(startingDate) ? startingDate : undefined,
          end_date: !_.isEmpty(endingDate) ? endingDate : undefined,
          country: this_pointer.country_code.iso,
          search_method: this.search,
          type: this.campaign_type,
          url: this_pointer.searchUrl
            ? this_pointer.searchUrl
            : undefined,
          volume_size: this.volume.tag_name,
          state: this.stateName.state,
          city: this.cityName,
          keywords: keyWords && keyWords.length ? keyWords : undefined,
          keyword_formating: this.keyword_formating,
          paused: this_pointer.paused.val,
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
            this_pointer.country_code = "";
            this_pointer.searchUrl = null;
            this_pointer.stateName = null;
            this_pointer.cityName = null;
            this_pointer.city_targeting_method = null;
            this_pointer.volume = null;
            this_pointer.keywords = null;
            this_pointer.keyword_formating = null;
            this_pointer.setDescrption = null;
            this_pointer.search = "addressbar";
            this_pointer.$router.push("/dashboard/allcampaign");
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
      //var a="anand soni<br/>ttt↵www.google.com"
      //a= a.replace("/\n/g","\n");
      document.getElementById("a").innerHTML = event.description.replace(
        /(\r\n|\n|\r)/gm,
        "<br />"
      );
      //this.setDescrption = htmlToText(event.description);
    },
    addVolumeTag() {
      var this_pointer = this;

      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/tvt",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          this_pointer.volume_size = response.data.tags;

          console.log("volumeTag", this_pointer.volume_size);
          // this_pointer.volume_size.map(function(x) {
          //   return (x.items = x.min_hit + " - " + x.max_hit);
          // });
          // console.log("itemData", items);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    "v-select": vselect,
    flatPickr
  }
};
</script>

<style scoped>
h4 {
  margin-left: 500px;
}
</style>
