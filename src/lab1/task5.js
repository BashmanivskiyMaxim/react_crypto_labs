import React from 'react';

const Task5 = () => {

    const cities = [
        {id: 1, name: "Chicago", image: 'chicago.jpg'},
        {id: 2, name: "Los Angeles", image: 'los-angeles.jpg'},
        {id: 3, name: "New York", image: 'new-york.jpg'}
    ]

    class City extends React.Component {
        render(){
            return <option>{this.props.city.name}</option>
        }
    }

    class List extends React.Component {
        render(){
            return(
                <select name='' id="cities">
                    {this.props.data.map((city) => <City key={city.id} city={city}></City>)}
                </select>
            )
        }
    }

    return (
        <List data={cities}></List>
    );
}
export default Task5;