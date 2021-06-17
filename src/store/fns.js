

export function getPics(nmb){
  return new Promise((resolve, reject) => {
    fetch('https://fenikstour.ru/feniks-rest/wp-json/wp/v2/media/' + nmb)
      .then(ans => ans.json())
      .then(pics => {
        const filteredMedia = {
          id: pics.id,
          dayData: pics.title.rendered,
          guid: pics.source_url
        }
        resolve(filteredMedia)
      })
      .catch(err => reject(err))
  })
}

let pageNm = 1
export let posts = []

async function gettingAll() {
  try{
    const req = await fetch('https://fenikstour.ru/feniks-rest/wp-json/wp/v2/posts?page=' + pageNm)
    const ans = await req.json()
    if(ans.length === 10){
      pageNm++
    }
    posts.push(...ans)

    // возвращаем длину массива для реализации лупера
    return ans.length
  }
  catch(e){console.log(e)}
}

export async function MyLoop(){
  for(;;){
     const allPosts = await gettingAll()
    if(allPosts < 10) break
  }
  let posts2 = []
  posts2 = posts
  pageNm = 1
  posts = []

  return posts2
}

