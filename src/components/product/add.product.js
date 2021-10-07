import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { numberValidator } from '../../constant'
import { onProductEdit, onProductInsert } from '../../redux/product/action'
import Header from '../admin/header';
import { useHistory, useParams } from 'react-router';
import {Button} from 'react-bootstrap'
import { onToastEdit, onToastInsert, onToastTrue } from '../../redux/toast/action';
import { onCategoryInsert } from '../../redux/category/action';

const AddProduct = (props) => {
    const products = useSelector(state => state.product.products);
    const productCategory = useSelector(state => state.pcategory)
    const history = useHistory();
    // const [index, setIndex] = useState(null);
    const params = useParams();
    const [category, setCategory] = useState(false)
    const [categoryInput, setCategoryInput] = useState('');
    const [arrayindex, setarrayindex] = useState(null)
    const [value, setvalue] = useState({
        id:'',
        name: '',
        categoryID: '',
        price: '',
        discount: '',
        image: '',
        totalPrice: ''
    })

    const [error, seterror] = useState({
        name: '',
        categoryID: '',
        price: '',
        discount: '',
        image: '',
        totalPrice: ''
    })
    useEffect(() => {
        const index = +params.index;
        if(props.location.pathname !== '/add-product'){
          let d=  products.filter((data,index1) =>  
            Number(data.id) === Number(params.index)
          )
          
          for(let i =0; i<products.length; i++){
              if(Number(products[i].id) === index){
                setarrayindex(i)         
              }
          }

        if(d.length !== 0) {
                    
            setvalue({
                id: d[0].id,
                name:d[0].name,
                categoryID:d[0].categoryID,
                price: d[0].price,
                discount:d[0].discount,
                image:d[0].image,
                totalPrice:d[0].totalPrice
                })
                // document.getElementById('leaveCode').value = products[index].categoryID
            } else {
                alert("product doesnot exist");
                props.history.push("/add-product");
            }
            // eslint-disable-next-line 
        }}, []);
    const dispatch = useDispatch()
    // const index = useSelector(state => state.product.index)
   
    const handlechange = (e) => {
        seterror({...error, [e.target.name] :'' })
        if (e.target.name === 'image') {
            console.log(e.target.files)
            if(e.target.files[0] && e.target.files[0].type.match('image.*')){
                if( e.target.files[0].size > 1000 || e.target.files[0].size < 2002448 ){
                    seterror({...error, image: ''})
                    let reader = new FileReader()   ;
                    reader.onload = function(e){
                        setvalue({...value, image: e.target.result})
                    } 
                    reader.readAsDataURL(e.target.files[0])
                    // setvalue({
                    //     ...value,
                    //     [e.target.name]: e.target.files[0]
                    // })
                }else{
                    seterror({...error, image: 'image size is 10kb to 2mb'})
                }
            }else{
                seterror({...error, image: 'Only accpect .jpg .png .svg'})
            }

        }else if(e.target.name === 'price'){
            let amount = e.target.value;
            let total = amount * value.discount /100
            setvalue({
                ...value,   
                [e.target.name]: e.target.value,
                totalPrice: amount - total
            })
        } else if(e.target.name === 'discount'){
            if(e.target.value.length <= 3){
                
                
            if(Number(e.target.value) <= value.price){
                seterror({...error, discount: ''})
                let amount = Number(e.target.value);
                let total = value.price * amount / 100
                setvalue({
                    ...value,   
                    [e.target.name]: e.target.value,
                    totalPrice: Number(value.price) - Number(total)
                })
            
            }else{
                seterror({...error, discount: `discount is not bigger then price ${value.price}`})
            }
            }else{  
                seterror({...error, discount: `discount is not bigger then 100%`})
            }
        } else {
            setvalue({
                ...value,   
                [e.target.name]: e.target.value
            })
            
        }
    }

    const handleSubmit = () => {
        if(!value.image  && !value.name && !value.price && !value.discount && !value.categoryID ){
            seterror({
                image:'this filed is required...',
                name:'this filed is required...',
                price:'this filed is required...',
                discount:'this filed is required...',
                categoryID : 'this filed is required...'
            })
        }else if(!value.image ){seterror({...error,image:'this filed is required...',})}
        else if(!value.name){ seterror({...error,name:'this filed is required...',})}
        else if(!value.price) { seterror({...error, price:'this filed is required...'})}
        else if(!value.discount){ seterror({...error,discount:'this filed is required...',})}
        else if(!value.categoryID){ seterror({...error,categoryID:'this filed is required...',})}
        else if ( !numberValidator.test(value.price)){ 
            seterror({...error, price:'this filed is only enter number'})
        }else if ( !numberValidator.test(value.discount)){ 
            seterror({...error, discount:'this filed is only enter number'})
        } else{ 
            if(params.index){
                let datap = value;
                let data = {
                    index : arrayindex,
                    data: datap
                }
                dispatch(onProductEdit(data))
                dispatch(onToastTrue())
                dispatch(onToastEdit())
                props.history.push("/list-products");
            }else{
            let data = value;
            data.id= Math.floor(Math.random() * 10000) 
            dispatch(onProductInsert(data))
            dispatch(onToastTrue())
            dispatch(onToastInsert())
            props.history.push('/list-products')
        }}   
    }

  
    return (
        <div>
            <Header/>
            <div className="add-product flex-column p-5" style={{backgroundColor:'rgb(233 52 91)', height:'900px'}} >
                <div className="form-product row w-50 m-auto bg-white rounded-3 p-5" >
                    <i  className="fas fa-arrow-left" onClick={() => history.push('/list-products')} style={{'&&hover': {
                    color:'red'
                    }}}></i>
                    <div className="col-12"><h1 className="text-center mb-5 text-dark">Add Product Form</h1></div>
                    <div className="col-6" >
                    
                    <input className="form-control" type="name"
                        value={
                            value.name
                        }
                        onChange={handlechange}
                        placeholder="Enter your name"
                        name="name"/>
                      <p className="text-danger small mt-2">{error.name && error.name}</p>
                    <input type="file" 
                        onChange={handlechange}
                        name="image"
                        id="productImage"
                        style={
                            {display: 'none'}
                        }/>
                        
                    <input type="number"
                    className="form-control"
                    placeholder="Enter Product Price"
                    value={
                        value.price
                    }
                    name="price"
                    onChange={handlechange}/>
                    <p className="text-danger small mt-2">{error.price && error.price}</p>
                   <input type="number" className="form-control"
                   placeholder="Enter Product Discount"
                        value={
                            value.discount
                        }
                        name="discount"
                        onChange={handlechange}/>
                          <p className="text-danger small mt-2">{error.discount && error.discount}</p>
                    
                    <select value={value.categoryID} onChange={handlechange} name="categoryID" id="leaveCode" className="form-select" defaultValue='' >
                        <option value=''>--- Product Category ---</option>
                        {productCategory.map((data, index) => (
                            <option key={index} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                    <p className="text-danger small mt-2">{error.categoryID && error.categoryID}</p>
                    <p className="mt-3">Do you have add a product category? </p>
                    <input type='radio' value='yes' name='categoryProduct' onChange={() => setCategory(true)} />Yes
                    <input type='radio' value='no' style={{marginLeft:'10px'}} name='categoryProduct'  onChange={() => setCategory(false)}/>No
                    {category ? <div>
                        <input type="text" className="form-control mt-3" value={categoryInput} onChange={(e) => {setCategoryInput(e.target.value)
                         }} placeholder="Enter Product Category"/> <Button onClick={()=> {
                            let data = {} 
                            data.id = Math.floor(Math.random() * 10000)
                            data.name = categoryInput
                            dispatch(onCategoryInsert(data))
                            setCategoryInput('') 
                            setCategory(false)
                            setTimeout(() => {
                                document.querySelector('#leaveCode').value = data.id
                            },1000)
                        }}>Add Category</Button></div>
                    :null }
                </div>
                <div className="col-6">

                    <Button className="w-100" onClick={
                        () => document.getElementById('productImage').click()
                    }> {params.index ? 'Edit Image' : 'Upload Image'}</Button>
                    <p className="text-danger small mt-2">{error.image && error.image}</p>
                  {!value.image?<img src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" width='100%' alt="product" />:<img src={value.image} alt="pro" width="100%" />}
                </div>
                <div className="col-12 mt-5">

                    <Button onClick={handleSubmit} className="w-100">Submit</Button>
                </div>


            </div>
        </div>
        </div>
    )
}

export default AddProduct
