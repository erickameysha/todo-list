import React, {ChangeEvent,  useCallback} from 'react';
import {FilterValuesType} from './AppWithReducer';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Task from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (todolistID: string, newFilter: FilterValuesType) => void
    addTask: (title: string, todolistID: string,) => void
    changeTaskStatus: (id: string, IsDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskSpan: (todolistID: string, taskId: string, title: string) => void
    changeTitleSpan: (todolistID: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist is called')
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistID, "all",), [props.changeFilter, props.todolistID]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistID, "active"),[props.changeFilter, props.todolistID]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistID, "completed"),[props.changeFilter, props.todolistID]);
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addPostHandler = useCallback((title: string) => {
        props.addTask(title, props.todolistID,)
    }, [props.addTask,props.todolistID])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTitleSpan(props.todolistID, title)
    }, [props.todolistID, props.changeTitleSpan])
    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    return <div key={props.todolistID}>
        <div>
            <h3>

                <EditableSpan title={props.title} callBack={changeTaskTitle}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
        </div>

        <div>
            <AddItemForm callBack={addPostHandler}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {


                    return <Task
                        task={t}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskSpan={props.changeTaskSpan}
                        todolistID={props.todolistID}
                    />
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} size="small" variant={props.filter === 'all' ? "outlined" : "contained"}
                    color="secondary">All</Button>
            <Button onClick={onActiveClickHandler} size="small"
                    variant={props.filter === 'active' ? "outlined" : "contained"}
                    color="success">Active </Button>
            <Button onClick={onCompletedClickHandler} size="small"
                    variant={props.filter === 'completed' ? "outlined" : "contained"}
                    color="error">Completed</Button>

        </div>
    </div>
})
