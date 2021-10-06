import { emailValidator, passwordValidator } from "../constant";

export const validation = (value) => {
    let error={};
    
   if (!value.email) {
        error.email=  'Email is required Filed...'
    }else if (!emailValidator.test(String(value.email).toLowerCase())) {
        error.email= 'Email is invalid...'
    }else {
        error.email = ''
    }  
    
    if (!value.isAdmin) {
        error.isAdmin= 'isAdmin is required Filed...'
    }else{
        error.isAdmin = ''
    }

    if (!value.password) {
       error.password= 'Password is required filed...'
    }else if (!passwordValidator.test(value.password)) {
        error.password= 'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    } else{
        error.password = ''
    }

    return error;
}

