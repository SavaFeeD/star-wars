import { createStore } from 'vuex'
import actions from './actions.js'

const heroes_img_api = 'https://starwars-visualguide.com'

export default createStore({
  state: {
    pagination: {
      now: 1,
      next: 2,
      count: 9
    },
    heroes: [],
    favorite: [],
    hero: {},
    _alert: {
      flag: false,
      message: null
    },
    expectation: false,
    filter_mode: 'none'
  },
  mutations: {
    SET_STATE(state, data) {
      state[data[0]] = data[1]
    },

    SET_HEROES(state, data) {
      data.forEach((people, people_id) => {
        people['id'] = people_id
        people['img'] = `${heroes_img_api}/assets/img/characters/${people_id+1}.jpg`
      });
      state.heroes = data
    },

    SET_ALERT(state, data) {
      state._alert = {
        flag: true,
        message: data
      }
    },

    ADD_FAVORITE(state, data) {
      let heroes = data.all_heroes
      heroes.push(data.hero)

      state.favorite.push(data.push)

      heroes = JSON.stringify(heroes)
      localStorage.setItem('my_favorite_heroes', heroes)

      state.expectation = true
    },
    
    SET_FILTER_MODE(state, mode) {
      switch (mode) {
        case 'female':
          state.filter_mode = state.heroes.filter(hero => hero.gender == 'female')
          break;
        case 'male':
          state.filter_mode = state.heroes.filter(hero => hero.gender == 'male')
          break;
        default:
          state.filter_mode = 'none'
          break;
      }
    }
  },
  actions
})
