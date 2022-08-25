import React, {useState} from 'react';
import './App.css';
// import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    console.log(tasks)

    function removeTask(id: string, todolistID: string) {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)});

    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        console.log(tasks
        )
    }


    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]});
    }

    const addTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({
            ...tasks,
            [newID]: []
        })

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }


    function changeFilter(value: FilterValuesType, newID: string) {
        // setFilter(value);
        setTodolists(todolists.map(el => el.id === newID ? {...el, filter: value} : el))
    }


    const changeTaskSpan = (todolistID: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title} : t)})
        console.log(tasks)
    }
    const changeTitleSpan = ( todolistID: string, title: string)=> {
        setTodolists(todolists.map(el=> el.id === todolistID? {...el, title}: el))
    }
    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map((el) => {

                    let tasksForTodolist = tasks[el.id];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            changeTaskSpan={changeTaskSpan}
                            changeTitleSpan={ changeTitleSpan}
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
