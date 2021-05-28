<template>
  <div class="wrap-card">
    <br>
    <i class="fas fa-heart absolute remove favorit" @click="() => {remove_favorite()}" v-if="isfavorit"></i>
    <i class="fas fa-heart absolute add favorit" @click="() => (add_favorite())" v-else></i>
    <a class="card text-dark" style="width: 17rem;">
      <img :src="data.img" class="card-img-top" :alt="data.img">
      <div class="card-body">
        <h5 class="card-title">{{ data.name }}</h5>
        <hr>
        Home World:
        <ul>
          <li v-for="(value, name) in world" :key="name">{{name}}: {{value}}</li>
        </ul>
      </div>
    </a>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Card',

  data: () => ({
    isfavorit: false,
    world: {
      name: '',
      terrain: ''
    }
  }),

  computed: {
    ...mapState(['favorite', 'updatecards']),
    homeworlds_list() {
      this.$store.state.homeworlds_list.forEach(item => {
        if (item.people_id === this.data.id) {
          this.world = item.world
          return false;
        }
      })
      return this.$store.state.homeworlds_list
    }
  },

  created() {
    this.favorite.forEach(item => {
      if (item.id === this.data.id) {
        this.isfavorit = true
        return false;
      }
    })

    let data = {
      'people_id': this.data.id,
      'planet_id': this.data.homeworld.split('/')[this.data.homeworld.split('/').length-2]
    }
    this.$store.dispatch('getHomeWorld', data)

    setTimeout(() => {
      this.homeworlds_list.forEach(item => {
        if (item.people_id === this.data.id) {
          this.world = item.world
          return false;
        }
      })
    }, 2000)
  },

  updated() {
    setTimeout(() => {
      this.homeworlds_list.forEach(item => {
        if (item.people_id === this.data.id) {
          this.world = item.world
          return false;
        }
      })
    }, 2000)
  },

  mounted() {
    this.UpdateCard()
  },

  methods: {
    UpdateCard() {
      this.homeworlds_list.forEach(item => {
        if (item.people_id === this.data.id) {
          this.world = item.world
          return false;
        }
      })
    },

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
