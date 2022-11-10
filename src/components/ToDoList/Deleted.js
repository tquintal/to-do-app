import { Fragment } from 'react';
import classes from './List.module.css';
import Button from '../../UI/Button';

const Deleted = props => {
    return <Fragment>
        <ul className={classes['ul-container']}>
            {props.context.displayToDos.map(todo =>
                <li key={todo.id}>
                    <div className={classes['todo-container']}>
                        <input
                            type='text'
                            className={`${classes['to-do']} ${todo.completed && classes['completed']}`}
                            defaultValue={todo.content}
                            todoid={todo.id}
                            onChange={props.onEditHandler}
                            disabled
                        />
                        <Button
                            todoid={todo.id}
                            onClick={props.onDeleteHandler}
                            className={`${classes['list-button']}`}
                        >
                            Recover
                        </Button>
                    </div>
                </li>
            )}
        </ul>
    </Fragment>
};

export default Deleted;
