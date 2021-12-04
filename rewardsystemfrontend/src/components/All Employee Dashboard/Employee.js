import React, {useEffect} from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';
import Feeds from '../Feed/feeds';
import Footer from '../Footer/Footer';


const Employee = () =>{
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && (isAuthenticated().designation === "Employee" || isAuthenticated().designation === "Team Lead")) {
            history.push('/employee')
          } else{
              history.push('/')
          }
    }, [history])


    return (<>
        <AdminHeader/>
        <Feeds/>
        <Footer />
        </>
    )
}

export default Employee
