import { all,fork ,takeLatest,delay, put} from "@redux-saga/core/effects";
import axios from "axios";


function addPostAPI(data){
    axios.post('/api/post')
}

function* addPost(action){//3
    try{
    //const result = yeild call(addPostAPI,action.data);
    yield delay(1000);
    yield put({
        type:'ADD_POST_SUCCESS',
        data:''

    })
    }catch(err){
        yield put({
            type:'ADD_POST_FAILURE',
            data:err.response.data
        })
    }


}

function* watchAddPost(){//2.
    yield takeLatest('ADD_POST_REQUEST',addPost);
}

export default function* postSaga(){//1
    yield all([
        fork(watchAddPost),
    ])
}