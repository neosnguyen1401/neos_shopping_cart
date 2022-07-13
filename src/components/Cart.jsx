import React, { useState } from 'react'
import { useEffect } from 'react';
import { CartState } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai'

export const Cart = () => {

  const {state: {cart}, dispatch} = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
  }, [cart]);

  return (
    <div className='flex flex-col md:flex-row justify-around p-5 accent-green-600 bg-white dark:bg-slate-800 text-black dark:text-white'>
        <div className='w-full md:w-3/5'>
          {
            cart.map((prod) => (
              <span className='flex flex-row justify-between items-center mx-2 md:mx-5 mb-2 md:mb-5 p-2 shadow-xl bg-slate-200 text-black rounded-md hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-600 dark:text-white' key={prod.id}>
                <img src={prod.image} alt={prod.name} className='rounded-md w-16 h-16 md:w-20 md:h-20 object-cover' />

                <div className='w-full mx-3'>
                  <div className='flex flex-row items-start justify-between md:text-2xl md:mx-5'>
                    <span>{prod.name}</span>
                    <span className='text-green-600'>${prod.price}</span>
                  </div>
                </div>

                <div className='flex flex-row gap-2 items-center md:text-xl text-green-600'>
                  <form>
                    <select 
                      value={prod.qty}
                      onChange={(e) => {
                        dispatch({
                          type: 'CHANGE_CART_QTY',
                          payload: {
                            id: prod.id,
                            qty: e.target.value
                          }
                        })
                      }}
                    >
                      {[...Array(Number(prod.inStock)).keys()].map((x) => (
                        <option value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </form>

                  <AiFillDelete
                    className='text-2xl cursor-pointer text-red-600 hover:text-red-700' 
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: prod
                      })
                    }}
                  />
                </div>
              </span>
            ))
          }
        </div>

        <div className='text-xl'>
          <div className='flex flex-col items-center px-4 py-4 m-4 gap-4 border border-black bg-slate-200 dark:bg-slate-700'>
            <span>Subtotal ({cart.length}) products</span>
            <span>Total: ${total}</span>
            <button type='button' disabled={cart.length === 0} className='rounded-md bg-green-600 hover:bg-green-700 p-2 w-4/5'>
              Checkout
            </button>
          </div>
        </div>
    </div>
  )
}
