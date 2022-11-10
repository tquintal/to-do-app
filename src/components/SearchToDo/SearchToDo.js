import { useState, useContext } from 'react';
import Context from '../../context/context';
import classes from './SearchToDo.module.css';
import Button from '../../UI/Button';

const SearchToDo = props => {
    const [search, setSearch] = useState('');
    const context = useContext(Context);

    const onSubmitHandler = event => {
        event.preventDefault();
        setSearch('');
        context.setSearch('');
    };

    const onSearchHandler = event => {
        setSearch(event.target.value);
        context.setSearch(event.target.value);
    };

    return <form onSubmit={onSubmitHandler} className={classes['container']} style={props.style}>
        <input type='text' placeholder='Search...' value={search} onChange={onSearchHandler} className={classes['input']} />
        <Button type='submit' className={classes['search-button']}>Clear</Button>
    </form>;
};

export default SearchToDo;
