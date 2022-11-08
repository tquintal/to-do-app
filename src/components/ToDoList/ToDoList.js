import { useContext, useState } from 'react';
import Context from '../../context/context';
import SearchToDo from '../SearchToDo/SearchToDo';
import classes from './ToDoList.module.css';
import Button from '../../UI/Button';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

function ToDoList() {
    const context = useContext(Context);
    const [sortBy, setSortBy] = useState('most-recent');
    const [showToDos, setShowToDos] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);

    const [options, setOptions] = useState('');
    const showOptionsHandler = event => {
        setOptions(() => {
            const idUpdate = event.target.attributes.todoid.value;
            return idUpdate;
        });
    };

    const hideOptionsHandler = () => {
        setOptions(() => {
            const idUpdate = '';
            return idUpdate;
        });
    };

    const setSortByHandler = event => {
        setSortBy(event.target.id);
    };

    const onToDosHideHandler = () => {
        setShowToDos(prevState => !prevState);
    };

    const onCompletedHideHandler = () => {
        setShowCompleted(prevState => !prevState);
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
        <SearchToDo />
        <div onClick={onToDosHideHandler} className={classes['title-container']}>
            <div className={classes['title-left']}>
                <h3>To do</h3>
                <p className={classes['counter']}>{context.onListToDos(sortBy).filter(todo => !todo.completed).length}</p>
            </div>
            <div className={classes['show-hide']}>
                <p>{showToDos ? 'Hide' : 'Show'}</p>
                {showToDos ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
        </div>
        {
            showToDos &&
            <ul className={classes['ul-container']}>
                {context.onListToDos(sortBy).filter(todo => !todo.completed).map(todo =>
                    <li key={todo.id}>
                        <div className={classes['todo-container']}>
                            <input
                                type='checkbox'
                                checked={todo.completed}
                                todoid={todo.id}
                                onChange={onCompleteHandler}
                                className={classes['complete-input']}
                            />
                            <input
                                type='text'
                                className={classes['to-do']}
                                defaultValue={todo.content}
                                todoid={todo.id}
                                onChange={onEditHandler}
                                onFocus={showOptionsHandler}
                                onBlur={hideOptionsHandler}
                                disabled={todo.completed}
                            />
                            <Button
                                todoid={todo.id}
                                onClick={onPriorityChangeHandler}
                                className={`${classes['list-button']} ${todo.completed && classes['list-button-disabled']}`}
                                disabled={todo.completed}
                            >
                                {todo.highPriority ? '❗' : '❕'}
                            </Button>
                        </div>
                        {options === todo.id &&
                            <div className={classes['options-container']}>
                                <select className={classes['select']} disabled={todo.completed} defaultValue={todo.category} todoid={todo.id} onChange={onCategoryEditHandler}>
                                    {context.categories.map(category => <option key={category}>{category}</option>)}
                                </select>

                                <Button title='delete-button' todoid={todo.id} onClick={onDeleteHandler} className={classes['list-button']}>Delete</Button>
                            </div>
                        }
                    </li>
                )}
            </ul>
        }
        <div onClick={onCompletedHideHandler} className={classes['title-container']}>
            <div className={classes['title-left']}>
                <h3>Completed</h3>
                <p className={classes['counter']}>{context.onListToDos(sortBy).filter(todo => todo.completed).length}</p>
            </div>
            <div className={classes['show-hide']}>
                <p>{showCompleted ? 'Hide' : 'Show'}</p>
                {showCompleted ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
        </div>
        {
            showCompleted &&
            <ul className={classes['ul-container']}>
                {context.onListToDos(sortBy).filter(todo => todo.completed).map(todo =>
                    <li key={todo.id}>
                        <div className={classes['todo-container']}>
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
                                className={`${classes['list-button']} ${todo.completed && classes['list-button-disabled']}`}
                                disabled={todo.completed}
                            >
                                {todo.highPriority ? '❗' : '❕'}
                            </Button>
                        </div>
                    </li>
                )}
            </ul>
        }
    </div>;
};

export default ToDoList;
