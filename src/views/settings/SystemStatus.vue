<template>
<div>
	<h1>System Settings/Configurations</h1>
		<vx-card>
			<h2>App Info:</h2>
			&nbsp;
			<h3>Uptime:</h3>
			<h3>System Health:</h3>
		<vs-divider></vs-divider>

			<div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <h3>System Reboot:</h3>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
           <vs-button size="large" @click="active1=true">Reboot System Now</vs-button>
					 <vs-alert :active.sync="active1" closable icon-pack="feather" close-icon="icon-x">
							Do you really want reboot ?.
					</vs-alert>
          </div>
        </div>

				<div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <h3>Error Log:</h3>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
           <vs-button size="large">Show Error Log</vs-button>
          </div>
					<div class="vx-col sm:w-1/3 w-full">
           <vs-button size="large">Clear Error Log</vs-button>
          </div>
        </div>

				<div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <h3>Runtime Log:</h3>
          </div>
          <div class="vx-col sm:w-1/3 w-full">
           <vs-button size="large">Show Runtime Log</vs-button>
          </div>
					<div class="vx-col sm:w-1/3 w-full">
           <vs-button size="large">Clear Runtime Log</vs-button>
          </div>
        </div>
					&nbsp;
				 <vs-textarea v-model="textarea" label="Log" height="200px" />
		</vx-card>
</div>
</template>

<script>
export default {
			data(){
				return{
					active1: false,
					textarea: ''
				}
			}
}
</script>

<style>

</style>