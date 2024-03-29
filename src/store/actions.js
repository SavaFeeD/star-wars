import axios from "axios"

const heroes_api = 'https://swapi.dev/api'


let actions = {
  checkLocalFavorite({commit}) {
    if (localStorage.getItem(`my_favorite_heroes`) == null) {
      localStorage.setItem('my_favorite_heroes', JSON.stringify([]))
    } else {
      commit('SET_STATE', ['favorite', JSON.parse(localStorage.getItem(`my_favorite_heroes`))]);
    }
  },

  getHeroesPage({commit}, data) {
    return axios.get(`${heroes_api}/people/?page=${data.page_number}`).then(res => {
      commit('SET_HEROES', res.data.results);
      commit('SET_PAGINATION', {
        'now': data.page_number,
        'next': (res.data.next != null) ? +res.data.next.split('=')[res.data.next.split('=').length-1] : null,
        'prev': (res.data.previous != null) ? +res.data.previous.split('=')[res.data.previous.split('=').length-1] : null,
        'count_heroes_on_page': res.data.results.length-1,
        'count_page': Math.round(res.data.count / res.data.results.length-1)
      });
    }).catch(error => {
      commit('SET_ALERT', error.response);
    })
  },

  getHomeWorld({commit}, data) {
    return axios.get(`${heroes_api}/planets/${data.planet_id}/`).then(res => {
      let homeworld = {
        'people_id': data.people_id,
        'world': {
          'name': res.data.name,
          'terrain': res.data.terrain
        }
      }
      commit('SET_HOMEWORDLS', homeworld);
    }).catch(error => {
      commit('SET_ALERT', error);
    })
  },

  getFavorite({commit}) {
    commit('SET_STATE', ['favorite', JSON.parse(localStorage.getItem(`my_favorite_heroes`))]);
  },

  addFavorite({commit}, data) {
    data['all_heroes'] = JSON.parse(localStorage.getItem(`my_favorite_heroes`))
    commit('ADD_FAVORITE', data);
    commit('SET_EXPECTATION', true);
  },

  removeFavorite({commit}, data) {
    data['all_heroes'] = JSON.parse(localStorage.getItem(`my_favorite_heroes`))
    commit('REMOVE_FAVORITE', data);
    commit('SET_EXPECTATION', true);
  },

  setFilterMode({commit}, mode) {
    commit('SET_FILTER_MODE', mode);
  },

  searchPeople({commit}, data) {
    return axios.get(`${heroes_api}/people/?search=${data.people_name}`).then(res => {
      commit('SET_SEARCH_RESULT', res.data.results);
    }).catch(error => {
      commit('SET_ALERT', error.response);
    })
  },

  voidProba({commit}) {
    commit('SET_HOMEWORDLS', [])
  }
}

export default actions
