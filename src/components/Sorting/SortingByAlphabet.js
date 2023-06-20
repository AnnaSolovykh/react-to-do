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
                    {toggle ? "Sort from Z to A" : "Sort from A to Z"} 
                </button>  
                <p className={style.text}>{toggle ? "Sorted from A to Z!" : "Sorted from Z to A!"} </p>
            </div>
        );   
}

export default SortingByAlphabet;

SortingByAlphabet.propTypes = {
    setSortType: PropTypes.func,
}