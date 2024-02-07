import React, {useReducer} from 'react';
import reducer from './reducer'
import ProductForm from "./productForm";
import {ProductContext} from './productContext'
import Db from "./db";


function ProductApp() {
    //const [stateItem, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('products')) || [])
    return (
        <ProductContext.Provider value={{db: new Db()}}>
            <ProductForm/>
        </ProductContext.Provider>
    );
}
export default ProductApp;