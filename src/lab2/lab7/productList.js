import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Product from "./product";

export default function ProductList({products}) {
    return (
        <ListGroup>
            {products.map(item => <Product key={item.id} title={item.data().title} id={item.id} />)}
        </ListGroup>
    )
}