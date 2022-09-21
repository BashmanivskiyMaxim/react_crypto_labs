import React from 'react';


const Task3 = () => {
    const product1 = {name: "Mouse"}

    function Product(props){
        return(
            <div>
                I`m a {props.product.name}
            </div>
        )
    }
    return (
        <div>
            <Product product={product1} />
        </div>
    );

}
export default Task3;