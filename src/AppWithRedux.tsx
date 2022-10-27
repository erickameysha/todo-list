import React, {memo, useCallback} from 'react';
import './App.css';

import {Todolist} from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodoListWithRedux";

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

export type TasksStateType = {
    [key: string]: Array<taskTypeProps>
}

const Fake = memo((props: any) => {
    console.log('fake')
    return <h1>{props.count}</h1>
})

function AppWithRedux() {


    console.log('App with call')
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)

    const dispatch = useDispatch()
    const removeTask = useCallback((id: string, todolistID: string) => {
        let action = removeTaskAC(id, todolistID)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [])


    const addTask = useCallback((title: string, todolistID: string,) => {
        dispatch(addTaskAC(title, todolistID))
    }, [])

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatch(action)
    }, [])

    const changeStatus = useCallback((id: string, IsDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(id, IsDone, todolistID))
    }, [])


    const changeFilter = useCallback((todolistID: string, newFilter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, newFilter))
    }, [])


    const changeTaskSpan = useCallback((todolistID: string, id: string, title: string,) => {
        dispatch(changeTaskTitleAC(id, title, todolistID))
    }, [])
    const changeTitleSpan = useCallback((todolistID: string, newTodolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }, [])
    return (
        <div className="App">
            {/*<AppBar position='static' />*/}
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((el) => {

                            let tasksForTodolist = tasks[el.id];


                            return (
                                <Grid item key={
                                    el.id
                                }>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={el.id}
                                            changeTaskSpan={changeTaskSpan}
                                            changeTitleSpan={changeTitleSpan}
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

export default AppWithRedux;
