import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistAPI} from "./todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
      todolistAPI.getTodolists()
          .then((res)=>{
              setState(res)
          })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.createTodolist('TEST KURWAAAAAAAAAAAAAAAAAA')
           .then((res)=> {
               debugger
               setState(res.data)
           })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='28f8d816-ba75-4bff-a8f4-701b8fcc6784'
       todolistAPI.deleteTodolist(todolistID).then((res)=> {
               setState(res)
           })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='68f957a5-f859-4d16-bd8c-68a242398331'
    todolistAPI.updateTodolistTitle(todolistID, 'UPDATE TITLE')
        .then((res)=>{
        debugger
            setState( res)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTask = () =>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='8eff56a5-5ce2-498a-bc87-d8b2dc6ef62d'
        todolistAPI.getTodolistTask(todolistID,)
            .then((res)=>{debugger
                setState( res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const CreateTask = () =>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='8eff56a5-5ce2-498a-bc87-d8b2dc6ef62d'
        todolistAPI.createTask(todolistID,'test')
            .then((res)=>{debugger
                setState( res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const ChangeTaskTitle = () =>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='8eff56a5-5ce2-498a-bc87-d8b2dc6ef62d'
        const taskID ='bd9de029-cf4a-4b78-b896-e07a8f0054a0'
        todolistAPI.changeTaskTitle(todolistID,'CHANGE-TITLE', taskID)
            .then((res)=>{
                setState( res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
//test1
//test 2
export const DeleteTaskTitle = () =>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID ='8eff56a5-5ce2-498a-bc87-d8b2dc6ef62d'
        const taskID ='bd9de029-cf4a-4b78-b896-e07a8f0054a0'
        todolistAPI.deleteTask(todolistID, taskID)
            .then((res)=>{
                setState( res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}