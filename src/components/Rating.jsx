import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export const Rating = ({ rating, onClick }) => {
  return (
    <div className='flex flex-row items-center gap-1'>
        {
            [...Array(5)].map((_, i) => (
                <span key={i} onClick={() => onClick(i)} className='cursor-pointer hover:animate-spin duration-300 ease-out'>
                    {rating > i ? (
                        <AiFillStar fontSize='15px' />
                    ) : (
                        <AiOutlineStar fontSize='15px' />
                    )}
                </span>
            ))
        }
    </div>
  )
}
