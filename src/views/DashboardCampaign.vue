<template>
  <div class="vx-row">
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
        <h4>View Campaigns</h4>&nbsp
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Client Name</label>
            <v-select
              v-model="client"
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
              label-placeholder="client_name"
              :options="type"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            />
          </div>
        </div>
        <div class="vx-row">
          <!-- <div class="vx-col sm:w-1/2 w-full mb-2">
                            <label>End Date</label>
                            <flat-pickr class="w-full" :config="configTodateTimePicker" v-model="endDate" placeholder="End Date" @on-change="onToChange" />
          </div>-->
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>Start Date</label>
            <flat-pickr class="w-full" placeholder="Start Date" v-model="startDate" />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label>End Date</label>
            <flat-pickr class="w-full" placeholder="End Date" v-model="endDate" />
          </div>
        </div>
        <div class="mt-2 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="addNewCampaign">Add a new Campaign</vs-button>
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
          :data="products"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
              <span class="ml-2 text-base text-primary">
                <strong>
                  Active Campaigns-
                  <span class="ml-2 text-base text-warning">Highland Oak Central</span>
                </strong>
              </span>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
              <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage=4">
                  <span>4</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=15">
                  <span>15</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=20">
                  <span>20</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <template slot="thead">
            <vs-th sort-key="start_date">Start Date</vs-th>
            <vs-th sort-key="end_date">End Date</vs-th>
            <vs-th sort-key="brand_name">Brand Name</vs-th>
            <vs-th sort-key="campaign_name">Campaign Name</vs-th>
            <vs-th sort-key="type">Type</vs-th>
            <vs-th sort-key="search_method">Search Method</vs-th>
            <vs-th sort-key="url">URL</vs-th>
            <vs-th sort-key="price"></vs-th>
            <vs-th sort-key="timestamp">Timestamp</vs-th>
            <vs-th sort-key="country">Country</vs-th>
            <vs-th sort-key="state">State</vs-th>
            <vs-th sort-key="city">City</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <p class="start-date font-medium truncate">{{tr.start_date}}</p>
                </vs-td>

                <vs-td>
                  <p class="end-date">{{tr.end_date}}</p>
                </vs-td>

                <vs-td>
                  <p class="brand_name">{{tr.brand_name}}</p>
                </vs-td>

                <vs-td>
                  <p class="campaign_name">{{tr.campaign_name}}</p>
                </vs-td>

                <vs-td>
                  <p class="type">{{tr.type}}</p>
                </vs-td>

                <vs-td>
                  <p class="search_method">{{tr.search_method}}</p>
                </vs-td>

                <vs-td>
                  <p class="url">{{tr.url}}</p>
                </vs-td>

                <vs-td>
                  <p class="brand_type"></p>
                </vs-td>

                <vs-td>
                  <p class="timestamp">{{tr.timestamp}}</p>
                </vs-td>

                <vs-td>
                  <p class="country">{{tr.country}}</p>
                </vs-td>

                <vs-td>
                  <p class="state">{{tr.state}}</p>
                </vs-td>

                <vs-td>
                  <p class="city">{{tr.city}}</p>
                </vs-td>

                <vs-td class="whitespace-no-wrap">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editData(tr)"
                  />
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteData(tr.id)"
                  />
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </vx-card>

    <!------------------------------------------------TABLE LAYOUT-INACTIVE------------------------------------------------!-->
    <vx-card  >
      <div id="data-list-list-view" class="data-list-container">
        <vs-table
          ref="table"
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="products"
        >
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
              <span class="ml-2 text-base text-danger">
                <strong>
                  In-active Campaigns-
                  <span class="ml-2 text-base text-warning">Highland Oak Central</span>
                </strong>
              </span>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
              <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span
                  class="mr-2"
                >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage=4">
                  <span>4</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=15">
                  <span>15</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage=20">
                  <span>20</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <template slot="thead">
            <vs-th sort-key="start_date">Start Date</vs-th>
            <vs-th sort-key="end_date">End Date</vs-th>
            <vs-th sort-key="brand_name">Brand Name</vs-th>
            <vs-th sort-key="campaign_name">Campaign Name</vs-th>
            <vs-th sort-key="type">Type</vs-th>
            <vs-th sort-key="search_method">Search Method</vs-th>
            <vs-th sort-key="url">URL</vs-th>
            <vs-th sort-key="price"></vs-th>
            <vs-th sort-key="timestamp">Timestamp</vs-th>
            <vs-th sort-key="country">Country</vs-th>
            <vs-th sort-key="state">State</vs-th>
            <vs-th sort-key="city">City</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <p class="start-date font-medium truncate">{{tr.start_date}}</p>
                </vs-td>

                <vs-td>
                  <p class="end-date">{{tr.end_date}}</p>
                </vs-td>

                <vs-td>
                  <p class="brand_name">{{tr.brand_name}}</p>
                </vs-td>

                <vs-td>
                  <p class="campaign_name">{{tr.campaign_name}}</p>
                </vs-td>

                <vs-td>
                  <p class="type">{{tr.type}}</p>
                </vs-td>

                <vs-td>
                  <p class="search_method">{{tr.search_method}}</p>
                </vs-td>

                <vs-td>
                  <p class="url">{{tr.url}}</p>
                </vs-td>

                <vs-td>
                  <p class="brand_type"></p>
                </vs-td>

                <vs-td>
                  <p class="timestamp">{{tr.timestamp}}</p>
                </vs-td>

                <vs-td>
                  <p class="country">{{tr.country}}</p>
                </vs-td>

                <vs-td>
                  <p class="state">{{tr.state}}</p>
                </vs-td>

                <vs-td>
                  <p class="city">{{tr.city}}</p>
                </vs-td>

                <vs-td class="whitespace-no-wrap">
                  <feather-icon
                    icon="EditIcon"
                    svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    @click.stop="editData(tr)"
                  />
                  <feather-icon
                    icon="TrashIcon"
                    svgClasses="w-5 h-5 hover:text-danger stroke-current"
                    class="ml-2"
                    @click.stop="deleteData(tr.id)"
                  />
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from 'axios';
import vselect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moduleDataList from "@/store/data-list/moduleDataList.js";
export default {
  data() {
    return {
      selected: [],
      itemsPerPage: 2,
      isMounted: false,
      clients: [],
      client: null,
      type: ["Search", "Direct"],
      startDate: null,
      endDate: null
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
    //TABLE LAYOUT METHODS

    deleteData(id) {
      this.$store.dispatch("dataList/removeItem", id).catch(err => {
        console.error(err);
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
    getClientList(){
       var this_pointer = this;
      axios({
        method: "get",
        url: "http://adminapi.varuntandon.com/v1/clients?limit=100",
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          console.log("firstResponse", response);
          response.data.clients.forEach(record => {
            this_pointer.clients.push(record.client_name);
          });
          console.log(this_pointer.clients);
        })
        .catch(function(error) {
          console.log(error);
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