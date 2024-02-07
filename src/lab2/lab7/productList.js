import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import {Context} from "./context";
import Button from "react-bootstrap/Button";
import useDidMountEffect from "./useDidMountEffect";

export default function ProductList({products}) {

    const [productDelete, setProductDelete] = useState('')

    useDidMountEffect(() => {
        alert("Видалено: " + productDelete.toString())
    }, [productDelete]);


    function ProductItem({title, id}) {
        const {dispatch} = useContext(Context)

        const deleteProduct = () => {
            dispatch({
                type: 'REMOVE_PRODUCT',
                payload: id,
            })
        }

        return (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <label>
                    <span>{title}</span>
                </label>
                <Button variant="danger" style={{display: "absolute", position: "right"}}
                        onClick={function (){
                            deleteProduct()
                            setProductDelete(title)
                        }
                        }
                >
                    🗑
                </Button>
            </ListGroup.Item>
        )
    }

    return (
        <ListGroup>
            {products.map(item => <ProductItem key={item.id} {...item} />)}
        </ListGroup>
    )
}