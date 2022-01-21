import Vue from 'vue'
import Vuex from 'vuex'
import Route from '@/router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: { User_Id: null, User_Name: null, User_auth: [], User_token: null },
    login_err: false,
    login_success: false,
    SurveyList: [],
    Survey: { title: '', disc: '', questions: [] },
  },
  mutations: {
    LOGIN_USER(state, data) {
      state.Userinfo.User_Id = data.username
      state.Userinfo.User_Name = data.name
      state.Userinfo.User_auth = data.roles
      state.Userinfo.User_token = data.token

      state.login_success = true
      state.login_err = false
      Route.push("/user")
    },
    Logout(state) {
      state.Userinfo.User_Id = null
      state.Userinfo.User_Name = null
      state.Userinfo.User_auth = null
      state.Userinfo.User_token = null
      state.login_err = false
      state.login_success = false
      localStorage.removeItem("token")
      console.log("로그아웃?" + localStorage.getItem("token"))
      Route.push("/")
    },
    INSERT_TOKEN(state) {
      state.Userinfo.User_token = localStorage.getItem("token")
    },
    SET_USER_REFRESH(state, data) {
      state.Userinfo.User_Id = data.username
      state.Userinfo.User_Name = data.name
      state.Userinfo.User_auth = data.roles

      state.login_success = true
      state.login_err = false
    },
    GET_SURVEYLIST(state, data) {
      state.SurveyList = data
    },
    updateAnswer(state, data) {
      state.Survey.questions[data.qindex].answers[data.index].answer = data.value
    },
    updateQuestion(state, data) {
      state.Survey.questions[data.index].q = data.value
    },
    updateTitle(state, data) {
      state.Survey.title = data
    },
    updateDisc(state, data) {
      state.Survey.disc = data
    },
    updateOptions(state, data) {
      state.Survey.questions[data.index].answers = data.value
    },

  },
  actions: {

    LoginUser({ commit }, payload) {
      return new Promise((resolve, reject) =>
        axios.post('http://localhost:9010/api/public/signin', payload)
          .then(Response => {
            console.log(Response.data)
            if (Response.data.username != null) {
              axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data.token}`
              localStorage.setItem("token", Response.data.token)
              commit('LOGIN_USER', Response.data)
            }
          })
          .catch(Error => {
            console.log('login_error')
            reject(Error)
            alert("아이디와 비밀번호를 확인해주세요.")
          })
      )
    },
    NewUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/public/signup', payload)
          .then(Response => {
            if (Response.data === "success") {
              Route.push("/login")
            }
          })
          .catch(Error => {
            console.log('newuser-error')
            reject(Error)
            alert("중복된 아이디가 있습니다.")
            Route.push("/signup")
          })
      })
    },
    UnpackToken({ commit }) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        axios.get('http://localhost:9010/api/public/unpackToken')
          .then(Response => {
            commit('SET_USER_REFRESH', Response.data)
          })
          .catch(Error => {
            reject(Error)
            alert("로그인 유효시간이 만료되었습니다.")
            console.log('unpackToken_error')
          })
      })
    },
    CreateSurvey({ commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        // axios.post('http://localhost:9010/api/auth/survey')
        //   .then(Response => {
        //     commit('GET_SURVEYLIST', Response.data)
        //   })
        //   .catch(Error => {
        //     reject(Error)
        //     console.log('CreateSurvey_error')
        //   })
      })
    },
    getSurveyList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:9010/api/public/surveylist')
          .then(Response => {
            commit('GET_SURVEYLIST', Response.data)
          })
          .catch(Error => {
            console.log('getSurveyList_error')
          })
      })
    }
  },
  modules: {
  }
})
