import React, {useState} from 'react';

const Task6 = () => {

    const options = [
        {value: 'red', text: 'red'},
        {value: 'blue', text: 'blue'},
        {value: 'black',text: 'black'}
    ]

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    class Product extends React.Component{
        constructor(props){
            super(props)
            //this.state = {color: "red"}
        }

        handleChange = event => {
            //this.setState({color: event.target.value})
            setSelectedOption(event.target.value);
        };

        render(){
            return(<div>
                <h2>I am a {selectedOption} Product!</h2>
                <select value={selectedOption} onChange={this.handleChange}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>)
        }

    }


    return (
        <div>
            <Product/>
        </div>

    );
}
export default Task6;