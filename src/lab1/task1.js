import React from 'react';

const Task1 = () => {
    let myName = <strong>Max</strong>
    const myHeading = <h1>Hello, {myName}</h1>;
    return (
        <div id="result" children={myHeading}>
        </div>
    );

}
export default Task1;