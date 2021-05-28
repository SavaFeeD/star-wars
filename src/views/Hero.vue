<template>
  <div class="hero">
    <h1>This is an hero page</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Hero',

  data: () => ({

  }),

  computed: {
    ...mapState('hero')
  }
}
</script>

<style scoped>

</style>
