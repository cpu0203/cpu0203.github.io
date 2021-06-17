<template>
  <div class="all-posts-box">
    <h1 @click="getting">Модуль на все посты / постранично</h1>
    <button @click="MyLoop">loop</button>
    <h2>страниц: {{ pageNm }}</h2>
    <h2>всего записей: {{ posts.length }}</h2>
    <p 
    v-for="p in posts"
    :key="p.id"
    >{{ p.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'allPostsBox',
  data(){
    return{
      pageNm: 1,
      posts: []
    }
  },

  methods:{
    async getting(){
      try{
        const req = await fetch('https://fenikstour.ru/feniks-rest/wp-json/wp/v2/posts?page=' + this.pageNm)
        const ans = await req.json()
        if(ans.length === 10){
          this.pageNm++
        }
        // здесь основная логика с полученными постами
        this.posts.push(...ans)

        // возвращаем длину для реализации лупера - обязательно ans, а не фильтации с ним
        return ans.length
      }
      catch(e){console.log(e)}
    },
    async MyLoop(){
      for(;;){
         const jjh = await this.getting()
        if(jjh < 10) break
      }
    }
  }

}
</script>

<style>

</style>