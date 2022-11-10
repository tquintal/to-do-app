import { useContext, useState, Fragment } from 'react';
import Context from '../../../context/context';
import NewToDo from '../../NewToDo/NewToDo';
import Sort from '../Sort/Sort';
import SearchToDo from '../../SearchToDo/SearchToDo';
import ToDos from '../ToDos';
import classes from './ToDoList.module.css';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import Completed from '../Completed';
import Deleted from '../Deleted';

function ToDoList() {
    const context = useContext(Context);
    const [showToDos, setShowToDos] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);

    const [options, setOptions] = useState('');
    const showOptionsHandler = event => {
        setOptions(() => {
            const idUpdate = event.target.attributes.todoid.value;
            return idUpdate;
        });
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

    return (
        <Fragment>
            {context.groupBy !== 'deleted' && <NewToDo />}
            <div className={classes['to-do-list-container']}>
                {
                    context.groupBy !== 'deleted' ?
                        <Fragment>
                            <Sort context={context} />
                            <SearchToDo />
                            <div onClick={onToDosHideHandler} className={classes['title-container']}>
                                <div className={classes['title-left']}>
                                    <h3>To do</h3>
                                    <p className={classes['counter']}>{context.displayToDos.filter(todo => !todo.completed && !todo.deleted).length}</p>
                                </div>
                                <div className={classes['show-hide']}>
                                    <p>{showToDos ? 'Hide' : 'Show'}</p>
                                    {showToDos ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </div>
                            </div>
                            <ToDos
                                showToDos={showToDos}
                                context={context}
                                onCompleteHandler={onCompleteHandler}
                                showOptionsHandler={showOptionsHandler}
                                onEditHandler={onEditHandler}
                                onPriorityChangeHandler={onPriorityChangeHandler}
                                options={options}
                                onCategoryEditHandler={onCategoryEditHandler}
                                onDeleteHandler={onDeleteHandler}

                            />
                            <div onClick={onCompletedHideHandler} className={classes['title-container']}>
                                <div className={classes['title-left']}>
                                    <h3>Completed</h3>
                                    <p className={classes['counter']}>{context.displayToDos.filter(todo => todo.completed && !todo.deleted).length}</p>
                                </div>
                                <div className={classes['show-hide']}>
                                    <p>{showCompleted ? 'Hide' : 'Show'}</p>
                                    {showCompleted ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </div>
                            </div>
                            <Completed
                                showCompleted={showCompleted}
                                context={context}
                                onCompleteHandler={onCompleteHandler}
                                onEditHandler={onEditHandler}
                                showOptionsHandler={showOptionsHandler}
                                options={options}
                                onCategoryEditHandler={onCategoryEditHandler}
                                onPriorityChangeHandler={onPriorityChangeHandler}
                                onDeleteHandler={onDeleteHandler}
                            />
                        </Fragment>
                        :
                        <Fragment>
                            <SearchToDo style={{ marginTop: '160px' }} />
                            <Deleted
                                context={context}
                                onEditHandler={onEditHandler}
                                onDeleteHandler={onDeleteHandler}
                            />
                        </Fragment>
                }
            </div>
        </Fragment>
    );
};

export default ToDoList;
