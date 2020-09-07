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
          <div class="flex items-center">
            <vs-button class="mb-base mr-3" @click="addNewCampaign">Add a new Campaign</vs-button>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Client Name</label>
            <v-select
              v-model="client"
              label="client_name"
              @input="getCampgainByClientFn"
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
              label-placeholder="campaign_type"
              :options="type"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>End Date</label>
            <flat-pickr class="w-full" placeholder="End Date" v-model="endDate" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Start Date</label>
            <flat-pickr
              class="w-full"
              placeholder="Start Date"
              v-model="startDate"
              @click="getCampaignList"
            />
            <!-- @click="getCampaignList"/> -->
          </div>
        </div>
      </vx-card>
    </div>
    <!------------------------------------------------TABLE LAYOUT-ACTIVE--------------------------------------------!-->
    <vx-card>
      <div id="data-list-list-view" class="data-list-container">
        <vs-table
          ref="table"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="active_campaign_list"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
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
            <vs-th sort-key>Visits Per Day</vs-th>
            <vs-th sort-key="stay_duration">Time spend</vs-th>
            <vs-th sort-key="country">Country</vs-th>
            <vs-th sort-key="state">State</vs-th>
            <vs-th sort-key="city">City</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <p class="start-date font-medium truncate">{{ tr.start_date }}</p>
                </vs-td>

                <vs-td>
                  <p class="end-date">{{ tr.end_date }}</p>
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
                  <p class="brand_type"></p>
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

                <vs-td class="whitespace-no-wrap">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
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
                    @click="viewStats(tr)"
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

    <!------------------------------------------------TABLE LAYOUT-INACTIVE------------------------------------------------!-->
    <vx-card>
      <div id="data-list-list-view" class="data-list-container">
        <vs-table
          ref="table"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="in_active_campaign_list"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
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
            <vs-th sort-key>Visits Per Day</vs-th>
            <vs-th sort-key="stay_duration">Time spend</vs-th>
            <vs-th sort-key="country">Country</vs-th>
            <vs-th sort-key="state">State</vs-th>
            <vs-th sort-key="city">City</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <p class="start-date font-medium truncate">{{ tr.start_date }}</p>
                </vs-td>

                <vs-td>
                  <p class="end-date">{{ tr.end_date }}</p>
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
                  <p class="brand_type"></p>
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

                <vs-td class="whitespace-no-wrap">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click="getCLientInfo(tr.id)"
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
                    @click="viewStats(tr)"
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

    <!-- POPUP !-->
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
          <vs-button class="mr-3 mb-2" color="warning" type="border" @click="popupActive=false">No</vs-button>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vselect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moduleDataList from "@/store/data-list/moduleDataList.js";
import * as moment from "moment";
export default {
  data() {
    return {
      selected: [],
      itemsPerPage: 5,
      isMounted: false,
      value1: "",
      value2: "",
      popupActive: false,
      popupActive2: false,
      popupActive3: false,
      editCampaign: {},
      clients: [],
      client: {
        client_name: "All CLient",
        id: "All"
      },
      type: ["Search", "Direct"],
      startDate: moment().format("YYYY-MM-DD"),
      endDate: null,
      stay_duration: " ",
      volume_size: [],
      campaigns_list: [],
      active_campaign_list: [],
      in_active_campaign_list: [],
      action: null
    };
  },
  components: {
    "v-select": vselect,
    flatPickr
  },
  computed: {
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
      this.$router.push("/dashboard/addcampaigns");
    },
    viewStats(data) {
      // alert(campaignId + " " + keywordId);
      this.$router.push({
        path: "/dashboard/viewstatus",
        query: {
          campaignId: data.id,
          clientName: data.client,
          brandName: data.brand_name,
          campaignName: data.campaign_name
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
          `http://adminapi.varuntandon.com/v1/campaigns/${this.deleteCampaignId}/delete`
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
    pauseResumeCampaign(campaign_id, action) {
      this.$http
        .get(
          `http://adminapi.varuntandon.com/v1/campaigns/${campaign_id}/${action}`
        )
        .then(response => {
          if (response.data.success) {
            this.$vs.notify({
              title: "Campaign " + action + " successfully.",
              color: "success",
              position: "top-right"
            });
          }
          // else if (response.data.success === "resume") {
          //   this.$vs.notify({
          //     title: "Campaign Resumed",
          //     color: "dark",
          //     position: "top-right"
          //   });
          // }
          this.getCampaignList();
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
    getCLientInfo(campgain_id) {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/campaigns/" + campgain_id,

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
    getCampgainByClientFn(event) {
      console.log("cliemts", event);

      if (event == null || event.id == "All") {
        this.getCampaignList();
      } else {
        var this_pointer = this;
        axios({
          method: "get",
          url:
            "http://adminapi.varuntandon.com/v1/campaigns/client/" +
            event.id +
            "?limit=100",

          headers: { "content-type": "application/json" }
        })
          .then(function(response) {
            console.log("secondResponse", response);
            console.log(this_pointer.campaigns);

            this_pointer.active_campaign_list = response.data.campaigns.filter(
              function(c_data) {
                return c_data.status == "active";
              }
            );

            this_pointer.in_active_campaign_list = response.data.campaigns.filter(
              function(c_data) {
                return c_data.status == "paused";
              }
            );

            this_pointer.campaigns_list = response.data.campaigns;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getClientList() {
      var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/clients?limit=100",
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
      var this_pointer = this;
      axios({
        method: "get",
        url:
          "http://adminapi.varuntandon.com/v1/campaigns?" +
          "start_date=" +
          this.startDate,

        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("secondResponse", response);
          this_pointer.client = {
            client_name: "All Client",
            id: "All"
          };
          this_pointer.active_campaign_list = response.data.campaigns.filter(
            function(c_data) {
              return c_data.status == "active";
            }
          );

          this_pointer.in_active_campaign_list = response.data.campaigns.filter(
            function(c_data) {
              return c_data.status == "paused";
            }
          );

          this_pointer.campaigns_list = response.data.campaigns;
          console.log(this_pointer.campaigns);
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
          "http://adminapi.varuntandon.com/v1/campaigns/" +
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
        url: "http://adminapi.varuntandon.com/v1/tvt",
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
