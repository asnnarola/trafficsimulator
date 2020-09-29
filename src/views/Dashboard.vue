<template >
  <div v-if="isAdmin">
    <h1>Traffic Simulator Dashboard</h1>&nbsp;
    <vx-card>
      <h2>App Info:</h2>&nbsp;
      <h3>
        Uptime:
        <strong>{{ appInfo ? appInfo.uptime : '' }}</strong>
      </h3>
      <h3 v-if="appInfo">
        System Health:
        <strong>{{ appInfo.status.healthy ? 'true' : 'false' }}</strong>
      </h3>&nbsp;
      <h1>Critical Alerts:</h1>
    </vx-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      appInfo: null
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.userRole === "admin";
    }
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    getAppInfo() {
      axios.get("http://adminapi.varuntandon.com/v1/info").then(response => {
        console.log("==>", response.data);
        this.appInfo = response.data;
      });
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 30px;
}
</style>