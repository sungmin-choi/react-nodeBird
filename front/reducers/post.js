
export const initialized ={
    mainPosts:[{
        id:1,
        User:{
            id:1,
            nickname:'sungmin',
        },
        content:'첫 번째 게시글 #해시태크 #익스프레스',
        Images:[{
            src:'https://images.velog.io/images/sungmin-choi/post/c50c6d50-c167-4efd-afd5-568b9383c2b6/image.png'
        },{
            src:'https://images.velog.io/images/sungmin-choi/post/e80a72fe-5e82-48a7-ab44-8b9e0b49ab07/KakaoTalk_Image_2021-12-27-22-30-22.jpeg'
        }
        ],
        Comment:[{
            User:{
                nickname:'hero',

            },
            content:'우와 멋져요~'
        },
        {
            User:{
                nickname:'nicolas',

            },
            content:'wow awsome!'
        }
        ]
    }],
    imagePaths:[],
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
}

const dummyPost = {
    id:2,
    User:{
        id:1,
        nickname:'sungmin'
    },
    content:"새로 올린 포스트",
    Images:[],
    Comments:[]
}


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequest =(data)=> {
    return{
        type:ADD_POST_REQUEST,
        data,
    }
}


const reducer = (state=initialized,action)=>{
    switch(action.type){
        case ADD_POST_REQUEST:
            return{
                ...state,
                addPostLoading:true,
                addPostDone:false,
                addPostError:null
            }
        case ADD_POST_SUCCESS:
            return{
                ...state,
                addPostLoading:false,
                addPostDone:true,
                Comments:[dummyPost,...state.mainPosts],
            }
        case ADD_POST_FAILURE:
            return{
                ...state,
                addPostLoading:false,
                addPostError:action.data
            }

        case ADD_COMMENT_REQUEST:
                return{
                    ...state,
                    addCommentLoading:true,
                    addCommentDone:false,
                    addCommentError:null
                }
        case ADD_COMMENT_SUCCESS:
                return{
                    ...state,
                    addCommentLoading:false,
                    addCommentDone:true,
                    mainPosts:[dummyPost,...state.mainPosts],
                }
        case ADD_COMMENT_FAILURE:
                return{
                    ...state,
                    addCommentLoading:false,
                    addCommentError:action.data
                }
        default:
            return state;
    }

}


export default reducer;