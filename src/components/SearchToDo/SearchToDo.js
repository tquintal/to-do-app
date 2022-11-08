import { useState, useContext } from 'react';
import Context from '../../context/context';
import classes from './SearchToDo.module.css';
import Button from '../../UI/Button';

const SearchToDo = props => {
    const [search, setSearch] = useState('');
    const context = useContext(Context);

    const onSubmitHandler = event => {
        event.preventDefault();
        alert('Hello world 👋');
    };

    function onClearHandler() {
        setSearch('');
        context.onSetSearch('');
    };

    const onSearchHandler = event => {
        setSearch(event.target.value);
        context.onSetSearch(event.target.value);
    };

    return <form onSubmit={onSubmitHandler} className={classes['container']}>
        <input type='text' placeholder='Search...' value={search} onChange={onSearchHandler} className={classes['input']} />
        <Button onClick={onClearHandler} className={classes['search-button']}>Clear</Button>
    </form>;
};

export default SearchToDo;
