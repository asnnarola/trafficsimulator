<template>
  <div class="vx-row">
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <span>
              <b>
                <h3>View Campaigns</h3>
              </b>
            </span>
          </vx-input-group>
          <div class="flex items-center" v-if="isAdmin">
            <vs-button
              class="mb-base mr-3"
              :to="{ path: '/dashboard/addcampaigns' }"
            >Add a new Campaign</vs-button>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Client Name</label>
            <v-select
              v-model="client"
              label="client_name"
              @input="getCampaignList"
              class="w-full"
              label-placeholder="client_name"
              :options="clients"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Campaign Type</label>
            <v-select
              class="w-full"
              v-model="campaign_type"
              @input="getCampaignList"
              label-placeholder="campaign_type"
              :options="type"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Start Date</label>

            <datepicker
              placeholder="Start Date"
              :format="format"
              v-model="startDate"
              @input="getCampaignList"
            ></datepicker>

            <!-- @click="getCampaignList"/> -->
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>End Date</label>
            <datepicker
              placeholder="End Date"
              :format="format"
              @input="getCampaignList"
              v-model="endDate"
            ></datepicker>
            <!-- <label class="text-danger">{{errorMsg}}</label> -->
          </div>
        </div>
      </vx-card>
    </div>
    <!------------------------------------------------TABLE LAYOUT-ACTIVE--------------------------------------------!-->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="activeCampaignList"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                <span class="ml-2 text-base text-primary">
                  <strong>
                    Active Campaigns-
                    <span class="ml-2 text-base text-warning">
                      {{
                      this.client.client_name
                      }}
                    </span>
                  </strong>
                </span>
              </div>

              <!-- ITEMS PER PAGE -->
            </div>

            <template slot="thead">
              <vs-th sort-key="start_date">Start Date</vs-th>
              <vs-th sort-key="end_date">End Date</vs-th>
              <vs-th sort-key="brand_name">Brand Name</vs-th>
              <vs-th sort-key="campaign_name">Campaign Name</vs-th>
              <vs-th sort-key="keyword_formating">Keyword Format</vs-th>
              <vs-th sort-key="type">Type</vs-th>
              <vs-th sort-key="search_method">Search Method</vs-th>
              <vs-th sort-key="url">URL</vs-th>
              <vs-th sort-key="volume_size">Visits Per Day</vs-th>
              <vs-th sort-key="stay_duration">Time spend</vs-th>
              <vs-th sort-key="country">Country</vs-th>
              <vs-th sort-key="state">State</vs-th>
              <vs-th sort-key="city">City</vs-th>
              <vs-th v-if="isAdmin">Action</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="start-date font-medium truncate">{{ tr.start_date }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="end-date font-medium truncate">{{ tr.end_date }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="brand_name">{{ tr.brand_name }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="campaign_name">{{ tr.campaign_name }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="keyword_formating">{{ tr.keyword_formating }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="type">{{ tr.type }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="search_method">{{ tr.search_method }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="url">{{ tr.url }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="volume_size font-medium truncate">{{tr.volume_size}}</p>
                  </vs-td>

                  <vs-td>
                    <p class="stay_duration">{{ tr.stay_duration }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="country">{{ tr.country }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="state">{{ tr.state }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="city">{{ tr.city.join() }}</p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap" v-if="isAdmin">
                    <feather-icon
                      icon="EditIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="getClientInfo(tr.id)"
                      @click.stop="popupActive2 = true"
                    />
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click="campaignActionsFn(tr.id)"
                    />
                    <feather-icon
                      icon="FileIcon"
                      class="ml-2"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="getMainList(tr.id)"
                      @click.stop="popupActive4 = true"
                    />
                    <feather-icon
                      icon="PauseIcon"
                      class="ml-2"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="pauseResumeCampaign(tr.id,'pause')"
                    />
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>

    <!------------------------------------------------TABLE LAYOUT-INACTIVE------------------------------------------------!-->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            v-model="selected"
            pagination
            :max-items="itemsPerPage"
            search
            :data="inActiveCampaignList"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                <span class="ml-2 text-base text-danger">
                  <strong>
                    In-active Campaigns-
                    <span class="ml-2 text-base text-warning">
                      {{
                      this.client.client_name
                      }}
                    </span>
                  </strong>
                </span>
              </div>
            </div>

            <template slot="thead">
              <vs-th sort-key="start_date">Start Date</vs-th>
              <vs-th sort-key="end_date">End Date</vs-th>
              <vs-th sort-key="brand_name">Brand Name</vs-th>
              <vs-th sort-key="campaign_name">Campaign Name</vs-th>
              <vs-th sort-key="keyword_formating">Keyword Format</vs-th>
              <vs-th sort-key="type">Type</vs-th>
              <vs-th sort-key="search_method">Search Method</vs-th>
              <vs-th sort-key="url">URL</vs-th>
              <vs-th sort-key="volume_size">Visits Per Day</vs-th>
              <vs-th sort-key="stay_duration">Time spend</vs-th>
              <vs-th sort-key="country">Country</vs-th>
              <vs-th sort-key="state">State</vs-th>
              <vs-th sort-key="city">City</vs-th>
              <vs-th v-if="isAdmin">Action</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="start-date font-medium truncate">{{ tr.start_date }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="end-date font-medium truncate">{{ tr.end_date }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="brand_name">{{ tr.brand_name }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="campaign_name">{{ tr.campaign_name }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="keyword_formating">{{ tr.keyword_formating }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="type">{{ tr.type }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="search_method">{{ tr.search_method }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="url">{{ tr.url }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="volume_size font-medium truncate">{{tr.volume_size}}</p>
                  </vs-td>

                  <vs-td>
                    <p class="stay_duration">{{ tr.stay_duration }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="country">{{ tr.country }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="state">{{ tr.state }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="city">{{ tr.city.join() }}</p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap" v-if="isAdmin">
                    <feather-icon
                      icon="EditIcon"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="getClientInfo(tr.id)"
                      @click.stop="popupActive2 = true"
                    />
                    <feather-icon
                      icon="TrashIcon"
                      svgClasses="w-5 h-5 hover:text-danger stroke-current"
                      class="ml-2"
                      @click.stop="campaignActionsFn(tr.id)"
                    />
                    <feather-icon
                      icon="FileIcon"
                      class="ml-2"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="getMainList(tr.id)"
                      @click.stop="popupActive4 = true"
                    />
                    <feather-icon
                      icon="PlayIcon"
                      class="ml-2"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      @click="pauseResumeCampaign(tr.id,'resume')"
                    />
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
    <!-- POPUP for Update Functionality !-->
    <vs-popup title="Edit Campaign" :active.sync="popupActive2">
      <label>Client Name</label>
      <v-select
        v-model="editCampaign.client"
        label="client_name"
        :options="clients"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      ></v-select>

      <label>Brand Name</label>
      <vs-input type="text" class="w-full" v-model="editCampaign.brand_name" />

      <label>End Date</label>
      <flat-pickr class="w-full" placeholder="End Date" v-model="editCampaign.end_date" />

      <label>Volume Size/Daily Site Visits</label>
      <v-select
        label="tag_name"
        v-model="editCampaign.volume_size"
        :options="volume_size"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />

      <label>Stay Duration in seconds(from,to)</label>
      <vs-input type="text" v-model="editCampaign.stay_duration" class="w-full" />

      <vs-button class="justify-bottom primary mt-4" @click="updateCampaignFn" type="border">Update</vs-button>
    </vs-popup>

    <!--POPUP for VIEW STATS Functionality !-->
    <vs-popup title="View Stats" :active.sync="popupActive4" class>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Client:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>{{editCampaign.client}}</span>
          <vs-input
            type="text"
            hidden
            class="w-full"
            :value="editCampaign.client"
            :options="clients"
          ></vs-input>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Campaign Name:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>{{editCampaign.campaign_name}}</span>
          <vs-input type="text" class="w-full" hidden :value="editCampaign.campaign_name"></vs-input>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Brand Name:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>{{editCampaign.brand_name}}</span>
          <vs-input type="text" hidden class="w-full" :value="editCampaign.brand_name"></vs-input>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Keyword List</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <!-- <vs-select class="w-full select-large" @change="getKeywordStats" v-model="keywordId">
            <vs-select-item
              :key="index"
              :value="item.id"
              :text="item.keyword"
              v-for="(item,index) in keywordList"
              class="w-full"
            />
          </vs-select>-->
          <v-select
            class="w-full select-large"
            @change="getKeywordStats"
            v-model="keywordId"
            label="keyword"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :options="keywordList"
          />
        </div>
      </div>&nbsp; &nbsp; &nbsp;
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Actual Lifetime Visits:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>{{this.lifetime_visits}}</strong>
          </span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Actual Visits in last 30 days:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>{{this.visitsfor30Days}}</strong>
          </span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Actual Visits in last 60 days:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>{{this.visitsfor60Days}}</strong>
          </span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Actual Visits in last 180 days:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>{{this.visitsfor180Days}}</strong>
          </span>
        </div>
      </div>

      <vs-divider></vs-divider>

      <!--STATS TABLE !-->
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>Stats for last 365 days:</strong>
          </span>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <span>
            <strong>{{keywordId && keywordId.keyword ? keywordId.keyword : ""}}</strong>
          </span>
        </div>
      </div>&nbsp;
      <div>
        <vs-table max-items="10" pagination :data="statsList">
          <template slot="thead">
            <vs-th sort-key="date">Date</vs-th>
            <vs-th>Requested Visits</vs-th>
            <vs-th>Actual Visits</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].date" v-model="sdate">{{ data[indextr].date }}</vs-td>

              <vs-td
                :data="data[indextr].hits_requested"
                v-model="hitsRequested"
              >{{ data[indextr].hits_requested }}</vs-td>

              <vs-td
                :data="data[indextr].hits_achieved"
                v-model="hitsAchieved"
              >{{ data[indextr].hits_achieved }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>

    <!-- POPUP for DELETE FUNCTIONALITY !-->
    <div class="demo-alignment">
      <vs-popup
        class="holamundo"
        title="Are you sure you want to delete campaign ?"
        :active.sync="popupActive"
      >
        <span>
          <strong></strong>
        </span>
        <div class="vx-col sm:w-2/3 w-full ml-auto">
          <vs-button class="mr-3 mb-2" color="warning" type="border" @click="removeCampaignData">Yes</vs-button>
          <vs-button class="mr-3 mb-2" color="warning" type="border" @click="popupActive = false">No</vs-button>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vselect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import Datepicker from "vuejs-datepicker";
import DashboardViewStats from "../views/DashboardViewStatus";
import "flatpickr/dist/flatpickr.css";
import moduleDataList from "@/store/data-list/moduleDataList.js";
import _ from "underscore";
import * as moment from "moment";
export default {
  data() {
    return {
      keywordList: [" "],
      keyword: null,
      date: moment().format("YYYY-MM-DD"),
      statsList: [],
      keywordId: null,
      sdate: null,
      hitsRequested: null,
      hitsAchieved: null,
      keywords: [],
      campaignId: null,
      visitsfor30Days: 0,
      visitsfor60Days: 0,
      visitsfor180Days: 0,
      setDays: 0,
      lifetime_visits: 0,
      itemsPerPage: 10,
      isMounted: false,
      selected: [],
      value1: "",
      value2: "",
      popupActive: false,
      popupActive2: false,
      popupActive3: false,
      popupActive4: false,
      errorMsg: "",
      editCampaign: {},
      clients: [],
      client: { client_name: "All Client", id: "All" },
      format: "MMM dd yyyy",
      type: ["Search", "Direct"],
      startDate: moment("2019-01-01").format("YYYY-MM-DD"),
      endDate: moment()
        .add(1, "months")
        .format("YYYY-MM-DD"),
      stay_duration: " ",
      volume_size: [" "],
      campaigns_list: [],
      active_campaign_list: [],
      activeCampaignList: [],
      inActiveCampaignList: [],
      in_active_campaign_list: [],
      action: null,
      campaign_type: undefined,
      keyword_formating: " ",
      filterCorrct: false
    };
  },
  components: {
    "v-select": vselect,
    flatPickr,
    Datepicker,
    DashboardViewStats
  },
  computed: {
    isAdmin() {
      return this.$store.state.userRole === "admin";
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    products() {
      return this.$store.state.dataList.products;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length;
    }
  },
  methods: {
    addNewCampaign() {
      // this.$router.push({ path: "/dashboard/addcampaigns" });
      alert("called");
    },
    viewStats(data) {
      // alert(campaignId + " " + keywordId);
      this.$router.push({
        path: "/dashboard/viewstatus",
        query: {
          campaignId: data.id
        }
      });
    },
    //TABLE LAYOUT METHODS

    campaignActionsFn(campaign_id) {
      this.popupActive = true;
      this.deleteCampaignId = campaign_id;
    },
    removeCampaignData(campaign_id) {
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/campaigns/${this.deleteCampaignId}/delete`
        )
        .then(response => {
          if (response.data.success) {
            this.$vs.notify({
              title: "Deleted Successfully",
              color: "success",
              position: "top-right"
            });
            this.popupActive = false;
            this.getCampaignList();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    filterFn() {
      console.log(
        "show startDate",
        this.startDate,
        moment(this.startDate).format("MM-DD-YYYY")
      );
      // alert()
      var this_pointer = this;
      var filterResponse = this_pointer.campaigns_list;
      console.log("clientID", this_pointer.client.id);

      if (this_pointer.client.id && this_pointer.client.id != "All") {
        filterResponse = filterResponse.filter(
          campaign => campaign.client === this_pointer.client.client_name
        );
        // filterResponse = _.filter(filterResponse, function(c_list) {
        //   return c_list.client == this_pointer.client.client_name;
        // });
        // console.log("if1", filterResponse);
        // console.log("Rudr",filterResponse)
      }

      if (filterResponse && filterResponse.length > 0) {
        if (this_pointer.campaign_type) {
          filterResponse = _.filter(filterResponse, function(c_list) {
            return c_list.type == this_pointer.campaign_type.toLowerCase();
          });
          console.log("if2", filterResponse);
        }
      }

      if (filterResponse && filterResponse.length) {
        if (this_pointer.startDate) {
          filterResponse = _.filter(filterResponse, function(c_list) {
            if (
              c_list.start_date >=
                moment(this_pointer.startDate).format("MM-DD-YYYY") &&
              c_list.end_date <=
                moment(this_pointer.endDate).format("MM-DD-YYYY")
            ) {
              return c_list;
            }
          });
          console.log("if3", filterResponse);
        }
      }

      if (filterResponse && filterResponse.length) {
        this_pointer.activeCampaignList = _.filter(filterResponse, function(
          c_list
        ) {
          return c_list.status === "active";
        });
      } else {
        this_pointer.activeCampaignList = [];
      }

      if (filterResponse && filterResponse.length) {
        this_pointer.inActiveCampaignList = _.filter(filterResponse, function(
          c_list
        ) {
          return c_list.status === "paused";
        });
      } else {
        this_pointer.inActiveCampaignList = [];
      }
      console.log("if4", filterResponse);
    },

    pauseResumeCampaign(campaign_id, action) {
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/campaigns/${campaign_id}/${action}`
        )
        .then(response => {
          if (response.data.success) {
            this.$vs.notify({
              title: "Campaign " + action + " successfully.",
              color: "success",
              position: "top-right"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editData(data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
    getClientInfo(campaign_id) {
      var this_pointer = this;
      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/campaigns/" + campaign_id,

        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          this_pointer.editCampaign = response.data;
          console.log("secondResponse", response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // getCampgainByClientFn(event) {
    //   console.log("cliemts", event);

    //   if (event == null || event.id == "All") {
    //     this.getCampaignList();
    //   } else {
    //     var this_pointer = this;
    //     axios({
    //       method: "get",
    //       url:
    //         "https://adminapi.varuntandon.com/v1/campaigns/client/" +
    //         event.id +
    //         "?limit=100",

    //       headers: { "content-type": "application/json" }
    //     })
    //       .then(function(response) {
    //         console.log("secondResponse", response);
    //         console.log(this_pointer.campaigns);

    //         this_pointer.active_campaign_list = response.data.campaigns.filter(
    //           function(c_data) {
    //             return c_data.status == "active";
    //           }
    //         );

    //         this_pointer.in_active_campaign_list = response.data.campaigns.filter(
    //           function(c_data) {
    //             return c_data.status == "paused";
    //           }
    //         );

    //         this_pointer.campaigns_list = response.data.campaigns;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   }
    // },
    getClientList() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/clients?limit=100",
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          response.data.clients.unshift({
            client_name: "All Client",
            id: "All"
          });

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
    getCampaignList() {
      console.log("start:", this.startDate);
      // (this.startDate = moment("2019-01-01").format("YYYY-MM-DD")),
      console.log("end:", this.endDate);
      // this.endDate = moment().format("YYYY-MM-DD");

      // if (this.endDate > this.startDate) {
      //   this.filterCorrct = true;
      //   this.errorMsg = "";
      // } else {
      //   this.filterCorrct = false;
      //   this.errorMsg = "End Date Should be greater than Start Date";
      // }
      var this_pointer = this;
      // if (!this.filterCorrct) {
      this.$http({
        method: "get",
        url: `https://adminapi.varuntandon.com/v1/campaigns?start_date=${moment(
          this_pointer.startDate
        ).format("YYYY-MM-DD")}&end_date=${moment(this_pointer.endDate).format(
          "YYYY-MM-DD"
        )}&limit=100`,
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("secondResponse", response);
          // this_pointer.client = {
          //   client_name: "All Client",
          //   id: "All"
          // };

          console.log("campaignsList", response.data.campaigns);
          this_pointer.campaigns_list = response.data.campaigns.map(
            (sd, index) => {
              sd.start_date = moment(sd.start_date).format("MM-DD-YYYY");

              return sd;
            }
          );
          this_pointer.campaigns_list = response.data.campaigns.map(
            (a, index) => {
              a.end_date = moment(a.end_date).format("MM-DD-YYYY");

              return a;
            }
          );
          // this_pointer.campaigns_list = response.data.campaigns;

          this_pointer.filterFn();
          //_.filter()

          console.log(this_pointer.campaigns_list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCampaignFn() {
      var this_pointer = this;
      axios({
        method: "put",
        url:
          "https://adminapi.varuntandon.com/v1/campaigns/" +
          this.editCampaign.id,
        headers: {
          "content-type": "application/json"
        },
        data: {
          client: this.editCampaign.client,
          brand_name: this.editCampaign.brand_name,
          end_date: this.editCampaign.end_date,
          volume_size: this.editCampaign.volume_size,
          stay_duration: this.editCampaign.stay_duration,
          city_targeting_method: "priority"
        }
      })
        .then(function(response) {
          console.log("updateResponse", response);
          if (response.data.success) {
            this_pointer.popupActive2 = false;
            this_pointer.$vs.notify({
              title: "Campaign Updated",
              color: "success",
              position: "top-right"
            });

            this_pointer.getCampaignList();
            //(this_pointer.description = null);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
          console.log("FourthResponse", response);
          this_pointer.volume_size = response.data.tags;

          console.log(this_pointer.volume_size);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    displayCampaignDetails(campaignInfo) {
      this.$router.push({
        name: "dashboard-viewstatus",
        params: {
          campaignInfo: campaignInfo
        }
      });
    },
    getMainList(campaign_id) {
      this.getClientInfo(campaign_id);
      this.getKeywordList(campaign_id);
    },
    getKeywordList(campaign_id) {
      console.log("==>", campaign_id);

      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/campaigns/${campaign_id}/keywords`
        )
        .then(response => {
          console.log(response.data);
          this.keywordList = response.data.keywords;
          this.keywordId = response.data.keywords[0];
          response.data.keywords.forEach(key => {
            this.keywords[key.id] = key.keyword;
          });
          console.log(this.keywords);
          this.getKeywordStats();
          this.getStatsFor30Days();
          this.getStatsFor60Days();
          this.getStatsFor180Days();
          this.getLifetimeVisits();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getKeywordStats() {
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId.id}`,
          {
            params: {
              start_date: moment().format("YYYY-MM-DD")
            }
          }
        )

        .then(response => {
          console.log("FirstResponse", response.data);
          this.statsList = response.data.stats;
          console.log("SecondResponse", this.statsList, response.data.stats);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStatsFor30Days() {
      let now = new Date();
      let last30Days = new Date(now.setDate(now.getDate() - 30));
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId.id}`,
          {
            params: {
              start_date: moment(last30Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          response.data.stats.forEach(record => {
            this.visitsfor30Days = this.visitsfor30Days + record.hits_achieved;
            console.log(record.hits_achieved);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStatsFor60Days() {
      let now = new Date();
      let last60Days = new Date(now.setDate(now.getDate() - 60));
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId.id}`,
          {
            params: {
              start_date: moment(last60Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          response.data.stats.forEach(record => {
            this.visitsfor60Days = this.visitsfor60Days + record.hits_achieved;
            console.log(record.hits_achieved);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStatsFor180Days() {
      let now = new Date();
      let last180Days = new Date(now.setDate(now.getDate() - 180));
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId.id}`,
          {
            params: {
              start_date: moment(last180Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          response.data.stats.forEach(record => {
            this.visitsfor180Days =
              this.visitsfor180Days + record.hits_achieved;
            console.log(record.hits_achieved);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    getLifetimeVisits() {
      this.lifetime_visits = 0;
      console.log("list count", this.statsList);
      response.data.stats.forEach(record => {
        {
          this.lifetime_visits = this.lifetime_visits + record.hits_achieved;
        }
      });
    }
  },
  created() {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule("dataList", moduleDataList);
      moduleDataList.isRegistered = true;
    }
    this.$store.dispatch("dataList/fetchDataListItems");
  },
  mounted() {
    this.getClientList();
    this.getCampaignList();
    this.addVolumeTag();
    this.isMounted = true;
    // this.keywordList.map(function(a) {
    //   return (a.keywordName = a.keyword);
    // });
  }
};
</script>
<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .start-date {
      max-width: 23rem;
    }

    .end-date {
      max-width: 23rem;
    }

    .volume_size {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
