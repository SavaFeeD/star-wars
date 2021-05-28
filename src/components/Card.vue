<template>
  <div class="wrap-card">
    <br>
    <i class="fas fa-heart absolute remove favorit" @click="() => {remove_favorite()}" v-if="isfavorit"></i>
    <i class="fas fa-heart absolute add favorit" @click="() => (add_favorite())" v-else></i>
    <router-link :to="{ name: 'Hero', params: { people_id: data.id } }" class="card text-dark" style="width: 17rem;">
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
    ...mapState(['favorite']),

  },

  created() {
    this.favorite.forEach(item => {
      if (item.id === this.data.id) {
        this.isfavorit = true
        return false;
      }
    })
  },

  methods: {
    add_favorite() {
      let data = {
        'hero': Object.assign({}, this.data)
      }
      this.$store.dispatch('addFavorite', data)
      this.isfavorit = true
    },
    remove_favorite() {
      let data = {
        'hero': Object.assign({}, this.data)
      }
      this.$store.dispatch('removeFavorite', data)
      this.isfavorit = false
    }
  //
  //   checkFavorite() {
  //     setTimeout(() => {
  //       if (this.expectation) {
  //         this.$store.dispatch('getFavorite');
  //         this.favorite.forEach(item => {
  //           if (item.id+'' === this.data.id+'') {
  //             this.isfavorit = ! this.isfavorit
  //             console.log(this.isfavorit)
  //             return false;
  //           }
  //         })
  //       } else {
  //         this.checkFavorite()
  //       }
  //     }, 150)
  //   }
  },

  props: {
    data: Object
  }
}
</script>

<style scoped>
.wrap-card{
  position: relative;
  margin: 30px 20px 0 0;
}
.card{
  position: relative;
}
.absolute{
  position: absolute;
  z-index: 100000;
}
a:hover{
  color: #343a40!important;
  text-decoration: none;
}
.favorit{
  top: 15px;
  right: 15px;
  font-size: 25px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  cursor: pointer;
}
.add{
  color: #343a40;
}
.remove{
  color: #ff2d2d;
}
</style>
