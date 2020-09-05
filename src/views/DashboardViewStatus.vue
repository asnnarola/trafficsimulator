<template>
  <div class="vx-row">
    <div class="vx-col md:w-4/3 w-full mb-base">
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
            <vs-input type="text" class="w-full" v-model="campaignInfo.client"></vs-input>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Campaign Name:</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-input type="text" class="w-full" v-model="campaignInfo.campaign_name"></vs-input>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Brand Name:</strong>
            </span>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
            <vs-input type="text" class="w-full" v-model="campaignInfo.brand_name"></vs-input>
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
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Actual Visits in last 30 days:</strong>
            </span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Actual Visits in last 60 days:</strong>
            </span>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>
              <strong>Actual Visits in last 180 days:</strong>
            </span>
          </div>
        </div>

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
          <vs-table max-items="3" pagination :data="statsList">
            <template slot="thead">
              <vs-th>Date</vs-th>
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
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
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
      campaignInfo: null,
      keywords: []
      //setName: ""
    };
  },
  components: {
    "v-select": vSelect
  },
  methods: {
    getKeywordList() {
      this.$http
        .get(
          `http://adminapi.varuntandon.com/v1/campaigns/${this.campaignInfo.id}/keywords`
        )
        .then(response => {
          console.log(response.data);
          this.keywordList = response.data.keywords;
          this.keywordId = response.data.keywords[0].id;
          response.data.keywords.forEach(key => {
            this.keywords[key.id] = key.keyword;
          });
          console.log(this.keywords);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getKeywordStats() {
      this.$http
        .get(
          `http://adminapi.varuntandon.com/v1/stats/by_keyword/${this.keywordId}`,
          {
            params: {
              start_date: this.date
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
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.campaignInfo = {
        client: this.$route.query.clientName,
        id: this.$route.query.campaignId,
        brand_name: this.$route.query.brandName,
        campaign_name: this.$route.query.campaignName
      };
    }
    this.getKeywordList();
  }
};
</script>

<style scoped>
</style>







