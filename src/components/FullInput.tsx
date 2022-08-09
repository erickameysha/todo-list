import React, {ChangeEvent, useState} from 'react';

type PropsType={
    onClickButtonHandler: ()=> void
}

const FullInput = (props: PropsType) => {
    let [title, setTitle] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(title)
    }
    return (
        <div>
            <input value={title} onChange={onChangeInputHandler}/><button onClick={props.onClickButtonHandler}>x
            </button>
        </div>
    );
};

export default FullInput;