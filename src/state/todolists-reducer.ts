import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type ActionType = removeTodolistACType | addTodolistACType |changeFilterACType| changeTodolistTitleACType
export const todolistReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            // setTodolists(todolists.filter(el => el.id !== todolistID))
            // delete tasks[todolistID]
            // console.log(tasks
            // )
            return state.filter(el=> el.id !==action.payload.todolistId1)
        }
        case "ADD-TODOLIST":{
            let newID = v1()
            let newTodolist: TodolistsType = {id: newID, title:action.payload.newTodolistTitle, filter: 'all'}
            // setTodolists([...todolists, newTodolist])
            // setTasks({
            //     ...tasks,
            //     [newID]: []
            // })
return [...state, newTodolist ]
        }
        case "CHANGE-TODOLIST-TITLE": {
            // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title} : el))
            return  state.map(el=> el.id ===action.payload.todolistID ? {...el, title: action.payload.newTodolistTitle}: el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, filter: action.payload.newFilter} : el)
        }
        default: return state
    }
}
export const removeTodolistAC = (todolistId1: string) => {
  return {
      type: 'REMOVE-TODOLIST',
      payload:{todolistId1 }
  }as const
}
export const addTodolistAC = (newTodolistTitle: string) => {
  return { type: 'ADD-TODOLIST', payload:{ newTodolistTitle}}as const
}
export const changeTodolistTitleAC = (todolistID: string, newTodolistTitle: string) => {
  return{
      type: 'CHANGE-TODOLIST-TITLE',
      payload : {todolistID, newTodolistTitle}
  }as const
}
export const changeFilterAC = (todolistId2: string, newFilter:FilterValuesType ) => {
  return { type: 'CHANGE-TODOLIST-FILTER',
 payload: {
     todolistId2,
     newFilter
 }
  }as  const
}