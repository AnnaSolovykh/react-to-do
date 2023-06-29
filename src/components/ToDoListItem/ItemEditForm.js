
import Swal from "sweetalert2";
import PropTypes from  "prop-types";
import {ReactComponent as Save} from "../../resources/save.svg";
import style from "./TodoListItem.module.css";

const ItemEditForm = ( {todo, newTitle, setNewTitle, updateData, setEditing } ) => {
    
    const editItem = (event) => {
        const editedTitle = event.target.value;
        setNewTitle(editedTitle);
    };

    const handleEditItem = (event) => {
        event.preventDefault();
        if (newTitle=== "" || newTitle === " ") {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Type your goal please!",
            })
        } else {
            setEditing(true);
            updateData(newTitle, todo.id);
        }
    };

    return (
        <form 
            onSubmit={handleEditItem}
            className={style.conditionalContainerForm}
        >
            <input 
                className={style.formInput} 
                value={newTitle} 
                onChange={editItem}>
            </input> 
            <button 
                className={`${style.btn} ${style.saveBtn}`}
                type="submit">
                    <Save className={style.formIcon}/> 
            </button>
        </form>
    )
}

export default ItemEditForm;

ItemEditForm.propTypes = {
    todo: PropTypes.object,
    newTitle: PropTypes.string,
    setNewTitle: PropTypes.func,
    updateData: PropTypes.func,
    setEditing: PropTypes.func,
}
