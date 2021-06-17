<template>
  <div class="krym-content">
    <div class="top">
      <router-link class="closeIt" to="/">закрыть</router-link>
    </div>
    <h2>Гостиница {{ $route.params.id }}</h2>
    <!-- <h2>Проверка: {{ pik }}</h2> -->
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem nihil odit mollitia iusto quia unde dignissimos enim, voluptatibus optio repellat, possimus alias veniam sint non! Error doloremque praesentium itaque.</p>

  </div>
</template>

<script>
export default{
  data(){
    return{
      pik: ''
    }
  },
  created(){
    this.pik = this.$route.params.id
  }
}
</script>

<style>
.krym-content{
    max-width: 700px;
    outline: 100vh solid rgb(0 0 0 / 80%);
    border-radius: 9rem;
    padding: 1rem;
    margin: 1rem;
}
.closeIt{
    background: #ff5722;
    text-decoration: none;
    color: #fff;
    padding: .5rem 1rem;
    font-size: 17px;
}
</style>