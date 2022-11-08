import { useContext } from 'react';
import StorageContext from '../../../context/storage-context';
import classes from './Categories.module.css';
import Button from '../../../UI/Button';

const Categories = props => {
    const context = useContext(StorageContext);

    const onCategoryChangeHandler = event => {
        context.onSetListBy(event.target.attributes.category.value);
    };

    const onDeleteHandler = event => {
        context.onCategoryDelete(event.target.attributes.category.value);
        context.onSetListBy('All');
    };

    return <ul className={classes['ul-container']}>
        <li onClick={onCategoryChangeHandler} className={classes['separator']} />

        <li onClick={onCategoryChangeHandler} category={'All'} className={`${classes['ul-li-item']} ${context.listBy === 'all' && classes['ul-li-item-active']}`}>
            All
        </li>
        <li onClick={onCategoryChangeHandler} category={'None'} className={`${classes['ul-li-item']} ${context.listBy === 'none' && classes['ul-li-item-active']}`}>
            None
        </li>
        <li onClick={onCategoryChangeHandler} category={'Today'} className={`${classes['ul-li-item']} ${context.listBy === 'today' && classes['ul-li-item-active']}`}>
            Today
        </li>

        <li onClick={onCategoryChangeHandler} className={classes['separator']} />

        {context.categories.map(category => category.toLowerCase() !== 'none' &&
            <div className={`${classes['custom-cat-container']} ${context.listBy === category.toLowerCase() && classes['custom-cat-container-active']}`} key={category}>
                <li
                    key={category}
                    onClick={onCategoryChangeHandler}
                    category={category}
                    className={classes['ul-li-item']}
                >
                    {category}
                </li>
                <Button style={{ color: '#6c6c6c' }} category={category} onClick={onDeleteHandler}>Delete</Button>
            </div>
        )}

        <li onClick={onCategoryChangeHandler} className={classes['separator']} />
    </ul>;
};

export default Categories;
