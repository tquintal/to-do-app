import { useContext, useState } from 'react';
import StorageContext from '../../../context/storage-context';
import classes from './AddCategory.module.css';

function AddCategory() {
    const context = useContext(StorageContext);
    const [newCategory, setNewCategory] = useState('');

    const onInputHandler = event => {
        setNewCategory(event.target.value);
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        context.onCategoryAdd(newCategory);
        setNewCategory('');
    };

    return <form onSubmit={onSubmitHandler} className={classes['container']}>
        <input type='text' placeholder='New category' value={newCategory} onChange={onInputHandler} />
        <button type='submit'>Add</button>
    </form>;
};

export default AddCategory;
