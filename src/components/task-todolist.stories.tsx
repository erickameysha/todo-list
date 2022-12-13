import {useEffect, useState} from "react";
import {taskAPI} from "./task-api";


export default {
    title: 'Task Api'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        taskAPI.getTask().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'fff'
        taskAPI.createTask(title).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const Delete = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const ID= '0bcea78d-5e27-4861-bc02-2587b233a4b4'
        taskAPI.deleteTask(ID).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}