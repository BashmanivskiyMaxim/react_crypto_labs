import ProductList from "./productList";
import React from "react";

export default function(state, action) {
    switch (action.type) {
        case 'POPULATE_PRODUCTS':
            return []
        case 'ADD_PRODUCT':
            return [
                ...state,
                {
                    id: Date.now(),
                    title: action.payload

                }
            ]
        case 'REMOVE_PRODUCT':
            return state.filter(product => product.id !== action.payload)
        default:
            throw new Error();
    }
}