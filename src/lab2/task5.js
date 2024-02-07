import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';


function Task5(){

    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    let attempts = 0

    const GuessTheNumber = () => {
        const [value, setValue] = useState("");
        const onChange = e => setValue(e.target.value);
        const [results, setResult] = useState([]);

        const [attempts, setattempts] = useState(0);
        const [CheckButton, setCheckButton] = useState('true')
        const [StartButton, setStartButton] = useState('')

        function Start(){
            setCheckButton('')
            randomNumber = Math.floor(Math.random() * 1000) + 1;
            setattempts(0)
            setResult([])
            setStartButton('true')
        }

        const onClick = () => {
            console.log(attempts)
            setattempts(attempts+1)
            if(attempts < 10){
                const userGuess = value;
                if (userGuess == randomNumber){
                    setResult((currentValue) => [...currentValue, <div style={{display: "inline"}} className="alert alert-success">Число вгадано!</div>]);
                    setCheckButton('true')
                }
                else if (userGuess > randomNumber)
                    setResult((currentValue) => [...currentValue, <div style={{display: "inline"}} className="alert alert-warning">N {"<"} {userGuess}</div>]);
                else if (userGuess < randomNumber && userGuess !== "")
                    setResult((currentValue) => [...currentValue, <div style={{display: "inline"}} className="alert alert-warning">N > {userGuess}</div>]);
                else setResult("");
            }
            else{
                setResult((currentValue) => [...currentValue, <div style={{display: "inline"}} className="alert alert-danger">Число {randomNumber} не вгадано!</div>]);
                setCheckButton('true')
                setStartButton('')
            }
        };

        return (
            <>
                <p className="lead">Число від 1 до 1000</p>
                <p className="lead">attempts: {attempts}</p>
                <Button disabled={StartButton} variant={"warning"} style={{margin: "5px 5px 5px 5px", height: "40px"}} type="submit" onClick={() => Start()}>
                    New game
                </Button>
                <input style={{height: "30px"}} value={value} type="number" onChange={onChange} />
                <Button disabled={CheckButton}  variant={"success"} style={{margin: "5px 5px 5px 5px", height: "40px"}} type="submit" onClick={onClick}>
                    Check
                </Button>
                <br />
                <br />
                {results}
            </>
        );
    };


    return (
        <GuessTheNumber/>
    );

}


export default Task5;