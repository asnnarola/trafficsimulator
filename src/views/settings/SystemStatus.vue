<template>
  <div>
    <h1>System Settings/Configurations</h1>
    <vx-card>
      <h2>App Info:</h2>&nbsp;
      <h3>Uptime: {{ appInfo ? appInfo.uptime : '' }}</h3>
      <h3 v-if="appInfo">System Health: {{ appInfo.status.healthy ? 'Good' : 'Bad' }}</h3>
      <vs-divider></vs-divider>

      <div class="vx-row mb-6" v-if="isAdmin">
        <div class="vx-col sm:w-1/3 w-full">
          <h3>System Reboot:</h3>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <vs-button size="large" @click="systemReboot">Reboot System Now</vs-button>
        </div>
      </div>

      <div class="demo-alignment">
        <vs-popup
          class="holamundo"
          title="Are you sure you really want to reboot ?"
          :active.sync="popupActive"
        >
          <span>
            <strong></strong>
          </span>
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button class="mr-3 mb-2" color="warning" type="border" @click="reboot">Yes</vs-button>
            <vs-button class="mr-3 mb-2" color="warning" type="border" @click="popupActive=false">No</vs-button>
          </div>
        </vs-popup>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h3>Error Log:</h3>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <vs-button size="large" @click="showErrorLog">Show Error Log</vs-button>
        </div>
        <div class="vx-col sm:w-1/3 w-full" v-if="isAdmin">
          <vs-button size="large" @click="clearErrorLog">Clear Error Log</vs-button>
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col sm:w-1/3 w-full">
          <h3>Runtime Log:</h3>
        </div>
        <div class="vx-col sm:w-1/3 w-full">
          <vs-button size="large" @click="showRuntimeLog">Show Runtime Log</vs-button>
        </div>
        <div class="vx-col sm:w-1/3 w-full" v-if="isAdmin">
          <vs-button size="large" @click="clearRuntimeLog">Clear Runtime Log</vs-button>
        </div>
      </div>&nbsp;
      <vs-textarea id="logs" v-html="textarea" v-model="textarea" label="Log" height="200px" />
    </vx-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      appInfo: null,
      popupActive: false
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
      this.$http
        .get("https://adminapi.varuntandon.com/v1/info")
        .then(response => {
          console.log(response.data);
          this.appInfo = response.data;
        });
    },
    showErrorLog() {
      this.$http
        .get("https://adminapi.varuntandon.com/v1/log/error")
        .then(response => {
          console.log(response.data);
          this.textarea = response.data;
        });
    },
    clearErrorLog() {
      this.$http
        .get("https://adminapi.varuntandon.com/v1/log/error/clear")
        .then(response => {
          console.log("Error log cleared!");
        });
    },

    showRuntimeLog() {
      this.$http
        .get("https://adminapi.varuntandon.com/v1/log/runtime")
        .then(response => {
          console.log(response.data);
          this.textarea = response.data;
        });
    },

    clearRuntimeLog() {
      this.$http
        .get("https://adminapi.varuntandon.com/v1/log/runtime/clear")
        .then(response => {
          console.log("Runtime log cleared!");
        });
    },
    systemReboot() {
      this.popupActive = true;
    },
    reboot() {
      this.$http
        .get("https://adminapi.varuntandon.com/v1/reboot")
        .then(response => {
          console.log("System is rebooted!");
          if (response.data.success) {
            this.popupActive = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#logs {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>