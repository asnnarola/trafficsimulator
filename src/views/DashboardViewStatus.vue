<template>
  <div>
    <h3>View Stats for a Campaign</h3>&nbsp;
    <vx-card>
      <h4>
        <span>Client : {{campaignInfo.client}}</span>
      </h4>&nbsp;
      <h4>Campaign Name : {{ campaignInfo.brand_name }}</h4>&nbsp;
      <h4>Brand Name : {{campaignInfo.brand_name}}</h4>&nbsp;
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Keyword List:</h4>
        </div>
        <div class="vx-col sm:w-1/3 w-full mt-5">
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
          <h4>Actual Lifetime Visits:</h4>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Actual Visits in last 30 days:</h4>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Actual Visits in last 60 days:</h4>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Actual Visits in last 180 days:</h4>
        </div>
      </div>

      <!--STATS TABLE !-->
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Stats for last 365 days:</h4>
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
      keywordList: [],
      keyword: null,
      date: moment().format("YYYY-MM-DD"),
      statsList: [],
      keywordId: null,
      sdate: null,
      hitsRequested: null,
      hitsAchieved: null,
      campaignInfo: null
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
    if (Object.keys(this.$route.params).length) {
      this.campaignInfo = this.$route.params.data;
    }
    this.getKeywordList();
  }
};
</script>

<style scoped>
</style>