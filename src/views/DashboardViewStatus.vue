
<template>
  <div class="vx-row">
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vs-popup title="View Stats" :active.sync="popupActive4">
        <vx-card>
          <div class="flex flex-wrap items-center justify-between">
            <vx-input-group class="mb-base mr-3">
              <span>
                <b>
                  <h3>View Stats For Campaigns</h3>
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
                <strong>Client:</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-input type="text" class="w-full" :value="campaignInfo.client"></vs-input>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Campaign Name:</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-input type="text" class="w-full" :value="campaignInfo.campaign_name"></vs-input>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Brand Name:</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-input type="text" class="w-full" :value="campaignInfo.brand_name"></vs-input>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>
                <strong>Keyword List</strong>
              </span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
              <vs-select class="w-full select-large" @change="getKeywordStats" v-model="keywordId">
                <vs-select-item
                  :key="index"
                  :value="item.id"
                  :text="item.keyword"
                  v-for="(item,index) in keywordList"
                  class="w-full"
                />
              </vs-select>
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
                <strong>{{this.xyz}}</strong>
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
                <strong>{{this.lastDays}}</strong>
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
                <strong>{{this.setDay}}</strong>
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
                <strong>{{keywords[keywordId]}}</strong>
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
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";
import * as moment from "moment";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
export default {
  data() {
    return {  
      keywordList: {},
      keyword: null,
      date: moment().format("YYYY-MM-DD"),
      statsList: [],
      keywordId: null,
      sdate: null,
      hitsRequested: null,
      hitsAchieved: null,
      campaignInfo: {
        client: "",
        campaign_name: "",
        brand_name: ""
      },
      keywords: [],
      campaignId: null,
      xyz: 0,
      lastDays: 0,
      setDay: 0,
      setDays: 0,
      lifetime_visits: 0,
      //setName: "",
      popupActive4: false
    };
  },
  components: {
    "v-select": vSelect,
    AgGridVue
  },
  methods: {
    async getKeywordList() {
      await this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/campaigns/${this.campaignId}/keywords`
        )
        .then(response => {
          console.log(response.data);
          this.keywordList = response.data.keywords;
          this.keywordId = response.data.keywords[0].id;
          response.data.keywords.forEach(key => {
            this.keywords[key.id] = key.keyword;
          });
          console.log(this.keywords);
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
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId}`,
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
    getClientInfo(campaign_id) {
      var this_pointer = this;
      axios({
        method: "get",
        url: "https://adminapi.varuntandon.com/v1/campaigns/" + campaign_id,

        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          this_pointer.campaignInfo = response.data;
          console.log("response", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getStatsFor30Days() {
      let now = new Date();
      let last30Days = new Date(now.setDate(now.getDate() - 30));
      this.$http
        .get(
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId}`,
          {
            params: {
              start_date: moment(last30Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          this.statsList.forEach(record => {
            this.xyz = this.xyz + record.hits_achieved;
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
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId}`,
          {
            params: {
              start_date: moment(last60Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          this.statsList.forEach(record => {
            this.lastDays = this.lastDays + record.hits_achieved;
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
          `https://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId}`,
          {
            params: {
              start_date: moment(last180Days).format("YYYY-MM-DD")
            }
          }
        )
        .then(response => {
          this.statsList.forEach(record => {
            this.setDay = this.setDay + record.hits_achieved;
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
      this.statsList.forEach(record => {
        {
          this.lifetime_visits = this.lifetime_visits + record.hits_achieved;
        }
      });
    }
  },

  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.campaignId = this.$route.query.campaignId;
    }
    this.getClientInfo(this.campaignId);
    this.getKeywordList();
  }
};
</script>

<style scoped>
</style>







