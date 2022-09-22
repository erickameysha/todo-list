import React from 'react';
import './App.css';

import {Todolist} from "./TodoList";
import AddItemForm from "./components/AddItemForm";
import { Container, Grid, Paper} from "@mui/material";
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

export type TasksStateType ={
    [key: string]: Array<taskTypeProps>
}
function AppWithRedux() {



    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state=> state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.task)

const dispatch = useDispatch()
    function removeTask(id: string, todolistID: string) {
        let action =removeTaskAC(id, todolistID)
        dispatch(action)
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }


    function addTask( title: string,todolistID: string,) {
        dispatch(addTaskAC( title, todolistID))
    }

    const addTodolist = (newTitle: string) => {
       let action =addTodolistAC(newTitle)
        dispatch(action)
    }

    function changeStatus(id: string, IsDone: boolean, todolistID: string) {
       dispatch(changeTaskStatusAC(id, IsDone, todolistID))
    }


    function changeFilter(todolistID: string, newFilter:FilterValuesType ) {
               dispatch(changeFilterAC( todolistID, newFilter))
    }


    const changeTaskSpan =  (todolistID: string,id: string, title: string, ) => {
        dispatch(changeTaskTitleAC(id, title, todolistID))
    }
    const changeTitleSpan = (todolistID: string, newTodolistTitle: string) => {
        dispatch( changeTodolistTitleAC(todolistID, newTodolistTitle))
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



                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                            <TodolistWithRedux
                                key={el.id}
                            todolist={el}
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
