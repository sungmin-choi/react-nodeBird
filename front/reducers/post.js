import shortId from 'shortid';

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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.data,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
    {
      const postIndex = state.mainPosts.findIndex((y) => y.id === action.data.id);
      const post = { ...state.mainPosts[postIndex] };
      post.Comment = [dummyComment(action.data.content), ...post.Comment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        mainPosts,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
