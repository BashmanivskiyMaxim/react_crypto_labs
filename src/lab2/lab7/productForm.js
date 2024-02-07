import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import React, {useContext, useEffect, useState} from "react";
import {ProductContext} from "./productContext";
import useDidMountEffect from "./useDidMountEffect";
import ProductList from "./productList";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";



const ProductForm = () => {

    const [ProductTitle, setProductTitle] = useState('')
    const [productAdd, setProductAdd] = useState('')
    const {db} = useContext(ProductContext)

    const [value, loading, error] = useCollection(collection(getFirestore(db.app), "products"))

    class Loading {
        constructor() {
            this.title = 'loading'
            this.id = 0
        }

        data() {
            return {title: this.title}
        }
    }



    useDidMountEffect(() => {
        alert("Додано: " + productAdd.toString())
    }, [productAdd]);


    //useEffect(() => {
    //    localStorage.setItem('products', JSON.stringify(dispatchItem.stateItem))
    //}, [dispatchItem.stateItem])

    const WriteItems = () => {
        if(loading){
            new Loading()
        } else return value.docs
    }


    const addProduct = async () => {
        const productsDb = collection(getFirestore(db.app), "products")
        await addDoc(productsDb, {
            title: ProductTitle
        })
        setProductTitle('')
    }

    return (
        <div className="container">
            <div className="input-field">
                <InputGroup>
                    <Form.Control
                        type="text"
                        value={ProductTitle}
                        onChange={event => setProductTitle(event.target.value)}
                    />
                    <Button onClick={function () {
                        addProduct().then(() => {
                            if (error) console.log(error)
                        })
                        setProductAdd(ProductTitle)
                    }} variant="primary">Додати</Button>
                </InputGroup>
            </div>
            <ProductList products={loading ? [new Loading()] : value.docs}/>
        </div>
    )
}

export default ProductForm;