<template>
  <div class="krym-pre-card">
    <h3 @click="toOrderBtn" class="date">
      {{ theCard.startDay }} {{ theCard.mth }}
    </h3>

    <div class="pic"
    :style="{backgroundImage: 'url('+ theCard.img +')'}"
    ></div>

    <div class="pre-card-bottom">
      <!-- <h3 class="title">
        {{ theCard.title }}
      </h3> -->

      <button class="pre-card-btn"
      @click="toOrderBtn">заказать</button>
    </div>
    
    
    
  </div>
</template>

<script>
export default {
props: [
  'theCard'
],
methods:{
  goToSee(){
    document.location.replace(`https://www.fenikstour.ru/touritem.php?k=${this.theCard.slug}`)
  },
  toOrderBtn(){
    // console.log(this.theCard.startDay)
    this.$emit('toOrderBtn', {startDay: this.theCard.startDay, mth: this.theCard.mth})
  }
}
}
</script>

<style>
.krym-pre-card{
  width: 500px;
  box-shadow: 0 5px 5px rgb(0 0 0 / 30%);
  border-radius: 5px;
  overflow: hidden;
  /* cursor: pointer; */
}
.krym-pre-card .date{
  cursor: pointer;
}
.krym-pre-card h3{
  text-align: center;
  color: #2579bf;
  margin: .5rem;
}
.krym-pre-card .pic{
  height: 180px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: block;
  margin: 0 -17px;
  transform: rotate(0deg);
  width: 106%;
  transition: all .7s;
}
.krym-pre-card:hover .pic{
  transform: rotate(2deg);
}
.pre-card-bottom{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pre-card-bottom .pre-card-btn{
  background: #2579bf;
  border: none;
  border-radius: 4px;
  padding: .1rem .5rem .2rem .5rem;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  margin: .2rem;
}
</style>