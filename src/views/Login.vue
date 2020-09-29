<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-6">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>
                <vs-divider></vs-divider>
                <div class="vx-col pt-6">
                  <vs-input
                    v-validate="'required|email|min:3'"
                    data-vv-validate-on="blur"
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    label-placeholder="Email"
                    icon-pack="feather"
                    v-model="email"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                  <vs-input
                    data-vv-validate-on="blur"
                    v-validate="'required|min:6|max:10'"
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Password"
                    v-model="password"
                    class="w-full mt-6 pt-3"
                  />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                  <div class="flex flex-wrap justify-end my-5">
                    <router-link to="/pages/forgot-password">Forgot Password?</router-link>
                  </div>
                  <div class="m-6 clearfix justify-between">
                    <vs-button
                      class="bg-primary-gradient w-full"
                      :disabled="!validateForm"
                      @click="login"
                    >Login</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      email: null,
      password: null,
      checkbox_remember_me: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== "" && this.password !== "";
    }
  },
  methods: {
    login() {
      if (this.email === "admin@gmail.com" && this.password === "123456") {
        this.$store.commit("SET_LOGIN_STATUS", true);
        this.$store.commit("SET_USER_ROLE", "admin");
        localStorage.setItem("isAdmin", true);
        this.$vs.notify({
          title: "Login Successful",
          color: "success",
          position: "top-right"
        });
        location.reload();
      } else if (
        this.email === "`user@gmail.com" &&
        this.password === "123456"
      ) {
        this.$store.commit("SET_LOGIN_STATUS", true);
        this.$store.commit("SET_USER_ROLE", "editor");
        localStorage.setItem("isEditor", true);
        this.$vs.notify({
          title: "Login Successful",
          color: "success",
          position: "top-right"
        });
        location.reload();
      } else {
        this.$vs.notify({
          title: "Invalid Credentials",
          color: "danger",
          position: "top-right"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
