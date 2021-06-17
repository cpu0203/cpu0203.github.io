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
        <span class="xx" @click="justClose">&#10006;</span>
        <div
          v-html="theHtl2.content.rendered"
        ></div>
      </div>
    </transition>



  </div>
</template>

<script>
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
        console.log(this.showContent)
        this.showContent = true
      }
    },

    justClose(){
      this.showContent = false
    }

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
  left: 2rem;
  right: 2rem;
  top: 3rem;
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
  right: 1rem;
  cursor: pointer;
}
.htl-content img{
  display: inline-block;
  width: 31%;
  border-radius: 4px;
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
