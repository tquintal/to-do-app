import { Fragment } from 'react';
import classes from './List.module.css';
import Button from '../../UI/Button';

const Completed = props => {

    return <Fragment>
        {
            props.showCompleted &&
            <ul className={classes['ul-container']}>
                {props.context.displayToDos.map(todo => todo.completed && (props.context.groupBy === 'deleted' ? todo.deleted : !todo.deleted) &&
                    <li key={todo.id}>
                        <div className={classes['todo-container']}>
                            <input
                                type='checkbox'
                                checked={todo.completed}
                                todoid={todo.id}
                                onChange={props.onCompleteHandler}
                                className={classes['complete-input']}
                            />
                            <input
                                type='text'
                                className={`${classes['to-do']} ${todo.completed && classes['completed']}`}
                                defaultValue={todo.content}
                                todoid={todo.id}
                                onChange={props.onEditHandler}
                                onClick={props.showOptionsHandler}
                                disabled
                            />
                            {props.options === todo.id &&
                                <div className={classes['options-container']}>
                                    <select className={classes['select']} disabled={todo.completed} defaultValue={todo.category} todoid={todo.id} onChange={props.onCategoryEditHandler}>
                                        {props.context.categories.map(category => <option key={category}>{category}</option>)}
                                    </select>
                                    <Button
                                        todoid={todo.id}
                                        onClick={props.onPriorityChangeHandler}
                                        className={`${classes['list-button']} ${todo.completed && classes['list-button-disabled']}`}
                                        disabled={todo.completed}
                                    >
                                        {todo.highPriority ? '❗' : '❕'}
                                    </Button>

                                </div>
                            }
                            <Button title='delete-button' todoid={todo.id} onClick={props.onDeleteHandler} className={classes['list-button']}>Delete</Button>
                        </div>
                    </li>
                )}
            </ul>
        }
    </Fragment>
};

export default Completed;
