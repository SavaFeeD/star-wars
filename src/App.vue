<template>
  <div class="home">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link" active="active">HOME</router-link>
            </li>
            <li class="nav-item ml-3">
              <router-link :to="{ name: 'Favorite' }" class="nav-link" active="active">FAVORITE HEROES</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
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
          <router-view/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    filter: 'none'
  }),

  created() {
    this.$store.dispatch('checkLocalFavorite')
  },
  updated() {
    this.$store.dispatch('setFilterMode', this.filter)
  }
}
</script>

<style>
.sidebar{
  top: 25px;
  margin-top: 30px;
}
</style>
