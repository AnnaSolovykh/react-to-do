import React, { 
    useEffect, 
    useState, 
    useCallback,
} from "react";
import { RotatingLines } from 'react-loader-spinner'
import PropTypes from  "prop-types";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import style from "./TodoContainer.module.css";
import SortingTodoList from "./SortingTodoList";

const TodoContainer = ({ tableName, tableKey, tableBaseId }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async() => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}`;

        const options = {
            method: "GET",
                headers: {
                Authorization: `Bearer ${tableKey}`,
                },
        };
    
        try {
            const response = await fetch(url, options);
    
            if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
            }
    
            const data = await response.json();

            const todos = data.records.map((todo) => {
                const newTodo = {
                    id: todo.id,
                    title: todo.fields.title,
                    date: todo.createdTime,
                    isChecked: Boolean(todo.fields.isChecked),
                }
            return newTodo
            });

            setTodoList(todos);
            setIsLoading(false);
    
        } catch (error) {
        console.log(error.message)
        }
    }, [tableName, tableKey, tableBaseId]);

    useEffect(()=> {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);


    const addTodo = async (title) => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}`;

        const airtableData = {
            fields: {
                title: title,
            },
        };
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tableKey}`,
            },
            body: JSON.stringify(airtableData),
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const message = `Error has occurred:
                ${response.status}`;
                throw new Error(message);
            }
            const todo = await response.json();
        
            const newTodo = {
                id: todo.id, 
                title: todo.fields.title,
                date: todo.createdTime,
                isChecked: Boolean(todo.fields.isChecked),
            };

            setTodoList([...todoList, newTodo]);
            
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };
    
    const removeTodo = async(id) => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tableKey}`,
            },
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
            const message = `Error has occurred:
                ${response.status}`;
                throw new Error(message);
            }

            const newTodoList = todoList.filter(
                item => item.id !== id 
            );

            setTodoList(newTodoList);
    
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };
    
    const updateData = async(newTitle, id) => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;
        const airtableData = {
            fields: {
                title: newTitle,
            },
        };
    
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tableKey}`,
            },
            body: JSON.stringify(airtableData),
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
            const message = `Error has occurred:
                ${response.status}`;
                throw new Error(message);
            }

        } catch (error) {
            console.log(error.message);
            return null;
        }
    };
    
    const handleCheck = async(checked, id) => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;
        const airtableData = {
            fields: {
                isChecked: Boolean(!checked),
            },
        };
    
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tableKey}`,
            },
            body: JSON.stringify(airtableData),
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
            const message = `Error has occurred:
                ${response.status}`;
                throw new Error(message);
            }
            const checkedGoals = todoList.map(todo => {
                if (todo.id === id) {
                    let checkedItem = {
                        ...todo, 
                        isChecked: Boolean(!todo.isChecked),
                    };
                    return checkedItem;
                } else {
                    return todo;
                }
            });
            setTodoList(checkedGoals);
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };
    

    return (
        <>
            <h1 className={style.h1}>{tableName}</h1>
            <AddTodoForm onAddTodo={addTodo}/>
                {isLoading ? (
                    <div className={style.container}>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                        />
                    </div>
                ):(
                    <SortingTodoList 
                        setTodoList={setTodoList}
                        todoList={todoList} 
                        onRemoveItem={removeTodo} 
                        updateData={updateData}
                        handleCheck={handleCheck}
                    />
                )
            }
        </>
    );
}
    
export default TodoContainer;

TodoContainer.propTypes = {
    tableName: PropTypes.string,
    tableKey: PropTypes.string,
    tableBaseId: PropTypes.string,
}