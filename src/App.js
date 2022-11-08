import { Fragment, useState } from 'react';
import classes from './App.module.css';
import Menu from './components/Menu/Menu';
import Banner from './components/Banner/Banner';
import NewToDo from './components/NewToDo/NewToDo';
import ToDoList from './components/ToDoList/ToDoList';

const Desktop = () =>
  <Fragment>
    <main>
      <Menu />
      <section>
        <Banner />
        <NewToDo />
        <ToDoList />
      </section>
    </main>
  </Fragment>;

const Mobile = () =>
  <div className={classes['mobile']}>
    <h3>Under development...<br />(Desktop only)</h3>
  </div>;

function App() {
  const [device, setDevice] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  window.onresize = function () {
    setDevice({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  if (device.width <= 900 || device.height <= 720) return <Mobile />;
  else return <Desktop />;
}

export default App;
