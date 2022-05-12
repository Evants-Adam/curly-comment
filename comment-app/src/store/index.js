import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: 'http://localhost:3000',
    comments: [],
    userProfile: {},
    preLoaderState: false,
    commentToEdit: []
  },
  getters: {
  },
  mutations: {
    SET_COMMENTS (state, payload) {
      state.comments = payload
    },
    SET_USER_PROFILE (state, payload) {
      state.userProfile = payload
    },
    SET_PRELOADER_STATE (state, payload) {
      state.preLoaderState = payload
    },
    SET_COMMENT_TO_EDIT (state, payload) {
      state.commentToEdit = payload
    }
  },
  actions: {
    async getUserProfile (context) {
      return fetch(`${this.state.serverUrl}/user`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_USER_PROFILE', data)
        })
        .catch((error) => console.log(error))
    },
    async signInSubmit (_, userCredentials) {
      return fetch(`${this.state.serverUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    async registerSubmit (_, newUserCredentials) {
      return fetch(`${this.state.serverUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    async postComment (context, data) {
      return fetch(`${this.state.serverUrl}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          context.dispatch('getAllComments')
          return data
        })
        .catch((error) => console.log(error))
    },
    async getAllComments (context) {
      return fetch(`${this.state.serverUrl}/comments`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_COMMENTS', data)
        })
    },
    async deleteComment (context, id) {
      return fetch(`${this.state.serverUrl}/comments/${id.toString()}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.dispatch('getAllComments')
          return data
        })
        .catch((error) => console.log(error))
    },
    async getOneComment (context, id) {
      return fetch(`${this.state.serverUrl}/comments/${id.toString()}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_COMMENT_TO_EDIT', data)
          return true
        })
        .catch((error) => console.log(error))
    },
    async editComment (context, data) {
      return fetch(`${this.state.serverUrl}/comments/${data.id.toString()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          return data
        })
        .catch((error) => console.log(error))
    },
    signOutSubmit (context) {
      context.commit('SET_PRELOADER_STATE', true)
      return localStorage.removeItem('access_token')
    }
  },
  modules: {
  }
})
