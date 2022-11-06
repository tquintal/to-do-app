import { useContext } from 'react';
import StorageContext from '../../../context/storage-context';
import classes from './Categories.module.css';

const Categories = props => {
    const context = useContext(StorageContext);

    const onCategoryChangeHandler = event => {
        context.onSetListBy(event.target.innerText);
    };

    return <ul className={classes['ul-container']}>
        <li onClick={onCategoryChangeHandler} className={`${classes['ul-li-item']} ${context.listBy === 'all' && classes['ul-li-item-active']}`} style={{ marginTop: '15px' }}>All</li>
        <li onClick={onCategoryChangeHandler} className={`${classes['ul-li-item']} ${context.listBy === 'none' && classes['ul-li-item-active']}`}>None</li>
        <li onClick={onCategoryChangeHandler} className={`${classes['ul-li-item']} ${context.listBy === 'today' && classes['ul-li-item-active']}`}>Today</li>
        <li onClick={onCategoryChangeHandler} className={classes['separator']} />
        {context.categories.map(category => category.toLowerCase() !== 'none' &&
            <li key={category} onClick={onCategoryChangeHandler} className={`${classes['ul-li-item']} ${context.listBy === category.toLowerCase() && classes['ul-li-item-active']}`}>{category}</li>
        )}
    </ul>;
};

export default Categories;
