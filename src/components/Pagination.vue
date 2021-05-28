<template>
  <section class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" aria-label="Previous" v-if="pagination.prev != null" @click="() => {prev_page()}">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item"><button class="page-link" disabled v-if="pagination.prev != null">...</button></li>
        <li class="page-item"><button class="page-link" v-if="pagination.prev != null"  @click="() => {prev_page()}">{{pagination.prev}}</button></li>
        <li class="page-item active"><button class="page-link">{{pagination.now}}</button></li>
        <li class="page-item"><button class="page-link" v-if="pagination.next != null" @click="() => {next_page()}">{{pagination.next}}</button></li>
        <li class="page-item"><button class="page-link" disabled v-if="pagination.next != null">...</button></li>
        <li class="page-item">
          <button class="page-link" aria-label="Next" v-if="pagination.next != null" @click="() => {next_page()}">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',

  data: () => ({
  }),

  computed: {
    ...mapState(['pagination', 'favorite'])
  },

  methods: {
    prev_page() {
      let data = {
        'page_number': this.pagination.prev
      }
      this.$store.dispatch('getHeroesPage', data)
    },
    next_page() {
      let data = {
        'page_number': this.pagination.next
      }
      this.$store.dispatch('getHeroesPage', data)
    }
  },

  created() {
    let data = {
      'page_number': this.pagination.now
    }
    this.$store.dispatch('getHeroesPage', data)
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 30px;
  padding-right: 10px;
}
ul{
  margin: 0;
}
</style>
