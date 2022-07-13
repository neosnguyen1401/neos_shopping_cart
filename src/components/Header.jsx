import React from 'react'
import {MdLightMode} from 'react-icons/md'
import {MdDarkMode} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import './Dropdown.css'

export const Header = ({ darkTheme, setDarkTheme }) => {

  const {state: {cart}, dispatch, productDispatch} = CartState();

  return (
    <div className='flex flex-row justify-between items-center bg-black text-white'>
      <div className='my-2 mx-4 text-2xl'>
        <Link to="/">Cat Shop</Link>
      </div>

      <div className='flex flex-row items-center gap-2 w-2/5 md:w-3/5'>
        <input 
          type="text"
          placeholder='Search in Shop'
          className='border rounded-md px-2 py-1 w-full text-black'
          onChange={(e) => {
            productDispatch({
              type: 'FILTER_BY_SEARCH',
              payload: e.target.value
            })
          }}
        />

        <div className='dropdown relative inline-block'>
          <button className='dropbtn rounded-md bg-green-600 p-2 flex flex-row gap-1 hover:bg-green-700 duration-500 ease-in-out'>
            <FaShoppingCart className='text-xl'/>
            
            <div className='rounded-full px-1 bg-red-600 text-white text-sm'>
              {cart.length}
            </div>
          </button>

          <div className='dropdown-content absolute hidden bg-slate-200 rounded-md shadow-xl w-80 right-0 text-center py-4 z-10'>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className='flex flex-row justify-between items-center mx-5 mb-5 text-black shadow-md p-2 hover:bg-slate-300 duration-500 ease-in-out' key={prod.id}>
                      <img src={prod.image} alt={prod.name} className='rounded-full w-12 h-12 object-cover' />

                      <div className='w-full mx-4'>
                        <div className='flex flex-col items-start'>
                          <span>{prod.name}</span>
                          <span>${prod.price}</span>
                        </div>
                      </div>

                      <AiFillDelete 
                        className='text-3xl cursor-pointer text-red-600 hover:text-red-700'
                        onClick={() => {
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: prod
                          })
                        }}
                      />
                    </span>
                  ))}

                  <Link to='/cart'>
                    <button className='w-4/5 mx-2 p-2 rounded-md bg-green-600 hover:bg-green-700 duration-500 ease-in-out'>
                      Go to Cart
                    </button>
                  </Link>
                </>
              ) : (
                <span className='text-black'>Cart is Empty</span>
              )}
          </div>
        </div>
      </div>

      <button type='button' onClick={() => setDarkTheme(!darkTheme)}
        className='m-2 bg-black dark:bg-white text-white dark:text-black border rounded-full p-2 items-center hover:animate-pulse duration-500 ease-in-out'
      >
        {darkTheme ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  )
}