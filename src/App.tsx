import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList";
import {Simulate} from "react-dom/test-utils";

import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [task, setTask] = useState([
        {id: v1(), title: 'ts', isDone: true},
        {id: v1(), title: 's', isDone: false},
        {id: v1(), title: 's', isDone: true},
    ])
    const changeIsDone = (taskID: string, isDone: boolean) => {
        setTask(task.map(e=> e.id === taskID? {...e, isDone: isDone}: e))
    }
    const removeTask = (id: string) => {
        setTask(task.filter((e) => e.id !== id))
    }
    const addTask = (newTitle: string) => {

        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...task])
        console.log(newTitle)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')
    let taskForTodolist = task
    if (filter === 'active') {
        taskForTodolist = task.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = task.filter(t => t.isDone)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                deleteTask={removeTask}
                changeFilter={changeFilter}
                title={'js'}
                createTask={addTask}
                task={taskForTodolist}
                changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
