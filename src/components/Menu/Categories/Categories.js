import { useContext, useState, useEffect } from 'react';
import Context from '../../../context/context';
import classes from './Categories.module.css';
import Button from '../../../UI/Button';

function Categories() {
    const context = useContext(Context);
    const [todayCounter, setTodayCounter] = useState(0);

    // SET TODAY's COUNTER
    useEffect(() => {
        console.log('➡️ CATEGORIES.JS USE EFFECT');
        const today = new Date().toString().slice(0, 10);
        let todos = context.toDos.map(todo => {
            return { ...todo, created: new Date(todo.created) } // STRING TO DATE
        });
        todos = todos.filter(todo => todo.created.toString().slice(0, 10) === today && !todo.completed && !todo.deleted);
        setTodayCounter(todos.length);
    }, [context.toDos]);

    const setGroupByHandler = event => {
        context.setGroupBy(event.target.id)
        context.onShowMobileMenu();
    };

    const onDeleteHandler = event => {
        context.onCategoryDelete(event.target.attributes.category.value);
        context.setGroupBy('all');
    };

    return <ul className={classes['ul-container']}>
        <li className={classes['separator']} />

        <li onClick={setGroupByHandler} id={'all'} className={`${classes['ul-li-item']} ${context.groupBy === 'all' && classes['ul-li-item-active']}`}>
            All
            <p className={classes['deleted-counter']}>{context.toDos.filter(todo => !todo.completed && !todo.deleted).length}</p>
        </li>
        <li onClick={setGroupByHandler} id={'none'} className={`${classes['ul-li-item']} ${context.groupBy === 'none' && classes['ul-li-item-active']}`}>
            None
            <p className={classes['deleted-counter']}>{context.toDos.filter(todo => todo.category.toLowerCase() === 'none' && !todo.completed && !todo.deleted).length}</p>
        </li>
        <li onClick={setGroupByHandler} id={'today'} className={`${classes['ul-li-item']} ${context.groupBy === 'today' && classes['ul-li-item-active']}`}>
            Today
            <p className={classes['deleted-counter']}>{todayCounter}</p>
        </li>

        {context.categories.filter(category => category.toLowerCase() !== 'none').length > 0 && <li className={classes['separator']} />}

        {context.categories.map(category => category.toLowerCase() !== 'none' &&
            <div className={`${classes['custom-cat-container']} ${context.groupBy === category && classes['custom-cat-container-active']}`} key={category}>
                <li
                    key={category}
                    id={category}
                    onClick={setGroupByHandler}
                    category={category}
                    className={classes['ul-li-item']}
                >
                    {category}
                </li>
                <Button style={{ color: '#6c6c6c' }} category={category} onClick={onDeleteHandler}>Delete</Button>
            </div>
        )}

        <li className={classes['separator']} />

        <li onClick={setGroupByHandler} id={'deleted'} className={`${classes['ul-li-item']} ${context.groupBy === 'deleted' && classes['ul-li-item-active']}`}>
            Deleted
            <p className={classes['deleted-counter']}>{context.toDos.filter(todo => todo.deleted).length}</p>
        </li>

        <li className={classes['separator']} />
    </ul>;
};

export default Categories;
