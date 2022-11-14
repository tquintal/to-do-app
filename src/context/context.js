import React, { useEffect, useState } from 'react';

import { testToDos } from './testToDos';

const Context = React.createContext({
    // TODO HANDLING
    toDos: [],
    categories: [],
    mobileMenu: [],
    onShowMobileMenu: () => { },
    onAddToDo: () => { },
    onCategoryAdd: () => { },
    onCategoryDelete: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onCategoryEdit: () => { },
    onPriorityChange: () => { },

    // DISPLAY
    groupBy: [],
    displayToDos: [],
    setDisplayToDos: () => { },
    setSortBy: () => { },
    setGroupBy: () => { },
    setSearch: () => { },

    // ACTIONS
    onRestoreAll: () => { },
    onDeleteAllPermanently: () => { },
    onReset: () => { },
    onImportTodos: () => { }
});

export const ContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('Categories')) || ['None']);
    const [displayToDos, setDisplayToDos] = useState([]);
    const [groupBy, setGroupBy] = useState('all');
    const [sortBy, setSortBy] = useState('most-recent');
    const [searchBy, setSearchBy] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const setShowMobileMenuHandler = () => {
        setShowMobileMenu(prevState => !prevState);
    };

    const setGroupByHandler = group => {
        console.log(`SET_GROUP_BY: ${group}`);
        setGroupBy(group);
        displayToDosHandler(group, sortBy, searchBy, toDos);
    };

    const setSortByHandler = sort => {
        console.log(`SET_SORT_BY: ${sort}`);
        setSortBy(sort);
        displayToDosHandler(groupBy, sort, searchBy, toDos);
    };

    const setSearchByHandler = search => {
        console.log(`SET_SEARCH_BY: ${search}`);
        setSearchBy(search);
        displayToDosHandler(groupBy, sortBy, search, toDos);
    };

    // DISPLAY TODOS
    const displayToDosHandler = (group, sort, search, todos) => {
        console.log('-----------------------------------');
        console.log('RENDER_TODOS');

        if (sort === 'least-recent') {
            console.log(`RENDER_TODOS_SORT_BY: ${sort}`);
            setDisplayToDos(() => todos);
        } else if (sort === 'priority') {
            console.log(`RENDER_TODOS_SORT_BY: ${sort}`);
            todos = [...todos.filter(toDo => toDo.highPriority), ...todos.filter(toDo => !toDo.highPriority)];
            setDisplayToDos(() => todos);
        } else {
            console.log(`RENDER_TODOS_SORT_BY: ${sort || sortBy}`);
            todos = todos.map(todo => { return { ...todo, created: new Date(todo.created) } }); // TRANSLATE STRING TO DATE
            setDisplayToDos(() => todos.sort((a, b) => b.created - a.created)); // SORT BY MOST RECENT
        };

        console.log(`RENDER_TODOS_GROUP_BY: ${group || groupBy}`);
        if (group === 'today') {
            let today = new Date().toString().slice(0, 10);

            todos = todos.map(todo => {
                return { ...todo, created: new Date(todo.created) } // TRANSLATE STRING TO DATE
            });

            todos = todos.filter(todo => todo.created.toString().slice(0, 10) === today);
        } else if (group !== 'all' && group !== '' && group !== 'deleted') {
            todos = todos.filter(todo => todo.category.toLowerCase() === group.toLowerCase());
        } else if (group === 'deleted') {
            todos = todos.filter(todo => todo.deleted);
        };

        console.log(`RENDER_TODOS_SEARCH_BY: ${search || searchBy}`);
        if (search !== '')
            todos = todos.filter(todo => todo.content.toLowerCase().includes(search.toLowerCase()));

        setDisplayToDos(() => todos);
        console.log('-----------------------------------');
    };

    // CLEARS TODOS ON VERSION CHANGE AND LOADS TODOS ON APP STARTUP
    useEffect(() => {
        const appVersion = '1.0.16';
        const storageVersion = JSON.parse(localStorage.getItem('Version')) || '';
        if (storageVersion !== appVersion) {
            localStorage.removeItem('ToDos');
            localStorage.removeItem('Version');
            localStorage.removeItem('Categories');
            localStorage.setItem('Version', JSON.stringify(appVersion));

            // TEMP 🛑
            localStorage.setItem('ToDos', JSON.stringify(testToDos));
            setToDos(testToDos);
            displayToDosHandler(groupBy, sortBy, searchBy, testToDos);

            let updatedCategories = ['None'];
            for (let i = 0; i < testToDos.length; i++) {
                if (!updatedCategories.find(el => el === testToDos[i].category))
                    updatedCategories.push(testToDos[i].category);
            };

            setCategories(() => {
                localStorage.setItem('Categories', JSON.stringify(updatedCategories));
                return updatedCategories
            });
        } else
            displayToDosHandler(groupBy, sortBy, searchBy, toDos);
    }, []);

    // IMPORT
    const importToDosHandler = todos => {
        setToDos(() => {
            const updatedToDos = todos.concat();
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });

        let updatedCategories = ['None'];
        for (let i = 0; i < todos.length; i++) {
            if (!updatedCategories.find(el => el === todos[i].category))
                updatedCategories.push(todos[i].category);
        };

        setCategories(() => {
            localStorage.setItem('Categories', JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // NEW TODO
    const addToDoHandler = (toDo, category, highPriority) => {
        setToDos(prev => {
            const updatedToDos = [...prev];
            updatedToDos.push({
                id: Math.random().toString(),
                content: toDo,
                created: new Date(),
                category: category,
                highPriority: highPriority,
                completed: false,
                deleted: false
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            console.log('To do added ✅');
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // NEW CATEGORY
    const addCategoryHandler = newCategory => {
        setCategories(prevCat => {
            const updatedCat = [...prevCat];
            updatedCat.push(newCategory);
            localStorage.setItem('Categories', JSON.stringify(updatedCat));
            console.log('Category added ✅');
            return updatedCat;
        });
    };

    // DELETE CATEGORY
    const deleteCategoryHandler = category => {
        setCategories(prev => {
            const updatedCategories = [...prev].filter(cat => cat !== category);
            localStorage.setItem('Categories', JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // COMPLETE TODO
    const completeHandler = id => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(toDo => {
                if (toDo.id === id)
                    return { ...toDo, completed: !toDo.completed };
                else return toDo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // EDIT TODO
    const editHandler = (id, toDoContent) => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(toDo => {
                if (toDo.id === id) return { ...toDo, content: toDoContent };
                else return toDo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // EDIT TODO CATEGORY
    const editCategoryHandler = (id, category) => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(todo => {
                if (todo.id === id) return { ...todo, category: category };
                else return todo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // EDIT TODO PRIORITY 
    const editPriorityHandler = id => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(toDo => {
                if (toDo.id === id) return { ...toDo, highPriority: !toDo.highPriority };
                else return toDo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // DELETE/RECOVER TODO
    const deleteHandler = id => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(todo => {
                if (todo.id === id) return { ...todo, deleted: !todo.deleted };
                else return todo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });
    };

    // RESTORE ALL DELETED TODOS
    const restoreAllHandler = () => {
        setToDos(prev => {
            const updated = [...prev].map(todo => {
                return { ...todo, deleted: false }
            });
            localStorage.setItem('ToDos', JSON.stringify(updated));
            displayToDosHandler(groupBy, sortBy, searchBy, updated);
            return updated;
        });
    };

    // DELETE ALL PERMANENTLY
    const deleteAllPermanentlyHandler = () => {
        setToDos(prev => {
            const updated = [...prev].filter(todo => !todo.deleted);
            console.table(updated);
            localStorage.setItem('ToDos', JSON.stringify(updated));
            displayToDosHandler(groupBy, sortBy, searchBy, updated);
            return updated;
        });
    };

    // RESET / DELETE ALL
    const resetHandler = () => {
        setToDos(() => {
            const updatedToDos = [];
            localStorage.removeItem('ToDos');
            displayToDosHandler(groupBy, sortBy, searchBy, updatedToDos);
            return updatedToDos;
        });

        setCategories(() => {
            const updatedCat = ['None'];
            localStorage.setItem('Categories', JSON.stringify(updatedCat));
            return updatedCat;
        });
    };

    return (
        <Context.Provider
            value={{
                // TODO HANDLING
                toDos: toDos,
                categories: categories,
                mobileMenu: showMobileMenu,
                onShowMobileMenu: setShowMobileMenuHandler,
                onAddToDo: addToDoHandler,
                onCategoryAdd: addCategoryHandler,
                onCategoryDelete: deleteCategoryHandler,
                onComplete: completeHandler,
                onEdit: editHandler,
                onDelete: deleteHandler,
                onCategoryEdit: editCategoryHandler,
                onPriorityChange: editPriorityHandler,

                // DISPLAY
                displayToDos: displayToDos,
                groupBy: groupBy,
                setDisplayToDos: displayToDosHandler,
                setSortBy: setSortByHandler,
                setGroupBy: setGroupByHandler,
                setSearch: setSearchByHandler,

                // ACTIONS
                onRestoreAll: restoreAllHandler,
                onDeleteAllPermanently: deleteAllPermanentlyHandler,
                onReset: resetHandler,
                onImportTodos: importToDosHandler
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Context;
