// eslint-disable-next-line import/no-extraneous-dependencies
import { all, fork, takeLatest, put, delay, call} from '@redux-saga/core/effects';
import axios from 'axios';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST,
  LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
  FOLLOW_REQUEST, UNFOLLOW_REQUEST, FOLLOW_SUCCESS, 
  FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,LOAD_MY_INFO_SUCCESS,LOAD_MY_INFO_FAILURE, 
  CHANGE_NICKNAME_REQUEST,CHANGE_NICKNAME_SUCCESS,CHANGE_NICKNAME_FAILURE,
} from '../reducers/user';


function changeNicknameAPI(data) { // 4
  return axios.patch('/user/nickname', data);
}

function* changeNickname(action) { // 3
  try {
    const result = yield call(changeNicknameAPI,action.data);//call: 비동기에서 await 같은 개념이다.
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: CHANGE_NICKNAME_FAILURE,
      data: err.response.data,
    });
  }
}



function loadMyInfoAPI() { // 4
  return axios.get('/user');
}

function* loadMyInfo() { // 3
  try {
    const result = yield call(loadMyInfoAPI);//call: 비동기에서 await 같은 개념이다.
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: LOAD_MY_INFO_FAILURE,
      data: err.response.data,
    });
  }
}

function logInAPI(data) { // 4
  return axios.post('/user/login', data);
}

function* logIn(action) { // 3
  try {
    const result = yield call(logInAPI,action.data);//call: 비동기에서 await 같은 개념이다.
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function logOutAPI() { // 4
  return axios.post('/user/logout');
}

function* logOut() { // 3
  try {
    yield call(logOutAPI);//call: 비동기에서 await 같은 개념이다.
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function signUpAPI(data) { // 4
  return axios.post('/user', data); // 백엔드 서버로 회원가입정보 전송.
}

function* signUp(action) { // 3
  try {
    const result = yield call(signUpAPI,action.data);//call: 비동기에서 await 같은 개념이다.
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

function followAPI(data) { // 4
  return axios.post('/api/signUp', data);
}

function* follow(action) { // 3
  try {
    // yield call(signUpAPI,action.data);//call: 비동기에서 await 같은 개념이다.
    console.log('follow');
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: FOLLOW_FAILURE,
      data: err.response.data,
    });
  }
}

function unFollowAPI(data) { // 4
  return axios.post('/api/signUp', data);
}

function* unFollow(action) { // 3
  try {
    // yield call(signUpAPI,action.data);//call: 비동기에서 await 같은 개념이다.
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({ // redux 액션으로 보내줌. put:dispatch라고 생각하면 편하다.
      type: UNFOLLOW_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogIn() { // 2.
  yield takeLatest(LOG_IN_REQUEST, logIn); // take 한번만 실행되고 이벤트 삭제된다.
  // 이벤트 리스너 느낌을 준다.
}

function* watchLogOut() { // 2.
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchChangeNickname(){
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
export default function* userSaga() {
  yield all([
    fork(watchChangeNickname),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadMyInfo),
  ]);
}
