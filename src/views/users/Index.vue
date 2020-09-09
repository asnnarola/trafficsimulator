<template>
  <vx-card>
    <div class="flex flex-wrap items-center justify-between">
      <vx-input-group class="mb-base mr-3">
        <span>
          <b>
            <h3>All Users</h3>
          </b>
        </span>
      </vx-input-group>
      <div class="flex items-center">
        <vs-button class="mb-base mr-3" @click="activePrompt = true">Add User</vs-button>
      </div>
    </div>

    <vs-divider></vs-divider>

    <vs-table v-model="selected" pagination max-items="10" search :data="users">
      <template slot="header">
        <h3>Users</h3>
      </template>
      <template slot="thead">
        <vs-th sort-key="client_name">Name</vs-th>
        <vs-th sort-key="description">Email</vs-th>
        <vs-th sort-key="description">Phone</vs-th>
        <vs-th sort-key="actions">Actions</vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].name">
            {{
            data[indextr].name
            }}
          </vs-td>

          <vs-td :data="data[indextr].email">
            {{
            data[indextr].email
            }}
          </vs-td>
          <vs-td :data="data[indextr].phone">{{ data[indextr].phone }}</vs-td>
          <vs-td>
            <div class="d-flex">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                @click="editUser(data[indextr].id)"
              />
              <feather-icon
                icon="TrashIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="removeUser(data[indextr].id)"
              />
            </div>
          </vs-td>
        </vs-tr>
        <div class="demo-alignment">
          <vs-popup
            class="holamundo"
            title="Are you sure to want delete this User ?"
            :active.sync="popupActive"
          >
            <span>
              <strong></strong>
            </span>
            <div class="vx-col sm:w-2/3 w-full ml-auto">
              <vs-button class="mr-3 mb-2" color="warning" type="border" @click="deleteUser()">Yes</vs-button>
              <vs-button
                class="mr-3 mb-2"
                color="warning"
                type="border"
                @click="popupActive=false"
              >No</vs-button>
            </div>
          </vs-popup>
        </div>
      </template>
    </vs-table>

    <!-- modal to add user -->
    <vs-prompt
      title="Add User"
      :accept-text="edit ? 'UPDATE' : 'ADD'"
      @cancel="resetAll"
      @accept="edit ? updateUser() : addUser()"
      @close="resetAll"
      :active.sync="activePrompt"
      :is-valid="validateForm"
    >
      <div class="clearfix">
        <vs-input
          v-model="name"
          v-validate="'required|min:3'"
          data-vv-validate-on="blur"
          data-vv-as="Name"
          name="name"
          class="w-full"
          label-placeholder="Name"
          placeholder="Name"
        ></vs-input>
        <span class="text-danger text-sm">{{ errors.first('name') }}</span>
        <vs-input
          v-model="email"
          v-validate="'required|email|min:3'"
          data-vv-validate-on="blur"
          data-vv-as="Email"
          name="email"
          class="w-full mt-6"
          label-placeholder="Email"
          placeholder="Email"
        ></vs-input>
        <span class="text-danger text-sm">{{ errors.first('email') }}</span>
        <vs-input
          v-model="phone"
          v-validate="'required'"
          data-vv-validate-on="blur"
          data-vv-as="Phone"
          name="phone"
          class="w-full mt-6"
          label-placeholder="Phone"
          placeholder="Phone"
        ></vs-input>
        <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
        <vs-input
          ref="password"
          type="password"
          data-vv-validate-on="blur"
          v-validate="'required|min:6|max:10'"
          name="password"
          label-placeholder="Password"
          placeholder="Password"
          v-model="password"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors.first('password') }}</span>

        <vs-input
          type="password"
          v-validate="'min:6|max:10|confirmed:password'"
          data-vv-validate-on="blur"
          data-vv-as="password"
          name="confirm_password"
          label-placeholder="Confirm Password"
          placeholder="Confirm Password"
          v-model="confirm_password"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
      </div>
    </vs-prompt>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      activePrompt: false,
      name: null,
      email: null,
      phone: null,
      password: null,
      confirm_password: null,
      popupActive: false,
      selected: null,
      selectedId: null,
      edit: false,
      users: [
        {
          id: 1,
          name: "Hiren Dhanecha",
          email: "hda@narola.email",
          phone: "4444444444",
        },
        {
          id: 2,
          name: "Anand Soni",
          email: "aso@narola.email",
          phone: "7777777777",
        },
        {
          id: 3,
          name: "Mihir Sata",
          email: "msa@narola.email",
          phone: "5555555555",
        },
        {
          id: 4,
          name: "Harshal Bhatt",
          email: "hbt@narola.email",
          phone: "9999999999",
        },
      ],
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.email &&
        this.password &&
        this.name &&
        this.phone &&
        this.confirm_password
      );
    },
  },
  methods: {
    // add user
    addUser() {
      let id = this.users[this.users.length - 1].id + 1;
      this.users.push({
        id: id,
        name: this.name,
        email: this.email,
        phone: this.phone,
      });
    },

    // remove User
    removeUser(id) {
      this.selectedId = id;
      this.popupActive = true;
    },
    deleteUser() {
      const userIndex = this.users.findIndex(
        (user) => user.id === this.selectedId
      );
      this.users.splice(userIndex, 1);
      this.selectedId = null;
      this.popupActive = false;
    },

    // Update User
    editUser(id) {
      this.activePrompt = true;
      this.edit = true;
      const user = this.users.filter((user) => user.id === id)[0];
      this.selectedId = user.id;
      this.name = user.name;
      this.email = user.email;
      this.phone = user.phone;
    },
    updateUser() {
      const user = {
        id: this.selectedId,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };

      const userIndex = this.users.findIndex(
        (user) => user.id === this.selectedId
      );
      this.users.splice(userIndex, 1, user);
      this.resetAll();
    },

    // Reset all fields
    resetAll() {
      this.activePrompt = false;
      this.selectedId = null;
      this.name = null;
      this.email = null;
      this.phone = null;
    },
  },
};
</script>

<style>
</style>