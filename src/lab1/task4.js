import React from 'react';


const Task4 = () => {
    const product1 = {name: "keyboard"}

    class Product extends React.Component {
        constructor(props){
            super(props);
        }
        render(){
            return(
                <div>
                    I`m a {this.props.product.name}
                </div>
            )
        }
    }

    return (
        <div>
            <Product product={product1} />
        </div>
    );

}
export default Task4;