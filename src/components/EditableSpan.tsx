import React, {ChangeEvent, useState} from 'react';
// import * as fs from "fs";
type propsType = {
    title: string
callBack: (title: string)=> void
}
const EditableSpan = (props: propsType) => {
    const [title, setTitle] = useState(props.title)
    const [editSpan, setEditSpan] = useState(false)
    const onDoubleClickHandler = () => {
        setEditSpan(true)
    }
    const onBlurHandler = () => {
        props.callBack(title)
        setEditSpan(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(title)
    }
    return editSpan
        ? <input onBlur={onBlurHandler}  onChange={onChangeHandler} autoFocus value={title} type="text"/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
};

export default EditableSpan;