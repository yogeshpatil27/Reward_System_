import React ,{useEffect}from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';
import Feeds from '../Feed/feeds';
import Footer from '../Footer/Footer';



const Admin=() =>{
    const history = useHistory();
    // const context = useContext(contextValue);
  
  useEffect(() => {
    authenticateLogin();
  }, [])

const authenticateLogin=()=>{
      if (isAuthenticated() && isAuthenticated().designation === "Admin") {
          //console.log("I am a Admin");
          history.push('/admin')
        } else{
            history.push('/')
        }
}
    return (
        <>
        <AdminHeader/>
        <Feeds/>
        <Footer />
        </>
    )
}

export default Admin
