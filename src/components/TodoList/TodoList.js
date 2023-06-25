import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import PropTypes from  "prop-types";
import TodoListItem from "../ToDoListItem/ToDoListItem";
import style from "./TodoList.module.css";


const TodoList = ({ setTodoList, todoList, onRemoveItem, updateData }) => {
    const [motivation, setMotivation] = useState("")
    
    const handleCheck = (id) => {
        const checkedGoals = todoList.map(todo => {
            if (todo.id === id) {
                let checkedItem = {...todo, isChecked: !todo.isChecked}
                return checkedItem;
            } else {
                return todo;
            }
        });
        setTodoList(checkedGoals)
    };

    const completedTasks = todoList.filter(task => task.isChecked);
    let percentageComplete = Math.round((completedTasks.length / todoList.length) * 100);

    useEffect(()=> {
        if (percentageComplete === 0) {
            setMotivation("Make it happen!") 
        } 
        if (percentageComplete > 0 && percentageComplete < 25) {
            setMotivation("Winners never quit!") 
        } 
        if (percentageComplete >= 25 && percentageComplete < 50) {
            setMotivation("Success breeds success!") 
        } 
        if (percentageComplete >= 50 && percentageComplete < 75){
            setMotivation("You are halfway through! Great job!") 
        } 
        if (percentageComplete >= 75 && percentageComplete < 100) {
            setMotivation("You are almost there! Seize the day!") 
        }  
        if (percentageComplete === 100) {
            setMotivation("Congratulations! Well done!") 
        }
    }, [percentageComplete])

    return (
        <>
            <ProgressBar 
                completed={percentageComplete}
                className={style.wrapper}
                bgColor="#f2f3ead7"
                height="20px"
                width="25rem"
                borderRadius="0.5rem"
                labelAlignment="center"
                baseBgColor="transparent"
                labelColor="#94b79d95"
                padding="0px 10px 20px 20px"
            />
            <h3 className={style.motivationText}>{motivation}</h3>
            <div className={style.container}>
                <ul className={style.list}>
                    {todoList.map(item => {
                        return (
                            <TodoListItem 
                                key={item.id} 
                                todo={item} 
                                onRemoveItem={onRemoveItem}
                                updateData={updateData}
                                handleCheck={handleCheck}
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default TodoList;

TodoList.propTypes = {
    todoList: PropTypes.array, 
    onRemoveItem: PropTypes.func,
    updateDate: PropTypes.func,
}