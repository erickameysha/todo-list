import{TasksStateType} from "../AppWithReducer";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


type  ActionType =
    removeTaskACType |
    addTaskACType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    addTodolistACType |
    removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

let initialState: TasksStateType = {}

export const  tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId1]:
                    state[action.payload.todolistId1].filter(el => el.id !== action.payload.id)
            }
        case "ADD-TASK": {

            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistID]: [task, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.IsDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.todolistId1]
            return state
        }
        default:

            return state
    }
}
export const removeTaskAC = (id: string, todolistId1: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId1}
    } as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistID}
    } as const
}
export const changeTaskStatusAC = (id: string, IsDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, IsDone, todolistID}
    } as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, title, todolistID}
    } as const
}