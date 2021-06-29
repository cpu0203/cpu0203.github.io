export function picFromDOM2() {
  // this.$nextTick(() => {

    setTimeout(()=>{
      const hotelCard = document.querySelector('.htl-content')
      const imgsBox = document.querySelector('.imgs_box')
      let picsNode = hotelCard.querySelectorAll('img')

      console.log(hotelCard.clientHeight)

      for(let val of picsNode){
        imgsBox.append(val)
        val.removeAttribute('width')
        val.removeAttribute('height')
        val.removeAttribute('sizes')
        val.classList.remove('wp-image-359')
      }
    }, 100)

    

    // console.log(picsNode)

    // if(picsNode.length > 0){

      

    // }
  // })
}