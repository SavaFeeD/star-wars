<template>
  <div class="favorite">
    <Card v-for="(hero_, id) in favorite" :data="hero_" :key="id"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'

export default {
  name: 'Favorite',

  data: () => ({

  }),

  computed: {
    ...mapState(['favorite'])
  },

  components: {
    Card
  }
}
</script>

<style scoped>

</style>
