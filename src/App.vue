<template>
  <div id="kalendar">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->

    <!-- <getallposts /> -->

    <formorder 
    v-if="startForm"
    :chosenDate="chosenDate"
    @rre="closeForm2"
    @keydown.esc="test"
     />

    <hotellist
    @theHtl="theHtl"
     />

    <transition name="booma">
      <hotelcard
      v-if="isOpen"
      :theHtl2="theHtl2"
      @doIsOpen="doIsOpen"
      />
    </transition>

    

    <kalendarfilter
    @toOrderBtn="toOrderBtn"
     />

  </div>
</template>

<script>
import hotellist from '@/components/hotel-list'
import hotelcard from '@/components/hotel-card'
import kalendarfilter from '@/components/kalendar-filter'
import formorder from '@/components/formorder'

// function test03(){
//   document.addEventListener('DOMContentLoaded', ()=>{
//     let hg = document.querySelector('h2')
//     // let hg = document.querySelectorAll('.one-line')
//     console.log(hg)
//   })
// }
// test03()


export default {
  name: 'app',
  components: {
    hotellist, kalendarfilter, formorder, hotelcard
  },
  data(){
    return{
      startForm: false,
      chosenDate: {},
      theHtl2: null,
      isOpen: false
    }
  },
  methods:{
    toOrderBtn(pl){
      this.startForm = true
      this.chosenDate = pl
    },

    closeForm2(pl){
      this.startForm = pl
    },

    theHtl(pl){
      this.theHtl2 = pl
      this.isOpen = true
      // this.isOpen = !this.isOpen
    },
    doIsOpen(pl){
      this.isOpen = pl
    }
  },
  mounted() {
    // Close modal with 'esc' key
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.startForm = false
        }
    });
},
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#kalendar{
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.booma-enter-active,
.booma-leave-active{
  transition: transform .5s;
}
.booma-enter,
.booma-leave-to{
  /* opacity: 0; */
transform: translateX(150vw)
}
</style>
