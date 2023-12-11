import React, { useContext } from 'react'
import { PRODUCTS } from '../data/product'
import { MedicineContext } from './MedicineContext.js'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import '../css/styles.css'

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(MedicineContext)
    const navigate = useNavigate()
    return (
        <div className='cart'>
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className='cartItems'>
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] != 0) {
                        return <CartItem data={product} />
                    }
                }
                )}
            </div>
            {getTotalCartAmount() > 0 ?
                <div class='checkout'>
                    <p>Subtotal: {getTotalCartAmount()} Rs</p>
                    <button onClick={() => navigate('/Medicines')}> Continue Shopping</button>
                    <button>Checkout</button>
                </div>
                : <h1>Your cart is empty</h1>
            }
        </div>
    )
}
