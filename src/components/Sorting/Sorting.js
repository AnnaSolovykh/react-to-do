import React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from  "prop-types";
import Popup from "reactjs-popup";
import style from "./Sorting.module.css";

const Sorting = ({ 
    setSortType, 
    ascending, 
    descending, 
    ascendingText, 
    descendingText, 
    ascendingPopup, 
    descendingPopup 
}) => {
    const [toggle, setToggle] = useState(true);

    const handleToggle= () => {
        setToggle(!toggle);
        toggle ? setSortType(descending) : setSortType(ascending);
    };

    const didMount = useRef(false);
    
    useEffect(()=> {
        didMount.current ? setToggle(toggle) : didMount.current = true;
    }, [toggle]);
    
    return (
        <div className={style.container}>
            <Popup
                trigger = {
                    <button 
                        className={style.button} 
                        type="button" 
                        onClick={handleToggle}
                    > 
                        {toggle ? descendingText : ascendingText} 
                    </button>  
                }
                position="bottom"
                on={['focus']}
                arrow={false}
                repositionOnResize={true}
                contentStyle={ {fontSize: "0.8rem"} }
            >
                {toggle ? ascendingPopup : descendingPopup} 
            </Popup>
        </div>
    );   
}

export default Sorting;

Sorting.propTypes = {
    setSortType: PropTypes.func,
    ascending: PropTypes.string,
    descending: PropTypes.string,
    ascendingText: PropTypes.string,
    descendingText: PropTypes.string,
    ascendingPopup: PropTypes.string,
    descendingPopup: PropTypes.string,
}