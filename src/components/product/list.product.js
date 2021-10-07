import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from '../admin/header'
import {Button} from 'react-bootstrap'
import {onProductDelete} from '../../redux/product/action'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router'
import {Toast} from 'react-bootstrap'
import {onToastDelete, onToastFalse, onToastTrue} from '../../redux/toast/action'

const ListProduct = () => {
    const product = useSelector(state => state.product.products);
    const [active, setactive] = useState(1)
    const [sort, setsort] = useState(false)
    // eslint-disable-next-line
    const [productCategoryInput, setproductCategoryInput] = useState('')  
    const [page, setpage] = useState([])
    const [itemPerPage, setitemPerPage] = useState(5)
    const [products, setproducts] = useState([])

    const toast = useSelector(state => state.toast)
    const productCategory = useSelector(state => state.pcategory)
    const dispatch = useDispatch()

    useEffect(() => {
        if (product) {
            let main = product.filter((data, index) => index <= 5 - 1)
            setproducts(main)
            let p = product.length / itemPerPage
            for (let i = 1; i <= Math.ceil(p); i++) {
                setpage([
                    ...page,
                    page.push(i)
                ])
            }

        }
        // eslint-disable-next-line
    }, [product])

    useEffect(() => {
        let p = product.length / itemPerPage
        let pagenew = []
        for (let i = 1; i <= Math.ceil(p); i++) {
            pagenew.push(i);
            console.log("pagenew", pagenew);
            setpage(pagenew)
        }
        // eslint-disable-next-line
    }, [products])

    if (toast.show === true) {
        setTimeout(() => dispatch(onToastFalse()), 3000)
    }
    const history = useHistory();
    const handleEdit = (index) => { // dispatch(onProductInsertIndex(index));
        history.push("/edit-product/" + index);
    }
    const handleDelete = (id) => {
        dispatch(onProductDelete(id))
        dispatch(onToastTrue())
        dispatch(onToastDelete())
    }

    const handleProductCategory = (e) => {
        if (e.target.value !== '') {
            setproductCategoryInput(e.target.value)
            let temp = product;
            let filterData = temp.filter((item) => Number(item.categoryID) === Number(e.target.value))
            setproducts(filterData)
        } else {
            setproducts(product)
        }
    }

    const handleDisplay = (categoryID) => {
        return productCategory.filter(data => Number(data.id) === Number(categoryID)).map(item => item.name)
    }
    const handleItemPerPage = (e) => {
        setitemPerPage(e.target.value)
        let main = product.filter((data, index) => index <= Number(e.target.value) - 1)
        setproducts(main)
        setactive(1)
    }

    const handlePage = (index) => {
        setactive(index + 1);
        let result = itemPerPage * (index) + 1;
        console.log(result);
        console.log(result + index);
        // const filteredArray = product.slice(result -1, result + index);
        // console.log("filteredArray", filteredArray);
        // let pro = product
        let tem = product.filter((data, indexi) => indexi >=Number(result))
        // console.log(tem, 'tem')
        let j = tem.filter((data, index) => index < itemPerPage)
        // console.log(tem)
        setproducts(j)
    }


    
    const handleSort = () => {
        setsort(!sort)
        let g;
        if(!sort){
            // eslint-disable-next-line
            g= product.sort((a,b)=>  a.name > b.name && 1 || -1)
        }else{
            // eslint-disable-next-line
            g= product.sort((a,b)=>  a.name < b.name && 1 || -1)
        }
        let newData = g.filter((data,index) => index < itemPerPage)
        setproducts(newData)
    }
    return (
        <div>
            <Header/>
            <div className="p-5"
                style={
                    {
                        backgroundColor: 'rgb(246 107 43)',
                        minHeight: '100vh'
                    }
            }>
                <div> {
                    product.length === 0 ? '' : <div style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            marginBottom: '10px'
                        }
                    }>
                        <h1>Product List</h1>
                        <hr/>
                        <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }
                            }
                            className="mb-3">
                            <select name="productCategory" className="form-select w-25"
                                onChange={handleProductCategory}>
                                <option value="">Filter Category</option>
                                {
                                productCategory.map((item, index) => (
                                    <option value={
                                            item.id
                                        }
                                        key={index}>
                                        {
                                        item.name
                                    }</option>
                                ))
                            } </select>
                            <Link to="/add-product">
                                <Button>
                                    <i className="fas fa-plus"></i>Add Product</Button>
                            </Link>
                        </div>
                    </div>
                }
                    {
                    product.length === 0 ? <div className="p-5"
                        style={
                            {
                                backgroundColor: 'white',
                                borderRadius: '10px'
                            }
                    }>
                        <h1>No Product available</h1>
                        <Link to="/add-product">Add Product</Link>
                    </div> : <div className="product-list"
                        style={
                            {
                                backgroundColor: 'white',
                                borderRadius: '10px'
                            }
                    }>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={handleSort}>Product Name {
                                        sort ? <i className="fas fa-long-arrow-alt-down" ></i> : <i className="fas fa-long-arrow-alt-up"></i>
                                    }</th>
                                    <th>Product Image</th>
                                    <th>Product Price</th>
                                    <th>Product Discount</th>
                                    <th>Product Category</th>
                                    <th>Product Total Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{
                                products.length === 0 ? <tr>
                                    <td colSpan="8">No data
                                        <hr/>
                                        <Link to="/add-product">add product</Link>
                                    </td>
                                </tr> : products.map((data, index) => (
                                    <tr key={index}>
                                        <td>{
                                            data.id
                                        }</td>
                                        <td>{
                                            data.name
                                        }</td>
                                        <td><img src={
                                                    data.image
                                                }
                                                width='100px'
                                                alt="product pic"/></td>
                                        <td>${
                                            data.price
                                        }</td>
                                        <td>{
                                            data.discount
                                        }%</td>
                                        <td>{
                                            handleDisplay(data.categoryID)
                                        }</td>
                                        <td>${
                                            data.totalPrice
                                        }</td>
                                        <td>
                                            <i className="fas fa-edit text-primary"
                                                onClick={
                                                    () => handleEdit(data.id)
                                            }></i>
                                            <i className="fas fa-trash-alt text-danger m-3"
                                                onClick={
                                                    () => handleDelete(data.id)
                                            }></i>
                                        </td>
                                    </tr>
                                ))
                            }</tbody>
                        </Table>
                    </div>
                } </div>

                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'space-between'
                    }
                }>
                    <div style={
                        {
                            display: 'flex',
                            width: '300px',
                            justifyContent: 'flex-start',
                            alignItems: 'baseline'
                        }
                    }>
                        <span style={
                            {marginRight: '10px'}
                        }>Item per page</span>
                        <select name="productCategoryCopy"
                            value={itemPerPage}
                            style={
                                {width: '200px'}
                            }
                            onChange={handleItemPerPage}
                            className="form-select w-25">
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-light"   disabled={active===1 ? true: false} onClick={() => {
                           let p =  product.filter((data,index) =>  index < itemPerPage )
                            setproducts(p)
                        }}>
                            <i className="fas fa-angle-double-left"></i>
                        </button>
                        {
                        page.map((data, index) => (
                            <button key={index}
                                className={
                                    `btn ${
                                        active === data ? 'btn-primary' : 'btn-light'
                                    }`
                                }
                                onClick={
                                    () => {
                                        handlePage(index)
                                    }
                                }
                                style={
                                    {marginLeft: '10px'}
                            }>
                                {
                                index + 1
                            }</button>
                        ))
                    }
                        <button className="btn btn-light"
                         disabled={active=== page.length ? true: false}
                            style={
                                {marginLeft: '10px'}
                        }
                        onClick={() => {
                            let lastpage = page.length -1 
                            let start = (itemPerPage * lastpage)+ 1
                            let p =  product.filter((data,index) =>  index >= start)
                             setproducts(p)
                         }}
                         >
                            <i className="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                </div>
                <Toast onClose={
                        () => dispatch(onToastFalse())
                    }
                    show={
                        toast.show
                    }
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <strong className="me-auto">Product List</strong>
                    </Toast.Header>
                    <Toast.Body>{
                        toast.message
                    }</Toast.Body>
                </Toast>
            </div>
        </div>
    )
}

export default ListProduct
