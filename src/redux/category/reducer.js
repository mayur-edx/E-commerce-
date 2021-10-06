import { CATEGORY_DELETE, CATEGORY_EDIT, CATEGORY_INSERT } from "./type"

let lStorage = JSON.parse(localStorage.getItem('productCategory'))

const init_state = lStorage ? lStorage : [] 

const CategoryReducer = (state = init_state, action) => {

    let payload = action.payload
    let type = action.type
    let newstate = [...state]

    switch(type){
        case CATEGORY_INSERT: {
        console.log(payload, 'action')

            let lData = JSON.parse(localStorage.getItem('productCategory'))
                if(lData){
                    lData.push(payload)
                    localStorage.setItem('productCategory',JSON.stringify(lData))
                }else{
                    let data = [];
                    data.push(payload)
                    localStorage.setItem('productCategory',JSON.stringify(data))
                }
                newstate = JSON.parse(localStorage.getItem('productCategory'))
            return newstate;
        }
        case CATEGORY_DELETE:{
            return newstate;
        }
        case CATEGORY_EDIT:{
            return newstate;
        }
        default : return newstate;
    }

}

export default CategoryReducer;