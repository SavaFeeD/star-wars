<template>
  <div class="favorite">
    <div class="d-flex flex-wrap justify-content-center">
      <Card v-for="(hero_, id) in favorite" :data="hero_" :key="id"/>
    </div>

    <Pagination :selected_page="1" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import { mapState } from 'vuex'

export default {
  name: 'Favorite',

  data: () => ({

  }),

  computed: {
    ...mapState(['favorite'])
  },

  components: {
    Card,
    Pagination
  }
}
</script>

<style scoped>

</style>
