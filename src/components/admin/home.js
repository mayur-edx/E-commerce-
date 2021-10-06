import React from 'react'
import { Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { onToastFalse } from '../../redux/toast/action'
import Header from './header'

const Darshboard = () => {
    const dispatch = useDispatch()
    const toast = useSelector(state => state.toast)
    return (
        <div>
            <Header/>
        <div>
                <h1 style={{alignItems:'center'}}>Welcome Admin Darshboard....</h1>
        </div>
        <Toast onClose={() => dispatch(onToastFalse())} show={toast.show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Product List</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
        </div>
    )
}

export default Darshboard
