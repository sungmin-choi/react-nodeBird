/* eslint-disable import/named */
// eslint-disable-next-line import/no-extraneous-dependencies
import { all, fork, takeLatest, delay, put, throttle, call} from '@redux-saga/core/effects';
import axios from 'axios';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, 
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LIKE_POST_REQUEST,LIKE_POST_SUCCESS,LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,UNLIKE_POST_SUCCESS,UNLIKE_POST_FAILURE
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) { 
  try {
    const result = yield call(likePostAPI,action.data);
    console.log(result);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) { 
  try {
    const result = yield call(unLikePostAPI,action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      data: err.response.data,
    });
  }
}



function loadPostsAPI() {
  return axios.get('/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log(result.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}


function addPostAPI(data) {
  return axios.post('/post',data);
}

function* addPost(action) { 
  try {
    const result = yield call(addPostAPI,action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: Number(result.data.id),
    });
  } catch (err) {
    console.log("hi",err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`,data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI,action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI,action.data);
    console.log(result);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() { // 2.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() { // 2.
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLikePost() { // 2.
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() { // 2.
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

export default function* postSaga() { // 1
  yield all([
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}
