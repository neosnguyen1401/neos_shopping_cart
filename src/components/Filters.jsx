import { CartState } from '../context/Context'
import { Rating } from './Rating'

export const Filters = () => {

  const {
    productState: {byStock, byFastDelivery, byRating, sort}, 
    productDispatch
  } = CartState()

  console.log({byStock, byFastDelivery, byRating, sort});

  return (
    <div className='flex flex-col items-center p-4 m-4 gap-4 text-xl border border-black shadow-xl accent-green-600 bg-slate-200 dark:text-white dark:bg-slate-700 md:m-8'>
      <h1 className='text-xl'>Filters Product</h1>

      <form className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <input type="radio" name='sort' id='pricedown' checked={sort === "highToLow" ? true : false} onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }/>
          <label htmlFor="pricedown">High to Low</label>
        </div>

        <div className='flex flex-row gap-1'>
          <input type="radio" name='sort' id='priceup' checked={sort === "lowToHigh" ? true : false} onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }/>
          <label htmlFor="priceup">Low to High</label>
        </div>

        <div className='flex flex-row gap-1'>
          <input type="checkbox" name="fastdeli" id="fastdeli" checked={byFastDelivery} onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }/>
          <label htmlFor="fastdeli">Fast Delivery Only</label>
        </div>
        
        <div className='flex flex-row gap-1'>
          <input type="checkbox" name="outstock" id="outstock" checked={byStock} onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }/>
          <label htmlFor="outstock">Include Out of Stock</label>
        </div>

        <div className='flex flex-row gap-1'>
          <label>Rating: </label>
          <Rating 
            rating={byRating} 
            onClick={(i) => 
              productDispatch({
                type: 'FILTER_BY_RATING',
                payload: i + 1
              })
          }/>
        </div>
      </form>

      <button 
        className='rounded-md bg-green-600 hover:bg-green-700 p-2 w-4/5'
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </button>
    </div>
  )
}
