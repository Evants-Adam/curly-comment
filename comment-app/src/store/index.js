import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
      return axios({
        method: 'GET',
        url: `${this.state.serverUrl}/user`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          context.commit('SET_USER_PROFILE', response.data)
        })
        .catch((error) => console.log(error))
    },
    async signInSubmit (_, userCredentials) {
      return axios({
        method: 'POST',
        url: `${this.state.serverUrl}/login`,
        data: userCredentials
      })
    },
    async registerSubmit (_, newUserCredentials) {
      return axios({
        method: 'POST',
        url: `${this.state.serverUrl}/register`,
        data: newUserCredentials
      })
    },
    async postComment (context, data) {
      return axios({
        method: 'POST',
        url: `${this.state.serverUrl}/comments`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: data
      })
        .then((data) => {
          context.dispatch('getAllComments')
          return true
        })
        .catch((error) => {
          return error
        })
    },
    async getAllComments (context) {
      return axios({
        method: 'GET',
        url: `${this.state.serverUrl}/comments`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          context.commit('SET_COMMENTS', response.data)
        })
    },
    async deleteComment (context, id) {
      return axios({
        method: 'DELETE',
        url: `${this.state.serverUrl}/comments/${id.toString()}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    async getOneComment (context, id) {
      return axios({
        method: 'GET',
        url: `${this.state.serverUrl}/comments/${id.toString()}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          context.commit('SET_COMMENT_TO_EDIT', response.data)
          return true
        })
    },
    async editComment (_, data) {
      return axios({
        method: 'PUT',
        url: `${this.state.serverUrl}/comments/${data.id.toString()}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: data
      })
    },
    signOutSubmit (context) {
      context.commit('SET_PRELOADER_STATE', true)
      return localStorage.removeItem('access_token')
    }
  },
  modules: {
  }
})
