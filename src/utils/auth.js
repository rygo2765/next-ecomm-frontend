import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public'
import {writable} from 'svelte/store'


const emptyAuth={
  "token": "",
}

//change user login status in local storage
export const isLoggedIn = writable(false)

//log users out and empties token 
export function logOut(){
  isLoggedIn.set(false)
  localStorage.setItem("auth",JSON.stringify(emptyAuth))
  return true
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
