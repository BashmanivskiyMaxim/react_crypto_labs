import React from 'react';
import Task1 from "../lab2/task1";


function Task2(){


    return (
        <div className='d-flex'>
            { counters.map(counter => (
                <Task1 initial={counter.initial} max={counter.max} min={counter.min} mykey={counter.id} key={counter.id} />
            ))
            }
        </div>
    );

}

const counters = [
    {id: 1, initial: 6, min: -5, max: 10},
    {id: 2, initial: 5},
    {id: 3}
]


export default Task2;
