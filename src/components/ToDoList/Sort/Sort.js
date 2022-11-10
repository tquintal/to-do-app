import { Fragment } from 'react';
import classes from './Sort.module.css';

const Sort = props => {
    const setSortByHandler = event => {
        props.context.setSortBy(event.target.id);
    };

    return <Fragment>
        <h3>Sort by:</h3>
        <div className={classes['sort-container']}>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' defaultChecked={true} id='most-recent' onChange={setSortByHandler} />
                <label htmlFor='most-recent'>most recent</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='least-recent' onChange={setSortByHandler} />
                <label htmlFor='least-recent'>least recent</label>
            </div>
            <div className={classes['sort-item']}>
                <input type='radio' name='radio-button' id='priority' onChange={setSortByHandler} />
                <label htmlFor='priority'>priority</label>
            </div>
        </div>
    </Fragment>;
};

export default Sort;
