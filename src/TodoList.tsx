import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import Button from "./components/Button";
import s from  './Todolist.module.css'

type TaskProps = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    task: Array<TaskProps>
    deleteTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    createTask: (newTitle: string) => void
    changeIsDone: (taskID: string, isDone: boolean) => void
}


const TodoList = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {

            setTitle(e.currentTarget.value)
setError(false)


    }
    const onClickButtonHandler = () => {
        if (title.trim() !== ''){

            props.createTask(title.trim())
            setTitle('')
        }else {
            setError(true)
        }

    }

    const universalButton = (value: FilterValueType) => {
        props.changeFilter(value)

    }
    const onKeyPressButtonHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' ? onClickButtonHandler() : e
    }
    return (
        <div>
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <input className={error ?s.error: ''}
                    onKeyPress={onKeyPressButtonHandler} value={title}
                       onChange={onChangeInputHandler}/>
                {/*<button  onClick={onClickButtonHandler}>+</button>*/}
                <Button callback={onClickButtonHandler} buttonName={'X'}/>

            </div>
            {error &&  <div className={s.errorText}>Title is Required</div>}
            <ul>
                {
                    props.task.map(e => {
                        const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(e.id, event.currentTarget.checked)
                        }
                        return (
                            <li key={e.id}><input checked={e.isDone} onChange={changeIsDoneHandler}
                                                  type="checkbox"/>
                                <button onClick={() => props.deleteTask(e.id)}>x</button>
                                <span>{e.title}</span></li>
                        )
                    })
                }
            </ul>
            <div>
                <Button callback={() => universalButton('all')} buttonName={'ALL'}/>
                <Button callback={() => universalButton('active')} buttonName={'active'}/>
                <Button callback={() => universalButton('completed')} buttonName={'completed'}/>
            </div>


        </div>
    );
};

export default TodoList;