import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: window.localStorage.getItem('user') ? window.localStorage.getItem('user') : false,
        sliderShow: false
    },
    mutations: {
        changeLogin(state, val1) {
            console.log(val1)

            state.login = val1
        },
        changeSliderShow(state, val) {
            state.sliderShow = val
        }
    }
})