<template>
  <div 
    :class="[{short: isClicked}, 'hotel-card']"
    @click="isClicked = !isClicked"
  >
    <span
      class="hc-close"
      @click="$emit('doIsOpen', false)"
    >&#10006;</span>
    <h2 v-html="theHtl2.title.rendered"></h2>
    <h4>
      Трехэтажный гостевой дом «Селена», находится в живописном районе
      курортного поселка.
    </h4>
    <div
      v-html="theHtl2.content.rendered"
    ></div>
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
      isClicked: true
    }
  },

  props:['theHtl2'],

  methods: {
    stl() {
      this.short.height = "30%";
      this.short.transition = "all .5s";
    },
    
  }
}
</script>

<style>
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
  text-align: center;
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