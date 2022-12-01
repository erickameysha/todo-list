import {Provider} from "react-redux";
import {AppRootStateType, } from "../state/store";
import {combineReducers, createStore, legacy_createStore} from 'redux'
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";
import {todolistReducer} from "../state/todolists-reducer";

const rootReducer = combineReducers({
    task: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    task: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator =(story:any)=>{
return <Provider store={storyBookStore}>{story()}</Provider>
}
