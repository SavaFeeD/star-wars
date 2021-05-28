<template>
  <div class="home min-w d-flex flex-column justify-content-between">

    <div>
      <div class="d-flex flex-wrap justify-content-center" v-if="filter_mode == 'none'">
        <Card v-for="(hero_, id) in heroes" :data="hero_" :key="id"/>
      </div>
      <div class="d-flex flex-wrap justify-content-center" v-else>
        <Card v-for="(hero_, id) in filter_mode['home']" :data="hero_" :key="id"/>
      </div>
    </div>

  </div>
</template>

<script>
import Card from '@/components/Card.vue'
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
    Card
  }
}
</script>

<style scoped>

</style>
