import React, {useReducer, useState} from 'react';
import './App.css';
// import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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
function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTask] = useReducer(tasksReducer,{
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

        // dispatchTask({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)});

        let action =removeTaskAC(id, todolistID)
        dispatchTask(action)
    }

    const removeTodolist = (todolistID: string) => {

        let action = removeTodolistAC(todolistID)
        dispatchTodolists(action)
       dispatchTask(action)
    }


    function addTask( title: string,todolistID: string,) {

        dispatchTask(addTaskAC( title, todolistID))
    }

    const addTodolist = (newTitle: string) => {
        // let newID = v1()
        // let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: 'all'}
        // setTodolists([...todolists, newTodolist])
        // setTasks({
        //     ...tasks,
        //     [newID]: []
        // })

       let action =addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTask(action)

    }

    function changeStatus(id: string, IsDone: boolean, todolistID: string) {

        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, isDone} : t)})
        dispatchTask(changeTaskStatusAC(id, IsDone, todolistID))
    }


    function changeFilter(todolistID: string, newFilter:FilterValuesType ) {
        // setFilter(value);
        // setTodolists(todolists.map(el => el.id === newID ? {...el, filter: value} : el))
        dispatchTodolists(changeFilterAC( todolistID, newFilter))
    }


    const changeTaskSpan =  (todolistID: string,id: string, title: string, ) => {
        debugger
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title} : t)})
        // console.log(tasks)
        dispatchTask(changeTaskTitleAC(id, title, todolistID))
    }
    const changeTitleSpan = (todolistID: string, newTodolistTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title} : el))
        dispatchTodolists( changeTodolistTitleAC(todolistID, newTodolistTitle))
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

export default AppWithReducer;
