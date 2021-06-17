import Vue from 'vue'
import Vuex from 'vuex'
import { getPics, MyLoop } from './fns'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    krymTM: []
  },
  mutations: {

    UPDATEPOSTS(state, pl){
      state.krymTM = pl
    }
  },
  actions: {

    FETCHPOSTS2({commit}, mth){
      MyLoop().then(data => {
        // вытащим записи крыма - 20
        const krymTours = data.filter(t => {
          return t.categories.includes(20) // only krym category
        })

        // вытащим записи нужного месяца mth
        const tsFiltered = krymTours.filter(item => {
          return item.categories.includes(mth)
        })
        return tsFiltered
      })
      .then(data => {
        let arr = []

        for (let oneTour of data){
          getPics(oneTour.featured_media)
          .then(onePic => {
            oneTour.dayData = onePic.dayData
            oneTour.imgsrc = onePic.guid
            oneTour.mOnth = mth
            arr.push(oneTour)
          })
        }
        commit('UPDATEPOSTS', arr)
      })
    }
  },
  
  getters: {
    krymTM(state){
      return state.krymTM
    }
  }
})
