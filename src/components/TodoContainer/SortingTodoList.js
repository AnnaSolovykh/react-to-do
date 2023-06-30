import React, { useState, useMemo } from "react";
import PropTypes from  "prop-types";
import TodoList from "../TodoList/TodoList"
import Sorting from "../Sorting/Sorting";
import style from "./TodoContainer.module.css";

const SortingTodoList = ({ todoList, onRemoveItem, updateData, handleCheck }) => {
    const [sortType, setSortType] = useState("default"); 

    const sortedData = useMemo(() => {
        let sortedList = todoList;

        const ascendingAlphabet = () => {
            sortedList = [...sortedList].sort((a, b) => { 
                let loweredA = a.title.toLowerCase();
                let loweredB = b.title.toLowerCase();
                return (loweredA < loweredB ? -1 : loweredB > loweredA ? 1 : 0); 
            });
        };
    
        const descendingAlphabet = () => {
            sortedList = [...sortedList].sort((a, b) => { 
                let loweredA = a.title.toLowerCase();
                let loweredB = b.title.toLowerCase();
                return (loweredA > loweredB ? -1 : loweredB < loweredA ? 1 : 0); 
            });
        }
        
        const ascendingDate = () => {
            sortedList =  [...sortedList].sort((a, b) => { 
                return (new Date(a.date) < new Date(b.date) ? -1 : new Date(b.date) > new Date(a.date) ? 1 : 0); 
            });
        };
    
        const descendingDate = () => {
            sortedList =  [...sortedList].sort((a, b) => { 
                return (new Date(a.date) > new Date(b.date) ? -1 : new Date(b.date) < new Date(a.date)? 1 : 0); 
            });
        }
    
        switch (sortType) {
            case "descendingAlphabet":
                descendingAlphabet()
                break;  
            case "ascendingAlphabet":
                ascendingAlphabet()
                break;
            case "descendingDate":
                descendingDate()
                break;
            case "ascendingDate":
                ascendingDate()
                break;
            default: 
                ascendingDate()
        }   
        return sortedList;
    }, [todoList, sortType]);

    return (
        <div className={style.todolistWrapper}> 
            <div className={style.sortingButtons}> 
                <Sorting 
                    setSortType={setSortType} 
                    ascending={"ascendingAlphabet"} 
                    descending={"descendingAlphabet"} 
                    ascendingText={"A => Z"} 
                    descendingText={"Z => A"}
                />
                <Sorting 
                    setSortType={setSortType} 
                    ascending={"ascendingDate"} 
                    descending={"descendingDate"} 
                    ascendingText={"old => new"} 
                    descendingText={"new => old"}
                />
            </div>
            <TodoList 
                todoList={sortedData} 
                onRemoveItem={onRemoveItem}
                updateData={updateData}
                handleCheck={handleCheck}
            />
        </div>
    )
}
export default SortingTodoList;

SortingTodoList.propTypes = {
    todoList: PropTypes.array, 
    onRemoveItem: PropTypes.func,
    updateDate: PropTypes.func,
    handleCheck: PropTypes.func,
}
