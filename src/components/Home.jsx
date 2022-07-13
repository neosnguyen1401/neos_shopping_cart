import React from 'react'
import { CartState } from '../context/Context'
import { Filters } from './Filters';
import { SingleProduct } from './SingleProduct';

export const Home = () => {
  const { 
    state: { products },
    productState: { sort, byStock, byRating, byFastDelivery, searchQuery} 
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price -a.price
      )
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock > 0)   
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }

  return (
    <div className='bg-white dark:bg-slate-800 flex flex-col md:flex-row scroll-smooth'>
      <div><Filters /></div>
      
      <div className='flex w-full md:w-4/5 p-5 flex-wrap justify-around'>
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id}/>
        })} 
      </div>
    </div>
  )
}
