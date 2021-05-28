import { createStore } from 'vuex'
import actions from './actions.js'

const heroes_img_api = 'https://starwars-visualguide.com'

export default createStore({
  state: {
    pagination: {
      list_count: 6,
      count: 6,
      now: 1,
      next: 2,
      prev: null
    },
    heroes: [],
    favorite: [],
    hero: {},
    _alert: {
      flag: false,
      message: null
    },
    expectation: false,
    filter_mode: 'none',
    search_result: []
  },
  mutations: {
    SET_PAGINATION(state, data) {
      state.pagination.next = data['prev']
      state.pagination.now = data['now']
      state.pagination.next = data['next']
    },

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
      console.log('ADD', data);

      let heroes = data.all_heroes
      heroes.push(data.hero)

      state.favorite.push(data.hero)

      heroes = JSON.stringify(heroes)
      localStorage.setItem('my_favorite_heroes', heroes)
    },

    REMOVE_FAVORITE(state, data) {
      console.log('REMOVE', data);

      let index = state.favorite.findIndex(favorite => favorite.id == data.hero.id)
      state.favorite.splice(index, 1)

      let heroes = JSON.stringify(state.favorite)
      localStorage.setItem('my_favorite_heroes', heroes)
    },

    SET_EXPECTATION(state, value) {
      state.expectation = value
    },

    SET_FILTER_MODE(state, mode) {
      state.filter_mode = {}

      switch (mode) {
        case 'female':
          state.filter_mode['home'] = state.heroes.filter(hero => hero.gender == 'female')
          state.filter_mode['favorite'] = state.favorite.filter(hero => hero.gender == 'female')
          break;
        case 'male':
          state.filter_mode['home'] = state.heroes.filter(hero => hero.gender == 'male')
          state.filter_mode['favorite'] = state.favorite.filter(hero => hero.gender == 'male')
          break;
        default:
          state.filter_mode = 'none'
          break;
      }
    }
  },
  actions
})
