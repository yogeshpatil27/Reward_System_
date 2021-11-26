import React from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useEffect } from 'react'
import { isAuthenticated } from '../../Authen'
import { useHistory } from 'react-router'
import Feeds from '../Feed/feeds'


const Manager=() =>{

    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().designation === "Manager") {
            console.log("I am a Manager");
            history.push('/Manager')
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

export default Manager;