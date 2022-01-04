import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialized = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'sungmin',
    },
    content: '첫 번째 게시글 #해시태크 #익스프레스',
    Images: [{
      id: shortId.generate(),
      src: 'https://images.velog.io/images/sungmin-choi/post/c50c6d50-c167-4efd-afd5-568b9383c2b6/image.png',
    }, {
      id: shortId.generate(),
      src: 'https://images.velog.io/images/sungmin-choi/post/e80a72fe-5e82-48a7-ab44-8b9e0b49ab07/KakaoTalk_Image_2021-12-27-22-30-22.jpeg',
    },
    ],
    Comment: [{
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'hero',

      },
      content: '우와 멋져요~',
    },
    {
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: 'nicolas',

      },
      content: 'wow awsome!',
    },
    ],
  }],
  imagePaths: [],
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

initialized.mainPosts = initialized.mainPosts.concat(
  Array(20).fill().map((v,i)=>({
    id:shortId.generate(),
    User:{
      id:shortId.generate(),
      nickname:faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images:[{
      src:faker.image.imageUrl(),
    }],
    Comment:[{
      User:{
        id:shortId.generate(),
        nickname:faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  }))
)

const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: 'sungmin',
  },
  content: data.content,
  Images: [],
  Comment: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: 'sungmin',
  },
  content: data,
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequest = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequest = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialized, action) => {
    return produce(state, (draft)=>{
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading=true;
                draft.addPostDone=false;
                draft.addPostError=null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading=false;
                draft.addPostDone=true;
                draft.mainPosts.unshift(dummyPost(action.data));
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
                const post = draft.mainPosts.find((y) => y.id === action.data.id);
                post.Comment.unshift(dummyComment(action.data.content));
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
