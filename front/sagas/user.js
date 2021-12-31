import { all,fork,takeLatest,put,delay} from "@redux-saga/core/effects";
import axios from "axios";

function logInAPI(data){//4
    return axios.post('/api/login',data)
}

function* logIn(action){//3
    try{
    //const result = yield call(logInAPI,action.data);//call: 비동기에서 await 같은 개념이다.

    yield delay(1000);
    yield put({
        type:'LOG_IN_SUCCESS',
        data:action.data
    })

    }catch(err){
        yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
            type:'LOG_IN_FAILURE',
            data:err.response.data,
        })
    }
}


function logOutAPI(){//4
    return axios.post('/api/logout')
}

function* logOut(){//3
    try{
    //yield call(logOutAPI);//call: 비동기에서 await 같은 개념이다.
    yield delay(1000);
    yield put({
        type:'LOG_OUT_SUCCESS',
    })
    }catch(err){
        yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
            type:'LOG_OUT_FAILURE',
            data:err.response.data,
        })
    }

}


function* watchLogIn(){//2.
    yield takeLatest('LOG_IN_REQUEST',logIn); //take 한번만 실행되고 이벤트 삭제된다.
    // 이벤트 리스너 느낌을 준다.
}

function* watchLogOut(){//2.
    yield takeLatest('LOG_OUT_REQUEST',logOut);
}


export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut)
    ])
}