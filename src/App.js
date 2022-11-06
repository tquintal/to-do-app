import { Fragment } from 'react';
// import classes from './App.module.css';
import './App.module.css';
import Menu from './components/Menu/Menu';
import Banner from './components/Banner/Banner';
import NewToDo from './components/NewToDo/NewToDo';
import SearchToDo from './components/SearchToDo/SearchToDo';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  return <Fragment>
    <main>
      <Menu />
      <section>
        <Banner />
        <NewToDo />
        <SearchToDo />
        <ToDoList />
      </section>
    </main>
  </Fragment>;
}

export default App;
