import React, { useContext } from 'react'
import { MedicineContext } from './MedicineContext.js'
import { Link } from 'react-router-dom'

export const Product = (props) => {
    const {id, productName, price, productImage} = props.data
    const { addToCart, cartItems } = useContext(MedicineContext)
    const cartItemAmount = cartItems[id]
  return (
    <div className='product'>
        <img src={productImage}/>
        <div className='description'>
            <p><b>{productName}</b></p>
            <p>{price}Rs</p>
        </div>
       
        <div>
        <button className='addToCartBttn' onClick={() => addToCart(id)}>
            Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
        <Link style={{padding:5}} to={`/more/${id}`}>
            More
        </Link>
        </div>
    </div>
  )
}
