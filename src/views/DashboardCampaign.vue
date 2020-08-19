<template>
  <div class="vx-row">

    <!-- HORIZONTAL LAYOUT WITH ICON-->
    <div class="vx-col md:w-4/3 w-full mb-base">
      <vx-card>
          <h4>Add Client Campaign</h4>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 pl-15">
            <span>Client</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full ">

          <div class="dropdown-button-container">
                <vs-button class="btnx" type="filled">Dropdown</vs-button>

                <vs-dropdown>
                  <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
                  <vs-dropdown-menu>

                    <vs-dropdown-item> option 1 </vs-dropdown-item>
                    <vs-dropdown-item> option 2 </vs-dropdown-item>

                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>

          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Email</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input type="email" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border v-model="input6" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Mobile</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border v-model="input7" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Password</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border v-model="input8" />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-checkbox class="inline-flex" v-model="check2">Remember Me</vs-checkbox>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button class="mr-3 mb-2">Submit</vs-button>
            <vs-button color="warning" type="border" class="mb-2" @click="input5 = input6 = input7 = input8 = ''; check2 = false;">Reset</vs-button>
          </div>
        </div>


      </vx-card>
    </div>

   
  </div>
</template>

<script>
export default{
  data () {
    return {
      check2: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      }
  }
}
</script>
<style scoped>
h4{
    margin-left: 500px;
}
</style>