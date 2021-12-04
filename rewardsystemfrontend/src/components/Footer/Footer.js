import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css';

const useStyles = makeStyles((theme)=>({
    footer:{backgroundColor : theme.palette.common.white,width:'100%' , height:'15vh' , left:'50%'},

}));

function Footer(props) {
    const classes =  useStyles();
    return (
        <footer className={classes.footer}>
        <div className="footer">
            Copyright &copy;  www.Rewards-and-Recognition System.com. All rights are reserved !
        </div>
        </footer>
    )
}

export default Footer
