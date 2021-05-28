import { createStore } from 'vuex'
import actions from './actions.js'

const heroes_img_api = 'https://starwars-visualguide.com'

export default createStore({
  state: {
    pagination: {
      now: 1,
      next: 2
    },
    heroes: [],
    favorite: [],
    hero: {},
    _alert: {
      flag: false,
      message: null
    },
    expectation: false
  },
  mutations: {
    SET_HERO(state, data) {
      console.log(data);

      state[data[0]] = data[1]
    },

    SET_HEROES(state, data) {
      console.log(data);

      data.forEach((people, people_id) => {
        people['id'] = people_id
        people['img'] = `${heroes_img_api}/assets/img/characters/${people_id+1}.jpg`
      });
      state.heroes = data
    },

    SET_ALERT(state, data) {
      console.log(data);

      state._alert = {
        flag: true,
        message: data
      }
    },

    ADD_FAVORITE(state, data) {
      console.log(data);

      let heroes = data.all_heroes
      heroes.push(data.hero)

      state.favorite = heroes

      heroes = JSON.stringify(heroes)
      localStorage.setItem('my_favorite_heroes', heroes)

      state.expectation = true
    }
  },
  actions
})
