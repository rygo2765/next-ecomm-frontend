import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public'
import {writable} from 'svelte/store'

//change user login status in local storage
export const isLoggedIn = writable(false)

//log users out and empties token 
export function logOut(){
  isLoggedIn.set(false)
  localStorage.removeItem('auth')
  return true
}

//get token from local storage
export function getTokenFromLocalStorage(){
  const auth = localStorage.getItem('auth')
  if (auth){
    return JSON.parse(auth)['token']
  }
  return null
}

//check if token is in local storage
export async function checkLoggedIn(){
  if (!getTokenFromLocalStorage()){
    return false
  }

  console.log(1)
  try{
    const token = getTokenFromLocalStorage()
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth-refresh',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(2)
    const res = await resp.json()

    if (resp.status == 200){
      localStorage.setItem("auth", JSON.stringify({
       "token": res.accessToken  
    }))

    isLoggedIn.set(true)
  }

  return false
  
} catch(err){
  console.log(err)
  return false
}
// const auth = localStorage.getItem('auth')
  // if (auth){
  //   isLoggedIn.set(true)
  //   return true
  // }
  // isLoggedIn.set(false)
  // return null
}

//Authenticate user
export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/auth',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  )

  const res = await resp.json();
  console.log(res)

  if (resp.status==200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.accessToken  
    }))

    isLoggedIn.set(true)

    return{
      success: true,
      res: res
    }
  }

  return {
    success: false,
    res:res
  }
}
