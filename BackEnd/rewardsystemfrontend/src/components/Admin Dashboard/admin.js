import React ,{useEffect}from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';
import Feeds from '../Feed/feeds';
//import WinnerForm from './WinnerForm';



const Admin=() =>{
    const history = useHistory();
    // const context = useContext(contextValue);
  
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      //console.log("I am a Admin");
      history.push('/admin')
    } else{
        history.push('/')
    }
  }, [history])


    return (
        <>
        <AdminHeader/>
        <Feeds/>
        
        </>
    )
}

export default Admin
