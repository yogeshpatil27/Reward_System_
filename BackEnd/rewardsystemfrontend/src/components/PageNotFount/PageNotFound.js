import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const PageNotFound=() =>{


    
    return (<>
        <Container className="justify-content-md-center">
        <div>
            <h1 >404 Page Not Found</h1>
            <p>The page for which you are searching is No more available</p>
            <NavLink to="/">Please Login</NavLink>
        </div>
        </Container>
        </>
    )
}

export default PageNotFound
