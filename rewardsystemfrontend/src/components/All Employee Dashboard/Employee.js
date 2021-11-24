import React, {useEffect} from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';
import Feeds from '../Feed/feeds';


const Employee = () =>{
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && (isAuthenticated().designation === "Employee" || isAuthenticated().designation === "Team Lead")) {
            history.push('/Employee')
          } else{
              history.push('/')
          }
    }, [history])


    return (<>
        <AdminHeader/>
        <Feeds/>
        </>
    )
}

export default Employee
