import React, {useContext, useState} from "react";
import {ProductContext} from "./productContext";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {deleteDoc, doc, getFirestore} from "firebase/firestore";

export default function Product({title, id}) {
    const {db} = useContext(ProductContext)


    function handleCheckDelete(title) {
        return alert("Видалено: " + title)
    }

    const deleteProduct = async () => {
        await deleteDoc(doc(getFirestore(db.firestore), "products", id))
    }

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <label>
                <span>{title}</span>
            </label>
            <Button variant="danger" style={{display: "absolute", position: "right"}}
                    onClick={function (){
                        handleCheckDelete(title)
                        deleteProduct()
                    }
                    }
            >
                🗑
            </Button>
        </ListGroup.Item>
    )
}