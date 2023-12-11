import React, { useState } from 'react'
import { PRODUCTS } from '../data/product'
import { Product } from './Product'
import { LuSearch } from "react-icons/lu";
import '../css/styles.css'

export const Medicines = () => {
    const [filteredData, setFilteredData] = useState([])
    const [notSearching, setnotSearching] = useState(true)
    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = PRODUCTS.filter((value) => {
            return value.productName.toLowerCase().includes(searchWord.toLowerCase())
        })
        if(searchWord != "")
            setnotSearching(false)
        setFilteredData(newFilter)
    }

    return (
        <div className='shop'>
            <div className='shopTitle'>
                <h1>Gokulan Pharmacy</h1>
            </div>
            <div className='search'>
                <div className="searchInputs">
                    <input className='input' type='text' placeholder='Enter your search' onChange={handleFilter} />
                    {/* <div className="searchIcon">
                        <LuSearch />
                    </div> */}
                </div>

            </div>
            <div className='products'>
                {notSearching ? (
                        PRODUCTS.map((product) => (
                            <Product data={product} />
                        ))
                ): (
                    filteredData.map((product) => (
                        <Product data={product} />
                    ))
                )
                }
            </div>
        </div>
    )
}
