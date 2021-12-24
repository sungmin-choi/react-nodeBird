
const initialized ={
    user:{
        isLoggedIn: false,
        user:null,
        signUpData:{},
        loginData:{}
    },
    posts:{
        mainPosts:[]
    }
}

export const loginAction =(data)=>{
    return  {
        type:"LOG_IN",
        data
    }
}

export const logoutAction =()=>{
    return {
        type:"LOG_OUT"
    }
}
const rootReducer = (state=initialized,action)=>{
    switch(action.type){
        case "LOG_IN":
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn:true,
                    user:action.data,
                }
            }
        case "LOG_OUT":
            return {
                ...state,
                user:{
                    ...state.user,
                    isLoggedIn:false,
                    user:null
                }
            }

    }
}

export default rootReducer