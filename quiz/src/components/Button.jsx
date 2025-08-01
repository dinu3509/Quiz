import React from 'react'
import Header from './Header'
const Button = (props) => {
  return (
    <div>
        <button className={`${props.isSelected  ? 'bg-gray-700 text-white' : 'bg-white'}   h-10 w-40 cursor-pointer text-center rounded-xl transition-all duration-200 ease-in-out` }onClick={props.onClick}>
            {props.title}
        </button>
    </div>
  )
}

export default Button