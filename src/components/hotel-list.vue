<template>
  <div class="hotel-list">

    <loading
      v-if="!stuff2.length"
    />

    <div class="hotels-top">
      <h4>В поездке мы предлагаем вам размещение в номере любой из предоставленных гостиниц</h4>

      <!-- <hotelbox v-if="showHT" /> -->

      <hotelcard
        v-for="theHtl of stuff2"
        :key="theHtl.modified"
        :theHtl2="theHtl"
      />
    </div>
  </div>
</template>

<script>
import hotelbox from './hotelbox'
import loading from './loading'
import hotelcard from './hotel-card'

export default {
  name: 'hotel-list',
  components:{
    hotelbox, loading, hotelcard
  },
  data(){
    return{
      pageNm: 1,
      posts: [],
      showHT: true,
      pageNm: 1,
      stuff: [],
      stuff2: []
    }
  },
  methods:{
    clicked(){
      this.showHT = true
    },

    async getAllPosts() {
      try{
        const req = await fetch('https://fenikstour.ru/feniks-rest/wp-json/wp/v2/posts?page=' + this.pageNm)
        const ans = await req.json()
        if(ans.length === 10){
          this.pageNm++
        }
        this.stuff.push(...ans)

        // возвращаем длину массива для реализации лупера
        return ans.length
      }
      catch(e){console.log(e)}
    },

    async MyLoop(){
      for(;;){
        const allPosts = await this.getAllPosts()
        if(allPosts !== 10) break
      }
      let posts2 = []
      posts2 = await this.stuff
      this.pageNm = 1
      this.stuff = []

      const filteredHotels = posts2.filter(it => {
        return it.categories.includes(21) // только отели крым
      })

      // ...для каждого картинку...

      let greenBox = []
        for(let i of filteredHotels){
          if(i.featured_media !== 0){
            const rt = await this.addPics(i.featured_media)
            i.imgRef = await rt.guid
          }
          greenBox.push(i)
        }
          this.stuff2 = greenBox
          return greenBox
    },

    async addPics(nmb){
      try{
        const qry = await fetch('https://fenikstour.ru/feniks-rest/wp-json/wp/v2/media/' + nmb)
        const pics = await qry.json()
        const filteredMedia = {
          id: pics.id,
          // dayData: pics.title.rendered,
          guid: pics.source_url
        }
        return filteredMedia

      }
      catch(e){console.log(e)}
    }
  },
  mounted(){
    this.MyLoop()
  }
}
</script>

<style>
.hotel-list{
  text-align: left;
}
.hotels-top{
  max-width: 800px;
  border: 1px solid #c3c3c3;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 5px;
}
.hotels-top ul{
  list-style-type: circle;
}
.hotels-top ul li{
  cursor: pointer;
}
.hotels-top ul li:hover{
  color: red;
}
</style>
