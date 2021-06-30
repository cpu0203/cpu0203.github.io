<template>
  <div class="one-line"
    @click="showHtlCard"
  >
    <!-- <span
      class="hc-close"
      @click="$emit('doIsOpen', false)"
    >&#10006;</span> -->

    

    <h2 v-html="theHtl2.title.rendered"></h2>

    <transition name="appear">
      <div class="htl-content" v-if="showContent">
        <div class="xx">
          <span @click="justClose">&#10006;</span>
          <!-- <span @click="justClose">&#8679;</span> -->
          <!-- <span @click="justClose">&#8679;</span> -->
        </div>

        <div 
          class="imgs_box"
          v-if="showContent"
        >
        </div>

        <div
          v-html="theHtl2.content.rendered"
        ></div>
      </div>
    </transition>



  </div>
</template>

<script>
import {picFromDOM2} from '@/fns'

export default {
  data() {
    return {
      short: {
        height: "",
        overflow: "",
        transition: "all .5s",
      },
      anm: false,
      isClicked: true,
      showContent: false
    }
  },

  props:['theHtl2'],

  methods: {
    stl() {
      this.short.height = "30%";
      this.short.transition = "all .5s";
    },

    showHtlCard(e){
      if(e.target.tagName == 'H2' && this.showContent !== true){
        this.showContent = true
        picFromDOM2()
      }
    },

    justClose(){
      this.showContent = false
    },

    picFromDOM2() {
      this.$nextTick(() => {
        const imgsBox = document.querySelector('.imgs_box')
        let picsNode = document.querySelectorAll('img')

        console.log(picsNode)

        if(picsNode.length > 0){
          for(let val of picsNode){
            imgsBox.append(val)
            val.removeAttribute('width')
            val.removeAttribute('height')
            val.removeAttribute('sizes')
            val.classList.remove('wp-image-359')
          }
        }
      })
    },

  }
}
</script>

<style>
.one-line h2{
  cursor: pointer;
  font-size: 1rem;
  font-weight: 100;
  margin: 0;
  padding: .5rem 0;
  position: relative;
}
.one-line h2:hover{
  color: red;
}
.one-line .htl-content{
  position: absolute;
  background: #f3edd7;
  padding: 1rem;
  border: 1px solid #b9b9b9;
  border-radius: 5px;
  z-index: 1;
  left: 1rem;
  right: 1rem;
  top: 1rem;
}
.tocls{
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
}
.one-line .xx{
  position: absolute;
  top: .5rem;
  right: -.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: #fff;
  align-items: center;
  padding: 3px;
  border-radius: 3px;
}
.one-line .xx >*{
  flex: 1 1 100%;
  font-size: 1.8rem;
}
.one-line .xx >*:nth-child(3){
  transform: rotate(0.5turn);
}

.imgs_box{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -1rem -1rem 2rem -1rem;
  background: #b5b09e;
  box-shadow: 0 5px 5px rgb(0 0 0 / 30%);
}
.imgs_box >*{
  flex: 1 1 100%;
  max-width: 33%;
  outline: 1px solid #d8d8d8;
  outline-offset: -8px;
}



.appear-enter-active,
.appear-leave-active{
  transition: .7s;
}
.appear-enter,
.appear-leave-to{
  transform: scale(0)
}





.hotel-card {
  border: 1px solid #b9b9b9;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.5s ease 0.5s;
  position: relative;
  cursor: pointer;
}
.short {
  box-sizing: border-box;
  height: 300px;
  overflow: hidden;
  position: absolute;
  background: #fff;
  z-index: 3;
}
.hotel-card h2 {
  font-size: 34px;
  color: #2579bf;
  margin: -1rem -1rem 1rem;
  line-height: 32px;
  background: #efefef;
  padding: 1.5rem;
  border-radius: inherit;
}
.hotel-card img {
  display: inline-block;
  width: 31%;
}
.second-container {
  position: absolute;
  height: 30%;
  background: aquamarine;
  width: 100%;
}
.hc-close{
  cursor: pointer;
  position: absolute;
  top: .5rem;
  right: .5rem;
}
</style>
