import { useContext, useState } from 'react';
import Context from '../../context/context';
import classes from './NewToDo.module.css';
import Button from '../../UI/Button';

function NewToDo() {
    const context = useContext(Context);
    const [todo, setTodo] = useState('');
    const [category, setCategory] = useState('None');
    const [highPriority, setHighPriority] = useState(false);

    const onWriteTodoHandler = event => {
        setTodo(event.target.value);
    };

    const onCategoryChangeHandler = event => {
        setCategory(event.target.value);
    };

    function onHighPriorityChangeHandler() {
        setHighPriority(prevState => !prevState);
    };

    const onSubmitHandler = event => {
        event.preventDefault();

        if (todo.trim() !== '') {
            context.onAdd(todo, category, highPriority);
        } else
            alert(`Can't be empty! ⚠️`);

        setTodo('');
        setHighPriority(false);
    };

    return <form onSubmit={onSubmitHandler} className={classes['container']}>
        <div className={classes['new-to-do-container']}>
            <input
                id='todo'
                type='text'
                placeholder='New todo'
                value={todo}
                onChange={onWriteTodoHandler}
                className={classes['new-to-do']}
                autoFocus={true}
            />
            <div className={classes['options-container']}>
                <select title='category' className={classes['select']} onChange={onCategoryChangeHandler} value={category}>
                    <optgroup label='Category' />
                    {context.categories.map(cat =>
                        <option key={cat}>{cat}</option>
                    )}
                </select>
                <Button className={classes['new-to-do-button']} onClick={onHighPriorityChangeHandler}>{highPriority ? '❗' : '❕'}</Button>
                <Button type='submit' className={classes['new-to-do-button']}>Add</Button>
            </div>
        </div>
    </form>;
};

export default NewToDo;
