import axios from "axios"

const heroes_api = 'https://swapi.dev/api'


let actions = {

  getHeroesPage({commit}, data) {
    axios.get(`${heroes_api}/people/?page=${data.page_number}`).then(res => {
      commit('SET_HEROES', res.data.results);
    }).catch(error => {
      commit('SET_ALERT', error.response);
    })
  },

  getHero({commit}, data) {
    axios.get(`${heroes_api}/people/${data.people_id}/`).then(res => {
      commit('SET_STATE', ['hero', res.data]);
    }).catch(error => {
      commit('SET_ALERT', error.response);
    })
  },

  getFavorite({commit}) {
    commit('SET_STATE', ['favorite', JSON.parse(localStorage.getItem(`my_favorite_heroes`))]);
  },

  addFavorite({commit}, data) {
    data['all_heroes'] = JSON.parse(localStorage.getItem(`my_favorite_heroes`))
    commit('ADD_FAVORITE', data);
  }
}

export default actions
