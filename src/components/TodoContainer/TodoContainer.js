import React, { 
    useEffect, 
    useState, 
    useCallback,
    useMemo
} from "react";
import { RotatingLines } from 'react-loader-spinner'
import PropTypes from  "prop-types";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList"
import Sorting from "../Sorting/Sorting";
import style from "./TodoContainer.module.css";

const TodoContainer = ({ tableName, tableKey, tableBaseId }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const fetchData = useCallback(async() => {
        const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/?view=Grid%20view`;

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
                isChecked: todo.fields.isChecked,
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
                ):(<div className={style.todolistWrapper}> 
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
                            setTodoList={setTodoList}
                            todoList={sortedData} 
                            onRemoveItem={removeTodo} 
                            updateData={updateData}
                            handleCheck={handleCheck}
                        />
                    </div>
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