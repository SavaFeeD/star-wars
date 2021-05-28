<template>
  <div class="home">
    <div class="d-flex flex-wrap justify-content-center" v-if="filter_mode == 'none'">
      <Card v-for="(hero_, id) in heroes" :data="hero_" :key="id"/>
    </div>
    <div class="d-flex flex-wrap justify-content-center" v-else>
      <Card v-for="(hero_, id) in filter_mode" :data="hero_" :key="id"/>
    </div>

    <Pagination :selected_page="1" />

  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',

  data: () => ({

  }),

  computed: {
    ...mapState(['heroes', 'pagination', 'filter_mode']),
  },

  created() {
    let data = {
      'page_number': this.pagination.now
    }
    this.$store.dispatch('getHeroesPage', data)
  },

  components: {
    Card,
    Pagination
  }
}
</script>

<style scoped>

</style>
