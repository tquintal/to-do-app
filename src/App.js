import { Fragment } from 'react';
import './App.module.css';
import Menu from './components/Menu/Menu';
import Banner from './components/Banner/Banner';
import NewToDo from './components/NewToDo/NewToDo';
import ToDoList from './components/ToDoList/List/ToDoList';

function App() {
  return <Fragment>
    <main>
      <Menu />
      <section>
        <Banner />
        <NewToDo />
        <ToDoList />
      </section>
    </main>
  </Fragment>;
}

export default App;
