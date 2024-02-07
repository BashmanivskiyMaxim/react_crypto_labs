import React from 'react';


const Task7 = () => {

    function getData(callback) {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(results => {
                return results.json();
            })
            .then(callback);
    }



    class User extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null, username: null, address: null
            };
            this.props.getData(data => this.setState({data}));
        }

        _renderUsers() {
            return (
                <ol>
                    {
                        this.state.data.map(user =>
                            <li onClick={() => this.setState(
                                {username: user.username, address: user.address.street + ',' + user.address.suite + ',' + user.address.city})}
                                key={user.id}>{user.name}</li>)
                    }
                </ol>
            );
        }
        render() {
            return (
                <div>
                    <div style={{float: 'left', display: 'inline-block', border: 'solid', margin: '10px 10px 10px 10px', width: '210px', height: "285px"}}>
                        <b>User List</b>
                        {this.state.data && this._renderUsers()}
                    </div>
                    <div style={{float: 'left', display: 'inline-block', margin: '10px 10px 10px 10px', border: 'solid', width: '210px', height: "285px"}}>
                            <b>User View</b><br />
                            <b>Username:</b> {this.state.username}<br />
                            <b>Address:</b> {this.state.address}
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <User getData={getData}/>
        </div>

    );
}
export default Task7;