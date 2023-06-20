import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./Sorting.module.css";
import PropTypes from  "prop-types";

const SortingByAlphabet = ({ setSortType }) => {

        const [toggle, setToggle] = useState(true);

        const handleToggleByAlphabeticalOrder = () => {
            setToggle(!toggle);
            toggle
            ? ( 
                setSortType("descendingAlphabet") 
            )       
            : 
            ( 
                setSortType("ascendingAlphabet")
            )  
        };

    
        const didMount = useRef(false);
        
        useEffect(()=> {
            didMount.current ? setToggle(toggle) : didMount.current = true;
        }, [toggle]);
    
        return (
            <div className={style.container}>
                <button className={style.button} type="button" onClick={handleToggleByAlphabeticalOrder}> 
                    {toggle ? "From Z to A" : "From A to Z"} 
                </button>  
            </div>
        );   
}

export default SortingByAlphabet;

SortingByAlphabet.propTypes = {
    setSortType: PropTypes.func,
}