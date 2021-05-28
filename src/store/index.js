import { createStore } from 'vuex'
import actions from './actions.js'

const heroes_img_api = 'https://starwars-visualguide.com'

export default createStore({
  state: {
    pagination: {
      count_heroes_on_page: 4,
      count_page: 7,
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
      state.pagination.now = data['now']
      state.pagination.next = data['next']
      state.pagination.prev = data['prev']
      state.pagination.count_heroes_on_page = data['count_heroes_on_page']
      state.pagination.count_page = data['count_page']
    },

    SET_STATE(state, data) {
      state[data[0]] = data[1]
    },

    SET_HEROES(state, data) {
      data.forEach((people) => {
        let id = +people.url.split('/')[people.url.split('/').length-2]
        people['id'] = id
        people['img'] = `${heroes_img_api}/assets/img/characters/${id}.jpg`
      });
      console.log(data);
      state.heroes = data
    },

    SET_SEARCH_RESULT(state, data) {
      data.forEach((people) => {
        let id = +people.url.split('/')[people.url.split('/').length-2]
        people['id'] = id
        people['img'] = `${heroes_img_api}/assets/img/characters/${id}.jpg`
      });
      console.log(data);
      state.search_result = data
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
        case 'none':
          state.filter_mode = 'none'
          break;
        default:
          state.filter_mode['home'] = state.heroes.filter(hero => hero.gender != 'male' && hero.gender != 'female')
          state.filter_mode['favorite'] = state.favorite.filter(hero => hero.gender != 'male' && hero.gender != 'female')
          break;
      }
    }
  },
  actions
})
