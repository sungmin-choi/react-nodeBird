import React, { useCallback} from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user'

const FollowButton =({post})=> {
    const dispatch = useDispatch();
    const {me,unFollowLoading, followLoading} = useSelector((state)=>state.user);
    const isFollow = me?.Followings.find((ele)=>ele.id === post.User.id);
    console.log(isFollow);
    const onFollow = useCallback(()=>{
        if(isFollow){  
            dispatch({
                type: UNFOLLOW_REQUEST,
                data:post.User.id,
            })
        }else{
            dispatch({
                type: FOLLOW_REQUEST,
                data :post.User.id,
            })
        }
    },[isFollow]);

    if(post.User.id === me.id){
        return null;
    }
    return (
        <>
        {isFollow ? <Button type="primary" danger loading={unFollowLoading} onClick={onFollow}>언팔로우</Button>
        :<Button loading={followLoading} onClick={onFollow}>팔로우</Button>}
        </>

    )
}

FollowButton.propTypes = {
    post : PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comment: PropTypes.arrayOf(PropTypes.object),
        imagePaths: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default FollowButton
