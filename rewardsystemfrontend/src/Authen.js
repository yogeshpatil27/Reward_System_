import { getLocalStorage, setLocalStorage, deleteLocalStorage } from "./localstorage"
import { setCookies,getCookie,deleteCookie } from "./cookies";


export const setAuthentification = (token, user) => {

 // console.log("Checking authentification ", token, user)
  token && setCookies("token", token);  
  user && setLocalStorage("user", user);
  
  };

 export const isAuthenticated = () => {
    if (getCookie("token") && getLocalStorage("user")) {
    //  console.log(getLocalStorage("user"))
      return (getLocalStorage("user"));
    } else {
      return false;
    }
  };

  export const Logout=(next)=>{  
deleteCookie('token');
deleteLocalStorage('user')

next()
  }