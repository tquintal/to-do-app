import { useContext, useState } from 'react';
import StorageContext from '../../context/storage-context';
import classes from './ToDoList.module.css';
import Button from '../../UI/Button';

function ToDoList() {
    const context = useContext(StorageContext);
    const [sortBy, setSortBy] = useState('date');

    const setSortByHandler = event => {
        setSortBy(event.target.id);
    };

    const onCompleteHandler = event => {
        const id = event.target.attributes.todoid.value;
        context.onComplete(id);
    };

    const onEditHandler = event => {
        const id = event.target.attributes.todoid.value;
        const content = event.target.value;
        context.onEdit(id, content);
    };

    const onPriorityChangeHandler = event => {
        const id = event.target.attributes.todoid.value;
        context.onPriorityChange(id);
    };

    const onDeleteHandler = event => {
        const id = event.target.attributes.todoid.value;
        context.onDelete(id);
    };

    return <div className={classes['to-do-list-container']}>
        <h2>Todos</h2>
        <h3>Sort by:</h3>
        <div className={classes['sort-container']}>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='default' onChange={setSortByHandler} />
                <label htmlFor='default'>Default</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='not-completed' onChange={setSortByHandler} />
                <label htmlFor='not-completed'>Not completed</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='completed' onChange={setSortByHandler} />
                <label htmlFor='completed'>Completed</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' defaultChecked={true} id='date' onChange={setSortByHandler} />
                <label htmlFor='date'>Recently added</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='priority' onChange={setSortByHandler} />
                <label htmlFor='priority'>Priority</label>
            </div>
        </div>
        <ul className={classes['ul-container']}>
            {context.onListToDos(sortBy).map(todo =>
                <li key={todo.id}>
                    <input
                        type='checkbox'
                        checked={todo.completed}
                        todoid={todo.id}
                        onChange={onCompleteHandler}
                        className={classes['complete-input']}
                    />
                    <input
                        type='text'
                        className={`${classes['to-do']} ${todo.completed && classes['completed']}`}
                        defaultValue={todo.content}
                        todoid={todo.id}
                        onChange={onEditHandler}
                        disabled={todo.completed}
                    />
                    <Button
                        todoid={todo.id}
                        onClick={onPriorityChangeHandler}
                        className={classes['list-button']}
                        disabled={todo.completed}
                    >
                        {todo.highPriority ? '❗' : '❕'}
                    </Button>
                    <Button title='delete-button' todoid={todo.id} onClick={onDeleteHandler} className={classes['list-button']}>Delete</Button>
                </li>
            )}
        </ul>
    </div>;
};

export default ToDoList;
