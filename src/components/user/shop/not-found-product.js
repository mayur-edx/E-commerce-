import React from 'react'
import notFoundImage from './../../../assets/no-result-found.png'

const ProductNotFound = () => {
    return (
        <div style={{display:'flex', height:'100vh'}}>
                <div className="m-auto text-center">
                    <img src={notFoundImage} alt="not-found-img" />
                    <h6>Product not found</h6>
                </div>
        </div>
    )
}

export default ProductNotFound
