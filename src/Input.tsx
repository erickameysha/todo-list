import React, {useState} from 'react';
import FullInput from "./components/FullInput";

const Input = () => {
    let [message, setMessage] = useState([
        {message: 'message1'},
        {message: 'message2'},
        {message: 'message3'},
    ])
    const onClickButtonHandler = () => {
        console.log('r')
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <input />*/}
            {/*    <button>x</button>*/}
            {/*</div>*/}
            <FullInput onClickButtonHandler={onClickButtonHandler}/>
            {
                message.map((el, index)=> {
                    return(
                        <div key={index}>
                            {el.message}
                        </div>
                    )
                })


            }
        </div>
    );
};

export default Input;