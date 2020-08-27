<template>
  <div>
    <vs-table pagination :data="trafficVolumeTags">
      <template slot="header">
        <h3>Traffic Volume Size</h3>
      </template>
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Min</vs-th>
        <vs-th>Max</vs-th>
        <vs-th>Update Text</vs-th>
        <vs-th>Remove</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].tag_name">
            <span
              v-if="!(edit === indextr)"
              @click="setData(data[indextr], indextr)"
            >{{ data[indextr].tag_name }}</span>
            <vs-input
              v-if="(edit === indextr)"
              class="inputx"
              placeholder="Name"
              v-model="tag_name"
            />
          </vs-td>
          <vs-td :data="data[indextr].min_hit">
            <span
              v-if="!(edit === indextr)"
              @click="setData(data[indextr], indextr)"
            >{{ data[indextr].min_hit }}</span>
            <vs-input v-if="(edit === indextr)" class="inputx" placeholder="Min" v-model="min_hit" />
          </vs-td>
          <vs-td :data="data[indextr].max_hit">
            <span
              v-if="!(edit === indextr)"
              @click="setData(data[indextr], indextr)"
            >{{ data[indextr].max_hit }}</span>
            <vs-input v-if="(edit === indextr)" class="inputx" placeholder="Max" v-model="max_hit" />
          </vs-td>
          <vs-td :data="data[indextr].id">
            <vs-button
              :disabled="!(edit === indextr)"
              @click="updateTag(data[indextr].id)"
              color="primary"
              type="filled"
            >Update Text</vs-button>
          </vs-td>
          <vs-td :data="data[indextr].id">
            <vs-button color="danger" type="filled">Remove</vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trafficVolumeTags: [],
      tag_name: null,
      min_hit: null,
      max_hit: null,
      edit: null,
    };
  },
  mounted() {
    this.getTrafficVolumeTags();
  },
  methods: {
    getTrafficVolumeTags() {
      this.$http
        .get("http://adminapi.varuntandon.com/v1/tvt")
        .then((response) => {
          this.trafficVolumeTags = response.data.tags;
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    updateTag(tag_id) {
      this.$http
        .put(`http://adminapi.varuntandon.com/v1/tvt/${tag_id}`, {
          tag_name: this.tag_name,
          min_hit: this.min_hit,
          max_hit: this.max_hit,
        })
        .then((response) => {
          if (response.data.success) {
            var newTag = {
              id: tag_id,
              tag_name: this.tag_name,
              min_hit: this.min_hit,
              max_hit: this.max_hit,
            };
            this.trafficVolumeTags = this.trafficVolumeTags.map((tag) =>
              tag.id === tag_id ? (tag = newTag) : tag
            );
            this.tag_name = null;
            this.min_hit = null;
            this.max_hit = null;
            this.edit = -1;
          }
        })
        .catch((error) => console.log(error));
    },
    setData(data, index) {
      this.tag_name = data.tag_name;
      this.min_hit = data.min_hit;
      this.max_hit = data.max_hit;
      this.edit = index;
    },
  },
};
</script>

<style>
</style>