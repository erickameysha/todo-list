import React, {useState} from 'react';
import './App.css';
// import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type taskTypeProps = {
    id: string
    title: string
   isDone: boolean
}

function ButtonAppBar() {
    return null;
}

export type TasksStateType ={
    [key: string]: Array<taskTypeProps>
}
function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
    const changeTitleSpan = (todolistID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title} : el))
    }
    return (
        <div className="App">
            {/*<AppBar position='static' />*/}
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}} >
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
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
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                            <Todolist
                                changeTaskSpan={changeTaskSpan}
                                changeTitleSpan={changeTitleSpan}
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
                                </Paper>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
