import produce from 'immer';

export const initialized = {
  mainPosts: [],
  imagePaths: [],
  isLoadPosts:true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialized, action) => {
    return produce(state, (draft)=>{
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
              draft.loadPostsLoading=true;
              draft.loadPostsDone=false;
              draft.loadPostsError=null;
              break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading=false;
                draft.loadPostsDone=true;
                draft.mainPosts=draft.mainPosts.concat(action.data);
                draft.isLoadPosts = draft.mainPosts.length <50 ;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading=false;
                draft.loadPostsError=action.data;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading=true;
                draft.addPostDone=false;
                draft.addPostError=null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading=false;
                draft.addPostDone=true;
                draft.mainPosts.unshift(action.data);
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading=false;
                draft.addPostError=action.data;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading=true;
                draft.removePostDone=false;
                draft.removePostError=null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading=false;
                draft.removePostDone=true;
                draft.mainPosts=draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading=false;
                draft.removePostError=action.data;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading=true;
                draft.addCommentDone=false;
                draft.addCommentError=null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((y) => y.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading=false;
                draft.addCommentError=action.data;
                break;
            default:
              return state;
          }
    })

};

export default reducer;
