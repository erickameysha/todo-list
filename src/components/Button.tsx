import React from 'react';
type PropsType ={
    callback: ()=> void
    buttonName:string
}
const Button = (props: PropsType) => {
    return (
        <button onClick={props.callback}>
            {props.buttonName}
        </button>
    );
};

export default Button;