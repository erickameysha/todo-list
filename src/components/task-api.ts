import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/f757ac52-d064-495b-b0c1-aad6c6cd5da4/',
    withCredentials: true,
    headers: {
        "API-KEY": "b32f5f25-23a2-49a7-8139-79ea8f882efe"
    }
})

export const taskAPI = {
    getTask() {
        let promise = instance.get('tasks')
        return promise
    },
    createTask(title:string){
        let promise = instance.post(`tasks`,{title})
        return promise
    },
    deleteTask(ID:string){
        let promise = instance.delete(`tasks/${ID}`,)
        return promise
    }
}