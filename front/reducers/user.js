import produce from "immer";

export const initialized = {
    loadMyInfoLoading: false, // 내정보 로드 시도중.
    loadMyInfoDone: false,
    loadMyInfoError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unFollowLoading: false, // 언팔로우 시도중
  unFollowDone: false,
  unFollowError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'sungmin',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ id:'nicolas', nickname: 'nicolas' }, { id:'zerocho', nickname: 'zerocho' }, { id:'ellie', nickname: 'ellie' }],
  Followers: [{ id:'nicolas', nickname: 'nicolas' }, { id:'zerocho', nickname: 'zerocho' }, { id:'ellie', nickname: 'ellie' }],
});

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logOutRequestAction = (data) => ({
  type: LOG_OUT_REQUEST,
  data,
});

const reducer = (state = initialized, action) =>{
  return produce(state, (draft)=>{
    switch (action.type) {
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
    case FOLLOW_SUCCESS:
        draft.followLoading=false;
        draft.followDone=true;
        draft.me.Followings.push(action.data);
        break;
    case FOLLOW_FAILURE:
        draft.followDone=false;
        draft.followLoading=false;
        draft.followError=action.data;
        break;
    case UNFOLLOW_REQUEST:
          draft.unFollowLoading = true;
          draft.unFollowError = null;
          draft.unFollowDone = false;
          break;
      case UNFOLLOW_SUCCESS:
          draft.unFollowLoading=false;
          draft.unFollowDone=true;
          draft.me.Followings=draft.me.Followings.filter((ele)=>ele.id !== action.data);
          break;
      case UNFOLLOW_FAILURE:
          draft.unFollowDone=false;
          draft.unFollowLoading=false;
          draft.unFollowError=action.data;
          break;
      case LOAD_MY_INFO_REQUEST:
          draft.loadMyInfoLoading = true;
          draft.loadMyInfoError = null;
          draft.loadMyInfoDone = false;
          break;
      case LOAD_MY_INFO_SUCCESS:
          draft.loadMyInfoLoading=false;
          draft.loadMyInfoDone=true;
          draft.me=action.data;
          break;
      case LOAD_MY_INFO_FAILURE:
          draft.loadMyInfoDone=false;
          draft.loadMyInfoLoading=false;
          draft.loadMyInfoError=action.data;
          break;
      case LOG_IN_REQUEST:
          draft.logInLoading = true;
          draft.logInError = null;
          draft.logInDone = false;
          break;
      case LOG_IN_SUCCESS:
          draft.logInLoading=false;
          draft.logInDone=true;
          draft.me=action.data;
          break;
      case LOG_IN_FAILURE:
          draft.logInDone=false;
          draft.logInLoading=false;
          draft.logInError=action.data;
          break;
      case LOG_OUT_REQUEST:
          draft.logOutLoading=true;
          draft.logOutDone=false;
          draft.logOutError=null;
          break;
      case LOG_OUT_SUCCESS:
          draft.logOutLoading=false;
          draft.logOutDone=true;
          draft.me=null;
          break;
      case LOG_OUT_FAILURE:
          draft.logOutLoading=false;
          draft.logOutError=action.data;
          break;
      case SIGN_UP_REQUEST:
          draft.signUpLoading=true;
          draft.signUpDone=false;
          draft.signUpError=null;
          break;
      case SIGN_UP_SUCCESS:
          draft.signUpLoading=false;
          draft.signUpDone=true;
          draft.me=null;
          break;
      case SIGN_UP_FAILURE:
          draft.signUpLoading=false;
          draft.signUpError=action.data;
          break;
      case CHANGE_NICKNAME_REQUEST:
          draft.changeNicknameLoading= true;
          draft.changeNicknameDone= false;
          draft.changeNicknameError= null;
          break;
      case CHANGE_NICKNAME_SUCCESS:
          draft.changeNicknameLoading= false;
          draft.changeNicknameDone= true;
          draft.me.nickname= action.data.nickname;
          break;
      case CHANGE_NICKNAME_FAILURE:
          draft.changeNicknameLoading= false;
          draft.changeNicknameError= action.data;
          break;
      case ADD_POST_TO_ME:
          draft.me.Posts.unshift({id:action.data});
          break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  })
};

export default reducer;
