import { Fragment } from 'react';
import './App.module.css';
import Menu from './components/Menu/Menu';
import Banner from './components/Banner/Banner';
import ToDoList from './components/ToDoList/List/ToDoList';

function App() {
  return <Fragment>
    <main>
      <Menu />
      <section>
        <Banner />
        <ToDoList />
      </section>
    </main>
  </Fragment>;
}

export default App;
