<template>
  <section class="pagination">
    <button type="button" v-for="i in count" :key="i">{{i}}</button>
    <hr>
    {{selected_page}}
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',

  data: () => ({
    count: []
  }),

  computed: {
    ...mapState(['pagination'])
  },

  created() {
    for (let i = 1; i <= this.pagination.count; i++) {
      this.count.push(i);
    }
  },

  props: {
    selected_page: Number
  }
}
</script>

<style scoped>
.wrap-card{
  position: relative;
  margin: 30px 60px 0 0;
}
.card{
  position: relative;
}
.absolute{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100000;
}
</style>
