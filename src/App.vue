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
      <router-view/>
    </div>

  </div>
</template>

<style>

</style>
