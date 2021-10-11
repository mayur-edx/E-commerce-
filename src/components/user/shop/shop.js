import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCartInsert } from '../../../redux/cart/action'
import Header from '../header/header'
import DisplayCart from './display.cart'
import ProductNotFound from './not-found-product'

const Shop = () => {    
  
    // dispatch
    const dispatch = useDispatch()
    
    //selector
    const pcategory = useSelector(state => state.pcategory)
    const productsReducer = useSelector(state => state.product.products)

    // states  
    const [products, setproducts] = useState([]) 
    const [searchInput, setsearchInput] = useState('')
    const [priceState, setpriceState]= useState([]) 
    const [priceinput,setpriceinput] = useState({low:null, higest : null})
    const [value, setvalue] = useState({
        product:'',
        category:[],
    })

    //array
    let price = [
        {low:0,higest:0 },
        {low:10, higest : 1000},
        {low:1000,higest : 3000},
        {low:3000,higest : 9000},
        {low:9000,higest : 50000},
        {low:50000,higest : 100000},
    ]


    // useEffeact
    useEffect(() => {
        productsReducer && setproducts(productsReducer)
        // eslint-disable-next-line 
    }, [productsReducer])

    useEffect(() => {
            let data = products;
            if(value.category.length > 0) {
                 
                data = priceState.length > 0 ? priceState : productsReducer 
                let mainFilter=[]
                let filteredItems = [];
                value.category.forEach(category => {
                    const result = data.filter(el => {return Number(el.categoryID) ===  Number(category)});
                    if(result) {
                        filteredItems.push(result)
                    }
                    mainFilter = [];
                    filteredItems.map((data ,index)=> data.map(data => mainFilter.push(data)))
                    setproducts(mainFilter)
                });
            } else {
                setproducts(priceState.length > 0 ? priceState : productsReducer)
            }
            // eslint-disable-next-line 
    }, [value]);

    

    // method or function
    const handleAddCart = (data) => {
        let id = Math.ceil(Math.random() * 100000)
        data.cartID = id 
        dispatch(onCartInsert(data))
    }
    const handleSearch = (e) => {
        setsearchInput(e.target.value)
        let data = productsReducer
        let se = data.filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setproducts(se)
    }
    
    const handleCategory = (e) => {  
        if(e.target.checked){
            let data = value.category
            data.push(e.target.value)
            setvalue({...value, category:data })
        }else{
            let temdata = value.category
            let data = temdata.filter(data => data !== e.target.value)
            setvalue({...value, category:data})
        }
    }

    const handlePrice = (e) => {
        let val = JSON.parse(e.target.value)
        setpriceinput(val)
        let data = productsReducer
        console.log(data, 'data')
        if(val.low !== 0){
            
            if(value.category.length > 0){

                let tem1 = []
                let tem2 = []

                value.category.map(data => { 
                    let d= productsReducer.filter((data,index) => Number(data.categoryID)=== Number(data))
                    tem1.push(d)
                })

                tem1.map(data => data.map(item => tem2.push(item)))
                
                console.log(tem1)
                
                console.log(tem2)

                let filter1 = tem2.filter(data => Number(data.totalPrice) > Number(val.low))
                let filter2 = filter1.filter(data => Number(data.totalPrice) < Number(val.low))

                setproducts(filter2)

            }else{


            let tem1 = data.filter(data => Number(data.totalPrice) > Number(val.low))
            let tem2 = tem1.filter(data => Number(data.totalPrice) < Number(val.higest))
            
            setproducts(tem2)
            
            
            setpriceState(tem2)
            }        
        }else{
            setproducts(productsReducer)
        }
    }

    return (
        <div>
            <Header  />
            <div className="p-5" style={{backgroundColor:'gainsboro', minHeight:'100vh'}}>
            {
                productsReducer.length > 1 
                ?<div> 
                    <div className="row">    
                        <div className="col-3">
                            <div style={{height:'100%',backgroundColor:'white', display:'flex', flexDirection:'column'}} className="p-4">
                                <input type="text" className="form-control" value={searchInput} onChange={handleSearch} placeholder="serach product"/>
                                <hr />
                                <p className="text-secondary">Filter Price</p>
                                {
                                    price.map((data,index) => (
                                        <div style={{display:'flex'}} key={index}>
                                            <input type="radio" className="form-check" value={JSON.stringify(data)} name="price" onChange={handlePrice} /><span style={{marginLeft:'10px'}}>{data.low === 0 ? 'all' : data.low}{data.low === 0 ? '' : ' - ' }{data.higest === 0 ? null : data.higest}</span>
                                        </div>
                                    ))
                                }
                                <hr />
                                <p className="text-secondary">Filter Category</p>
                                {
                                    pcategory.map((data,index)=> (
                                        <div style={{display:'flex'}} key={index}>
                                            <input type="checkbox" className="form-check" value={data.id} name="category" onChange={handleCategory} /><span style={{marginLeft:'10px'}}>{data.name}</span>
                                        </div>      
                                    ))
                                }
                                <hr />
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row">

                                {products.length > 0 ? products.map((data,index) => (
                                    <div className="card-group col-xl-2 col-lg-3 col-md-2 col-sm-4 mb-4" key={index} >
                                        <DisplayCart handleAddCart={handleAddCart} data={data}  />
                                    </div>
                                )) :<ProductNotFound/> }
                            </div>    
                        </div>                    
                    </div>
                </div>      
                : <ProductNotFound/>
            }
                
            </div>
        </div>
    )
}   

export default Shop
