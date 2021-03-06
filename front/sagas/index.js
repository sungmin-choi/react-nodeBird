import {all,fork} from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {//1
    yield all([ //all: 배열을 받고 받은 이펙트들을 등록해주는 역할
        fork(userSaga),
        fork(postSaga),
    ]);
}