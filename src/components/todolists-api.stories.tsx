import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistAPI} from "./todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
   todolistAPI.getTodolist().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title ='aaaaaaa'
  todolistAPI.createTodolist(title).then((res) => {
            setState(res.data.data.item)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const id=  'be836dc8-1bb6-4b1e-bf97-58597d4af882'
       todolistAPI.deleteTodolist(id)
        .then((res) => {
          setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const id=  'dab449eb-5b86-4630-a63b-4607b511545a'
        const title ='kuk'
            todolistAPI.updateTodolis(title, id).then((res) => {
            setState(res.data)
        })


    }, [])

    return <div>{JSON.stringify(state)}</div>
}

