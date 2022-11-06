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

        if (newCategory.trim().length === 0) {
            alert(`Error, can't be empty. ⚠️`);
            setNewCategory('');
            return;
        };

        for (let i = 0; i < context.categories.length; i++) {
            if (context.categories[i].toLowerCase() === newCategory.toLowerCase()) {
                alert('Error, that category already exists. ⚠️');
                setNewCategory('');
                return;
            };
        };

        context.onCategoryAdd(newCategory);
        setNewCategory('');
    };

    return <form onSubmit={onSubmitHandler} className={classes['container']}>
        <input type='text' placeholder='New category' value={newCategory} onChange={onInputHandler} />
        <button type='submit'>Add</button>
    </form>;
};

export default AddCategory;
