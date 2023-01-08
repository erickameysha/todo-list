import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'ad653c9f-7f6e-4de5-b3d6-ac286fa8078e',
    },
})



export const todolistAPI = {
    getTodolists() {
        return instance.get<todolistType[]>('todo-lists')
            .then((res)=> res.data)
    },
    createTodolist(title: string){
        return  instance.post<ResponseType<{item:todolistType}>>('todo-lists', {title})
            .then((res)=> res.data)
    },
    deleteTodolist(todolistID:string){
        // const todolistID ='52497668-eb99-43d1-924f-67d1de26b395'
     return   instance.delete<ResponseType>(`todo-lists/${todolistID}`)
            .then((res)=> res.data)
    },
    updateTodolistTitle(todolistID: string,title:string ){
        // const todolistID ='6c2246f9-b1d3-4907-81ff-b25b0eea94de'
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
            .then(res=>
               res.data
            )

    },
    getTodolistTask(todolistID: string){
        return instance.get(`todo-lists/${todolistID}/tasks`)
            .then(res=>res.data)
    },
    createTask(todolistID: string,title:string){
        return instance.post(`todo-lists/${todolistID}/tasks`,{title}).then(res=> res.data)
    },
    changeTaskTitle(todolistID: string,title:string, taskID:string){
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, {title}).then(res=> res.data)
    },
    deleteTask(todolistID: string, taskID:string){
        return instance.delete(`todo-lists/${todolistID}/tasks/${taskID}`, ).then(res=> res.data)
    }

}

type todolistType={
    addedDate: string
    id:string
    order: number
    title: string
}

type ResponseType<T = {}> ={
    data: T
    messages:string[],
    fieldsErrors:string[],
    resultCode:number
}