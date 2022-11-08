import { useContext } from 'react';
import Context from '../../context/context';
import { MdMenu } from 'react-icons/md';
import classes from './Banner.module.css';

const Banner = props => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const newDate = new Date();
    const date = {
        weekDay: newDate.toString().slice(0, 3),
        day: newDate.toString().slice(8, 10),
        month: months[newDate.getMonth()],
    }

    const context = useContext(Context);

    const showMenuHandler = () => {
        context.onShowMobileMenu();
    };

    return <div className={classes['container']}>
        <h1>{`${date.weekDay} ${date.day} ${date.month}`}</h1>
        <MdMenu size='2em' onClick={showMenuHandler} />
    </div>;
    // return <div className={classes['container']} style={{ backgroundImage: `url(${Image})` }} />;
};

export default Banner;
