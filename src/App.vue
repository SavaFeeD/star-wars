<template>
  <div class="home">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link" active="active">HOME</router-link>
          </li>
          <li class="nav-item ml-3">
            <router-link :to="{ name: 'Favorite' }" class="nav-link" active="active">FAVORITE HEROES</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">

      <div class="row mb-5">
        <div class="col-2">
          <div class="sticky-top sidebar">
            <h5>Filter</h5>
            <select class="form-control" v-model="filter">
              <option selected value="none">None</option>
              <option value="female">Female Heroes</option>
              <option value="male">Male Heroes</option>
            </select>
          </div>
        </div>

        <div class="col-10">

          <div class="w-100 d-flex justify-content-between align-items-end">
            <div class="search-wrap ml-4">
              <input type="text" name="search" @click="() => {search_open = true}" v-model="search" autocomplete="off" class="form-control search" placeholder="Search by name . . .">
              <div class="modal-search d-flex flex-wrap justify-content-center" v-if="search_open">
                <span class="close" @click="() => {search_open = false}">X</span>
                <Card v-for="(hero_, id) in searchHandler" :data="hero_" :key="id"/>
              </div>
            </div>
            <Pagination/>
          </div>

          <router-view/>

          <div class="w-100 d-flex justify-content-between mb-5">
            <div></div>
            <Pagination/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'App',

  data: () => ({
    search_open: false,
    search: '',
    filter: 'none'
  }),

  computed: {
    ...mapState(['pagination', 'search_result']),
    searchHandler() {
      let data = {
        'people_name': this.search
      }
      this.$store.dispatch('searchPeople', data)
      return this.search_result;
    }
  },

  created() {
    this.$store.dispatch('checkLocalFavorite')

    let data = {
      'page_number': this.pagination.now
    }
    this.$store.dispatch('getHeroesPage', data)
  },

  updated() {
    this.$store.dispatch('setFilterMode', this.filter)
  },

  components: {
    Pagination,
    Card
  }
}
</script>

<style>
.sidebar{
  top: 25px;
  margin-top: 30px;
}
.min-w{
  min-height: 85vh!important;
}
.search-wrap{
  position: relative;
}
.modal-search{
  margin-top: 30px;
  position: absolute;
  bottom: -100;
  left: -45%;
  z-index: 100000000;
  background: #fff;
  width: 1200px;
  padding: 0 0 50px 0;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  border-radius: 10px;
}
.close{
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
}
.search{
  width: 35rem;
}
</style>
