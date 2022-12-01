import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../TodoList";
import '../App.css'
type PropsType ={
    task: TaskType
    removeTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (id: string, IsDone: boolean, todolistID: string) => void
    changeTaskSpan: (todolistID: string, taskId: string, title: string) => void
    todolistID: string
}
const Task = React.memo((props: PropsType) =>{
const onClickHandler = () => props.removeTask(props.task.id, props.todolistID)
const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID,);
}
const changeTaskSpanHandler = (title: string) => {
    props.changeTaskSpan(props.todolistID, props.task.id, title)
}

return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler}
                      checked={props.task.isDone}
                      defaultChecked size="small"/>
            <EditableSpan title={props.task.title} callBack={changeTaskSpanHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <Delete/>
            </IconButton>
        </li>
    );
});

export default Task;