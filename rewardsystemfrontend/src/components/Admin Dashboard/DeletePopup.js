import React from 'react'
import './DeletePopup.css'



const DeletePopup = (props) => {
    return (props.trigger)?(
        <div className="Popup">
            <div className="Popup-inner">
                <button className="close-btn">close</button>
                {props.children}
            </div>
        </div>
    ):"";
}

export default DeletePopup
