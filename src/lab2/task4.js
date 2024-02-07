import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Task1 from "./task1";


function Task4() {

    let items = [
        {id: 1, name: "Mouse", min: 0, max: 15, price: 300},
        {id: 2, name: "Keyboards", min: 0, max: 8, price: 500},
        {id: 3, name: "PC", min: 0, max: 10, price: 1000},
    ]


    const Shop = () => {
        const [cart, setCart] = useState([]);

        const cartTotal = cart.reduce((total, {price}) => total + price, 0);

        const addToCart = (item) => {
            if(amountOfItems(item.id) < item.max){
                setCart((currentCart) => [...currentCart, item]);
            }
        }
        const removeFromCart = (item) => {
            if(amountOfItems(item.id) > item.min){
                setCart((currentCart) => {
                    const indexOfItemToRemove = currentCart.findIndex(
                        (cartItem) => cartItem.id === item.id
                    );

                    if (indexOfItemToRemove === -1) {
                        return currentCart;
                    }

                    return [
                        ...currentCart.slice(0, indexOfItemToRemove),
                        ...currentCart.slice(indexOfItemToRemove + 1)
                    ];
                });
            }
        };

        const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

        const listItemsInCart = () =>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><div>
                                <Button type={"submit"} style={{margin: "5px 5px 5px 5px"}} onClick={() => addToCart(item)}>+</Button>
                                <div style={{display: "inline"}}>{amountOfItems(item.id)}</div>
                                <Button type={"submit"} style={{margin: "5px 5px 5px 5px"}} onClick={() => removeFromCart(item)}>-</Button>
                            </div>
                            </td>
                            <td>{item.price * amountOfItems(item.id)}</td>
                        </tr>
                    ))
                }
                <tr>
                    <td>Totals</td>
                    <td></td>
                    <td></td>
                    <td>{cartTotal}</td>
                </tr>
                </tbody>
            </Table>


        return (
            <div>
                <div className="return">{listItemsInCart()}</div>
            </div>
        )
    }
    return(
        <Shop />
    )
}

export default Task4;