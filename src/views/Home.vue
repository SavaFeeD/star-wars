<template>
  <div class="home d-flex flex-wrap justify-content-center">
    <Card v-for="(hero_, id) in heroes" :data="hero_" :key="id"/>
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
    ...mapState(['heroes', 'pagination'])
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
