import React, {ChangeEvent} from 'react';
import AppWithReducer, {FilterValuesType} from './AppWithReducer';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistsType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistsType
}

export function TodolistWithRedux({todolist}: PropsType) {


let taskForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.task[todolist.id])
   const dispatch= useDispatch()
    const removeTodolist = () => {
        // props.removeTodolist(props.todolistID)
        dispatch(removeTodolistAC(todolist.id))
    }
    const addPostHandler = (title: string) => {
        // props.addTask(title, props.todolistID,)
   dispatch(addTaskAC(title, todolist.id))
    }
    const changeTaskTitle = (title: string) => {
        // props.changeTitleSpan(props.todolistID, title)
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }
    const onAllClickHandler = () => dispatch(changeFilterAC(todolist.id, "all",));
    const onActiveClickHandler = () => dispatch(changeFilterAC(todolist.id, "active"));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(todolist.id,"completed"));


    if (todolist.filter === "active") {
        taskForTodolist = taskForTodolist.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        taskForTodolist = taskForTodolist.filter(t => t.isDone);
    }

    return <div>
        <div>
            <h3>

                <EditableSpan title={todolist.title} callBack={changeTaskTitle}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            {/*<button onClick={removeTodolist}>X</button>*/}
            {/*<Button  onClick={removeTodolist} variant="contained" >x</Button>*/}
        </div>

        <div>
            <AddItemForm callBack={addPostHandler}/>
        </div>
        <ul>
            {
                taskForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id,todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                       dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, todolist.id,));
                    }
                    const changeTaskSpanHandler = (title: string) => {
                       dispatch(changeTaskTitleAC( t.id, title, todolist.id,))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone}
                                  defaultChecked size="small"/>
                        <EditableSpan title={t.title} callBack={changeTaskSpanHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} size="small" variant={todolist.filter === 'all' ? "outlined" : "contained"}
                    color="secondary">All</Button>
            <Button onClick={onActiveClickHandler} size="small"
                    variant={todolist.filter === 'active' ? "outlined" : "contained"}
                    color="success">Active </Button>
            <Button onClick={onCompletedClickHandler} size="small"
                    variant={todolist.filter === 'completed' ? "outlined" : "contained"}
                    color="error">Completed</Button>

        </div>
    </div>
}
