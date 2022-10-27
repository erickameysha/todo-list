import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, TextField} from "@mui/material";


type  PropsType = {
    callBack: (title: string) => void
}
export const AddItemForm = memo((props: PropsType) => {
    console.log('AddItemForm')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    const callBack = props.callBack
    const addTask = () => {
        if (title.trim() !== "") {
            callBack(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
     if (error)   setError(false);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>

            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       id="standard-basic"
                       variant="standard"
                       label={error ? 'Title is required' : 'add title'}
                       error={error}
            />
            <Button onClick={addTask}
                    variant="contained"
                    size="small"

            >x</Button>
        </div>
    );
});

export default AddItemForm;