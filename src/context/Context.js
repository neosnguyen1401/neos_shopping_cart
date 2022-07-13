import { createContext, useContext, useReducer } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducer';

const Cart = createContext();
faker.seed(99);

export const Context = ({ children }) => {
    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.animal.cat(),
        price: faker.commerce.price(50, 300, 0),
        image: faker.image.cats(300, 300, true),
        inStock: faker.finance.amount(0, 9, 0),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.finance.amount(1, 5, 0),
    }));

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    })

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ''
    })

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
        {children}
    </Cart.Provider>
  )
}

export const CartState = () => {
    return useContext(Cart)
}