/* eslint-disable import/named */
// eslint-disable-next-line import/no-extraneous-dependencies
import { all, fork, takeLatest, delay, put } from '@redux-saga/core/effects';
import axios from 'axios';
import shortid from 'shortid';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function addPostAPI(data) {
  axios.post('/api/post');
}

function* addPost(action) { // 3
  try {
    // const result = yeild call(addPostAPI,action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  axios.post('/api/comment');
}

function* addComment(action) {
  try {
    // const result = yeild call(addCommentAPI,action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,

    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete('./api/post', data);
}

function* removePost(action) {
  try {
    // const result = yeild call(removePostAPI,action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
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

export default function* postSaga() { // 1
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ]);
}
