export default async (url, params)=>{
  try{
    let response = await fetch(url, params)
  }catch (e) {
    console.error(e)
  }
}