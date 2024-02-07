import React, { useState } from 'react';
import Button from "react-bootstrap/Button"

function Task1({initial, max, min}){

    const [count, setCount] = useState(initial);

    const handleClickUp = () => {
        if(count < max){
            setCount(count+1)
        }
    }

    const handleClickDown = () => {
        if(count > min){
            setCount(count-1)
        }
    }

    const handleClickReset = () => {
            setCount(initial)
    }

    return (
        <div className='d-flex' style={{display: "inline"}}>
            <div style={{padding: "15px"}}>Поточний рахунок: {count}</div>
            <div style={{padding: "5px 10px 30px"}}>
                <Button style={{margin: "5px 5px 5px 5px"}} onClick={handleClickUp}>+</Button>
                <Button style={{margin: "5px 5px 5px 5px"}} onClick={handleClickDown}>-</Button>
                <Button style={{margin: "5px 5px 5px 5px"}} onClick={handleClickReset}>Reset</Button>
            </div>
        </div>
    );

}

Task1.defaultProps = {
    initial: 0,
    max: 10,
    min: -10
}

export default Task1;
