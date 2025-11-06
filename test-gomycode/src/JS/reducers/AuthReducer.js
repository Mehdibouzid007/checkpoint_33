import { CURRENT_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH, FAIL_AUTH } from "../actionTypes/AuthActionType";






const intialState = {
    isLoad : false,
    user : {} ,
    errors : [] ,
    succes : [] ,
    isAuth : false
} ;

const authReducer = ( state = intialState , {type , payload} ) => {
    switch (type) {
        case LOAD_AUTH :
        return { ...state , isLoad : true } ;
        case SUCCESS_AUTH : 
        localStorage .setItem ( 'token' , payload.token ) ; 
        return { ...state , isLoad : false , user : payload.user , succes : payload.succes , isAuth : true } ;
        case CURRENT_AUTH : 
        return {
            ...state , isLoad : false , user : payload , isAuth : true
        }
        case LOGOUT_AUTH :
        localStorage.removeItem('token') ;
        return { isLoad : false , user : {} , errors : [] , succes : [] , isAuth : false } ;
        case FAIL_AUTH :
        return { ...state , isLoad : false , errors : payload , isAuth : false } ;
          case FAIL_AUTH :
    return { ...state , isLoad : false , errors : payload , isAuth : false } ;
        default :
        return state ;
    } 
  
}

export default authReducer ;