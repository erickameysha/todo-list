import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type  PropsType = {
    callBack: (title: string) => void
}
const AddItemForm = (props: PropsType) => {
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
        setError(false);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       id="standard-basic"
                       variant="standard"
                // error={error? 'Title is required': ''}
                       label={error ? 'Title is required' : 'add title'}
                       error={error}
            />
            {/*<button >+</button>*/}
            <Button onClick={addTask}
                    variant="contained"
                    size="small"

            >x</Button>

            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;