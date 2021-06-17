<template>
  <div class="kalendar-filter">

    <div class="form-wrapper">
      <form @submit.prevent="handler">
      <input 
        type="date"
        v-model="date"
      >
      <!-- <button type="submit">посмотреть</button> -->
    </form>
    </div>

    <div class="indikator">
      <p v-if="!date && !krymTM.length">Выберите дату поездки</p>
      <p v-if="date && !krymTM.length">На эту дату туров нет</p>

      {{callAction}}
    </div>

      <div class="krym-pre-cards">
        <KrymPreCard 
          v-for="oneT in showF"
          :key="oneT.modified"
          :theCard="oneT"
          @toOrderBtn="toOrderBtn"
        ></KrymPreCard>
      </div>
    
  </div>
</template>

<script>
import KrymPreCard from './krym-pre-card'
import {mapGetters} from 'vuex'

export default {
name: 'kalendar',
components:{
  KrymPreCard
},
data(){
  return{
    // date: '2021-06-03',
    date: '',
    isTours: false,
    isDate: false,
    toShow: 4,
    mm: [
        {name: 'январь', name2: 'января', id: 17, toShow: '01'},
        {name: 'февраль', name2: 'февраля', id: 18, toShow: '02'},
        {name: 'март', name2: 'марта', id: 19, toShow: '03'},
        {name: 'апрель', name2: 'апреля', id: 4, toShow: '04'},
        {name: 'май', name2: 'мая', id: 6, toShow: '05'},
        {name: 'июнь', name2: 'июня', id: 10, toShow: '06'},
        {name: 'июль', name2: 'июля', id: 11, toShow: '07'},
        {name: 'август', name2: 'августа', id: 12, toShow: '08'},
        {name: 'сентябрь', name2: 'сентября', id: 13, toShow: '09'},
        {name: 'октябрь', name2: 'октября', id: 14, toShow: '10'},
        {name: 'ноябрь', name2: 'ноября', id: 15, toShow: '11'},
        {name: 'декабрь', name2: 'декабря', id: 16, toShow: '12'}
      ]
  }
},

computed:{
  ...mapGetters(['krymTM']),

  callAction(){
    if(this.date){
        const date = new Date(this.date)
        this.$store.dispatch('FETCHPOSTS2', this.mm[date.getMonth()].id)
      }
  },

  showF(){// show from chosen date

    // filter for our data at first
    const uiw = this.krymTM.filter(t => {
      const dataTura = +t.dayData.split('-')[0]
      const date = new Date(this.date)

      if(dataTura >= date.getDate()){
        return t
      }
    })

    // lets make package with what we need datas
    const chosenTours = uiw.map(k => {
      return {
        id: k.id,
        dataTura: +k.dayData.split('-')[0],
        slug: k.slug,
        mth: this.mm.filter(m => {
          return m.id === k.mOnth
        })[0].name2,
        startDay: k.dayData,
        img: k.imgsrc,
        title: k.title.rendered,
        content: k.content.rendered
      }
    })
    // return chosen Tours by data
    const sortedTours = chosenTours.sort((a, b) => {
      return a.dataTura - b.dataTura
    })
    return sortedTours.slice(0, this.toShow)
  }
},

methods:{
  handler(){
      const date2 = new Date(this.date)

      if(this.date){
        this.$store.dispatch('FETCHPOSTS2', this.mm[date2.getMonth()].id)
      }

    if(this.date && !this.krymTM){
      this.isTours = true
    }
    this.isDate = true
  },
  toOrderBtn(pl){
    // console.log(pl)
    this.$emit('toOrderBtn', pl)
  }
}
}
</script>

<style>
.form-wrapper{
  display: block;
  background: #2579bf;
  color: #fff;
  text-align: center;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 5px 5px rgb(0 0 0 / 30%);
  border-radius: 5px;
}
.form-wrapper [type="date"], .form-wrapper button{
  font-size: 17px;
  padding: .5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.form-wrapper button{
  margin-left: .5rem;
  background: #41a6f7;
  color: #fff;
  transition: all .5s;
}
.form-wrapper button:hover{
  background: #266190;
}
.krym-pre-cards{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.krym-pre-cards >*{
  flex: 0 1 335px;
}
.indikator{
  text-align: center;
}
</style>