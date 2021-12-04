import React from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Authen'
import { useHistory } from 'react-router'
import Feeds from '../Feed/feeds'
import Footer from '../Footer/Footer';


const Manager=() =>{

    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().designation === "Manager") {
            console.log("I am a Manager");
            history.push('/manager')
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

export default Manager;