import React from 'react'
import { CartState } from '../context/Context'
import { Rating } from './Rating'

export const SingleProduct = ({ prod }) => {

  const {state:{cart}, dispatch} = CartState();

  return (
    <div className='rounded-xl m-2 bg-slate-300 dark:bg-slate-600 dark:text-white text-black'>
        <img src={prod.image} alt={prod.name} className='rounded-t-xl'/>
        <div className='px-4 pb-4'>
          <div className='font-semibold text-2xl text-center pt-2'>{prod.name}</div>
          
          <div className='py-2 flex flex-row justify-between'>
            <Rating rating={prod.ratings} />

            <span className='animate-pulse duration-70 ease-in'>{(prod.fastDelivery) ? 'Fast Delivery!' : ''}</span>
          </div>
          
          <div className='flex justify-between items-center'>
            <div className='text-3xl text-green-600 hover:font-semibold'>${prod.price}</div>
            
            {cart.some((p) => p.id === prod.id) ? (
              <button 
                className='rounded-md bg-red-600 hover:bg-red-700 p-2'
                onClick={() => {
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: prod,
                  });
                }}
              >
                Remove from Cart
              </button>
            ) : (
              <button 
                className='rounded-md bg-green-600 hover:bg-green-700 p-2' 
                disabled={prod.inStock === '0'}
                onClick={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: prod,
                  });
                }}
              >
                {prod.inStock === '0' ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
    </div>
  )
}
