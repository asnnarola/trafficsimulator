<template>
  <div>
    <h3>View Stats for a Campaign</h3>&nbsp;
    <vx-card>
      <h4>Client:</h4>&nbsp;
      <h4>Campaign Name</h4>&nbsp;
      <h4>Brand Name:</h4>&nbsp;
      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h4>Keyword List:</h4>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <template>
            <v-select
              v-model="keyword"
              label="keyword_list"
              @click="getKeywordList(campaign_id)"
              :options="keywordList"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            ></v-select>
          </template>
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
        <vs-table max-items="3" pagination :data="users">
          <template slot="thead">
            <vs-th>Date</vs-th>
            <vs-th>Requested Visits</vs-th>
            <vs-th>Actual Visits</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].date">{{ data[indextr].date }}</vs-td>

              <vs-td :data="data[indextr].requested_visits">{{ data[indextr].requested_visits }}</vs-td>

              <vs-td :data="data[indextr].actual_visits">{{ data[indextr].actual_visits }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
import vselect from "vue-select";
import axios from "axios";
export default {
  data() {
    return {
      users: [
        {
          date: "5/24/2020",
          requested_visits: 20,
          actual_visits: 20
        },
        {
          date: "5/25/2020",
          requested_visits: 25,
          actual_visits: 22
        }
      ],
      keywordList: [],
      keyword: null,
      //campaign: [],
      campaign_id: ""
    };
  },
  components: {
    "v-select": vselect
  },
  methods: {
    // getCampaignId(campaign_id) {
    //   this.$http
    //     .get(`http://adminapi.varuntandon.com/v1/campaigns/${campaign_id}`)
    //     .then(response => {
    //       let campaign_data = response.data.campaigns
    //       console.log('firstresponse',response);
    //       this.campaign = this.campaign_data
    //       console.log("generated response", this.campaign);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    getKeywordList() {
      //  console.log("responsee", this.campaigns);

      this.$http
        .get(
          `http://adminapi.varuntandon.com/v1/campaigns/${this.campaign_id}/keywords`
        )
        .then(response => {
          console.log(response.data);

        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    //this.getKeywordList();
    // console.log("secondresponse", this.$route.params.id);
    // if (Object.keys(this.$route.params).length) {
    //   this.campaign_id = this.$route.params.id;
    //   this.getKeywordList();

    //   // if (Object.keys(this.$route.params).length) {
    //   // this.campaign_id = this.$route.params.campaign_id;
    //   // this.getKeywordList();
    // }

    var querypara = window.location.search.split("?campaign_id=");

    if (querypara && querypara.length) {
      this.campaign_id = querypara[1];
      this.keywordList = this.campaign_id
      this.getKeywordList();
    }

    //this.getCampaignId();
  }
};
</script>

<style scoped>
</style>