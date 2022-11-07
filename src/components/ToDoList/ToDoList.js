import { useContext, useState } from 'react';
import StorageContext from '../../context/storage-context';
import classes from './ToDoList.module.css';
import Button from '../../UI/Button';

function ToDoList() {
    const context = useContext(StorageContext);
    const [sortBy, setSortBy] = useState('most-recent');

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

    const onCategoryEditHandler = event => {
        context.onCategoryEdit(event.target.attributes.todoid.value, event.target.value);
    };

    const onDeleteHandler = event => {
        const id = event.target.attributes.todoid.value;
        context.onDelete(id);
    };

    return <div className={classes['to-do-list-container']}>
        <h3 className={classes['title']}>Todos</h3>
        <h3>Sort by:</h3>
        <div className={classes['sort-container']}>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' defaultChecked={true} id='most-recent' onChange={setSortByHandler} />
                <label htmlFor='most-recent'>most recent</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='least-recent' onChange={setSortByHandler} />
                <label htmlFor='least-recent'>least recent</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='priority' onChange={setSortByHandler} />
                <label htmlFor='priority'>priority</label>
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
                    <select className={classes['select']} disabled={todo.completed} defaultValue={todo.category} todoid={todo.id} onChange={onCategoryEditHandler}>
                        {context.categories.map(category => <option key={category}>{category}</option>)}
                    </select>
                    <Button
                        todoid={todo.id}
                        onClick={onPriorityChangeHandler}
                        className={`${classes['list-button']} ${todo.completed && classes['list-button-disabled']}`}
                        disabled={todo.completed}
                    >
                        {todo.highPriority ? '❗' : '❕'}
                    </Button>
                    <Button title='delete-button' todoid={todo.id} onClick={onDeleteHandler} className={classes['list-button']}>Delete</Button>
                </li>
            )}
        </ul>
        <h3 className={classes['title']}>Completed:</h3>
        <ul className={classes['ul-container']}>
            {context.toDos.map(todo => todo.completed === true &&
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
                    <select className={classes['select']} disabled={todo.completed} defaultValue={todo.category} todoid={todo.id} onChange={onCategoryEditHandler}>
                        {context.categories.map(category => <option key={category}>{category}</option>)}
                    </select>
                    <Button
                        todoid={todo.id}
                        onClick={onPriorityChangeHandler}
                        className={`${classes['list-button']} ${todo.completed && classes['list-button-disabled']}`}
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
