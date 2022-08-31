import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, newID: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskSpan: (todolistID: string, taskId: string, title: string) => void
    changeTitleSpan: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter("all", props.todolistID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistID);
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addPostHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const changeTaskTitle = (title: string) => {
        props.changeTitleSpan(props.todolistID, title)
    }
    return <div>
        <div>
            <h3>

                <EditableSpan title={props.title} callBack={changeTaskTitle}/>
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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }
                    const changeTaskSpanHandler = (title: string) => {
                        props.changeTaskSpan(props.todolistID, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler}
                                          checked={t.isDone}
                                  defaultChecked size="small" />
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
            <Button onClick={onAllClickHandler} size="small" variant={props.filter === 'all' ? "outlined" : "contained"}
                    color="secondary">All</Button>
            <Button onClick={onActiveClickHandler}size="small" variant={props.filter === 'active' ? "outlined" : "contained"}
                    color="success">Active </Button>
            <Button onClick={onCompletedClickHandler}size="small" variant={props.filter === 'completed' ? "outlined" : "contained"}
                    color="error">Completed</Button>

        </div>
    </div>
}
