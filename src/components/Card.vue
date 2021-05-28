<template>
  <div class="wrap-card">
    <i class="far fa-heart absolute" v-if="isfavorit"></i>
    <i class="fas fa-heart absolute" else=""></i>
    <router-link :to="{ name: 'Hero', params: { people_id: data.id } }" class="card" style="width: 18rem;">
      <img :src="data.img" class="card-img-top" :alt="data.img">
      <div class="card-body">
        <h5 class="card-title">{{ data.name }}</h5>
      </div>
    </router-link>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Card',

  data: () => ({
    isfavorit: false
  }),

  computed: {
    ...mapState(['favorite'])
  },

  created() {
    this.favorite.forEach(item => {
      if (item.id == this.data.id)
        this.isfavorit = true
    })
  },

  props: {
    data: Object
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
  right: -10px
}
</style>
