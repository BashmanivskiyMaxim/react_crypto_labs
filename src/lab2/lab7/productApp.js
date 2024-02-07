import React, {useEffect, useLayoutEffect, useReducer, useRef, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ProductList from "./productList";
import reducer from './reducer'
import {Context} from './context'
import useDidMountEffect from "./useDidMountEffect";


function Task3() {

    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('products')) || [])
    const [ProductTitle, setProductTitle] = useState('')
    const [productAdd, setProductAdd] = useState('')


    useDidMountEffect(() => {
        alert("Додано: " + productAdd.toString())
    }, [productAdd]);


    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(state))
    }, [state])


    const addProduct = () => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: ProductTitle
        })
        setProductTitle('')
    }

    return (
        <Context.Provider value={{dispatch}}>
            <div className="container">
                <div className="input-field">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={ProductTitle}
                            onChange={event => setProductTitle(event.target.value)}
                        />

                        <Button onClick={function () {
                            addProduct()
                            setProductAdd(ProductTitle)
                        }} variant="primary">Додати</Button>
                    </InputGroup>
                </div>
                <ProductList products={state}/>
            </div>
        </Context.Provider>
    );


}


export default Task3;