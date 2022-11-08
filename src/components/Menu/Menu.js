import { useContext } from 'react';
import Context from '../../context/context';
import classes from './Menu.module.css';
import { MdClose } from 'react-icons/md';
import AddCategory from './AddCategory/AddCategory';
import Categories from './Categories/Categories';
import Actions from './Actions/Actions';
// import Footer from './Footer/Footer';

const Menu = props => {
    const context = useContext(Context);

    const closeMenuHandler = () => {
        context.onShowMobileMenu();
    };

    return <div className={`${classes['container']} ${context.mobileMenu && classes['container-active']}`}>
        <div className={classes['app-title-container']}>
            <h2>To Do App</h2>
            <MdClose size='2em' onClick={closeMenuHandler} />
        </div>
        <AddCategory />
        <Categories />
        <Actions />
        {/* <Footer /> */}
    </div>;
};

export default Menu;
