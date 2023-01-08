import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "b32f5f25-23a2-49a7-8139-79ea8f882efe"
    }
})


export const todolistAPI = {
    updateTodolis(title: string, id: string) {
        let promise = instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title: title})
        return promise

    },
    deleteTodolist(id: string) {
        let promise = instance.delete<ResponseType>(`todo-lists/${id}`,)
        return promise
    },
    createTodolist(title: string) {
        let promise = instance.post<ResponseType<{item:TodolistType}>>(`todo-lists`, {title},)
        return promise
    },
    getTodolist() {
        let promise = instance.get<TodolistType[]>('todo-lists',)
        return promise
    }


}
type ResponseType<T={}>={
    resultCode: number
    messages: string[],
    fieldsErrors:string[]
    data: T
}
type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
type UpdateTodolistType ={
    date:{},
    fieldsErrors:string[],
    messages:string[],
    resultCode: number
}
type DeleteTodolistType ={
    date:{},
    fieldsErrors:string[],
    messages:string[],
    resultCode: number
}
type CreateTodolistType={
    resultCode: number
    messages: string[],
    fieldsErrors:string[]
    data: {
        item: TodolistType
    }
}
