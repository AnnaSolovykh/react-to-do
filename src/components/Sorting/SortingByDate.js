import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./Sorting.module.css";
import PropTypes from  "prop-types";

const SortingByDate = ({ setSortType }) => {

        const [toggle, setToggle] = useState(true);
    
        const handleToggleByDate = () => {
            setToggle(!toggle);
            toggle
            ? ( 
                setSortType("descendingDate") 
            )       
            : 
            ( 
                setSortType("ascendingDate")
            )  
        }
    
        const didMount = useRef(false);
        
        useEffect(()=> {
            didMount.current ? setToggle(toggle) : didMount.current = true;
        }, [toggle]);
    
        return (
            <div className={style.container}>
                <button className={style.button}  type="button" onClick={handleToggleByDate}> 
                    {toggle ? "Sort due to date: from newest" : "Sort due to date: from oldest"} 
                </button>  
                <p className={style.text}>{toggle ? "Sorted due to date: from oldest!" : "Sorted due to date: from newest!"} </p>
            </div>
        );   
}

export default SortingByDate;

SortingByDate.propTypes = {
    setSortType: PropTypes.func,
}