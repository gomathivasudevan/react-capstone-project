import React from 'react'
import { PRODUCTS } from '../data/product'
import { useParams } from 'react-router-dom'

export default function More() {
    const { id } = useParams()
    const data = PRODUCTS.filter((prod) => {
        return prod.id == id
    })
    return (
        <div style={{marginRight:800, width: 1200, padding:10}} className='product'>
            <img src={data[0].productImage} />
            <div className='description'>
                <p><b>{data[0].productName}</b></p>
                <p>{data[0].moredetails}</p>
                <p>{data[0].price}Rs</p>
            </div>
        </div>
    )
}
