
export const initialized ={
    mainPosts:[{
        id:1,
        User:{
            id:1,
            nickname:'sungmin',
        },
        content:'첫 번째 게시글 #해시태크 #익스프레스',
        Images:[{
            src:'https://images.velog.io/images/sungmin-choi/post/e80a72fe-5e82-48a7-ab44-8b9e0b49ab07/KakaoTalk_Image_2021-12-27-22-30-22.jpeg'
        },{
            src:'https://images.velog.io/images/sungmin-choi/post/e80a72fe-5e82-48a7-ab44-8b9e0b49ab07/KakaoTalk_Image_2021-12-27-22-30-22.jpeg'
        },{
            src:'https://images.velog.io/images/sungmin-choi/post/e80a72fe-5e82-48a7-ab44-8b9e0b49ab07/KakaoTalk_Image_2021-12-27-22-30-22.jpeg'
        }],
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
    postAdded:false,
}

const dummyPost = {
    id:2,
    User:{
        id:"namja",
        nickname:'sungmin'
    },
    content:"새로 올린 포스트",
    Images:[],
    Comments:[]
}

const ADD_POST = 'ADD_POST';

export const addPost = {
    type:ADD_POST
}
const reducer = (state=initialized,action)=>{
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                mainPosts:[dummyPost,...state.mainPosts],
            }
        default:
            return state;
    }

}


export default reducer;