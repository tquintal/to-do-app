import classes from './Menu.module.css';
import AddCategory from './AddCategory/AddCategory';
import Categories from './Categories/Categories';
import Actions from './Actions/Actions';
// import Footer from './Footer/Footer';

const Menu = props => {
    return <div className={classes['container']}>
        <div className={classes['app-title-container']}>
            <h2>To Do App</h2>
        </div>
        <AddCategory />
        <Categories />
        <Actions />
        {/* <Footer /> */}
        {/* <ul style={{ textAlign: 'center', marginTop: '15px' }}>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
            <li>Content</li>
        </ul> */}
    </div>;
};

export default Menu;
