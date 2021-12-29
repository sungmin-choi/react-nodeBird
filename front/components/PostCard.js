import React, { useCallback, useState } from 'react'
import PostImages from './PostImages';
import {Button, Card, Popover,Avatar,List,Comment} from 'antd';
import {EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined ,HeartTwoTone} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import PropTypes from 'prop-types';
const PostCard = ({post})=> {
    const {me} = useSelector((state)=>state.user);
    const id = me?.id;
    const [liked,setLiked] = useState(false);
    const [commentForOpened,setCommentForOpened] = useState(false);

    const onToggleLike = useCallback(()=>{
        setLiked((prev)=>!prev);
    },[]);

    const onToggleComment = useCallback(()=>{
        setCommentForOpened((prev)=>!prev);
    },[]);

    return (
        <div>
            <Card
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            style={{marginBottom:"10px",marginTop:"20px",padding:"1px",width:"410px"}}
            actions={[
                <RetweetOutlined key="retweet"/>,
                liked?<HeartTwoTone key="twoToneHeart" twoToneColor="#eb2f96"onClick={onToggleLike}/>
                :<HeartOutlined key="heart" onClick={onToggleLike}/>
                ,
                <MessageOutlined  key="comment" onClick={onToggleComment}/>,
                <Popover key="more" content={
                    <Button.Group>
                        {id && post.User.id === id ?(
                            <>
                        <Button>수정</Button>
                        <Button type="danger">삭제</Button>
                            </>
                        ):
                        <Button>신고</Button>}
                    </Button.Group>
                }>
                    <EllipsisOutlined />
                </Popover>
            ]}
            >
                <Card.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={post.User.nickname}
                description={post.content}
                ></Card.Meta>
            </Card>
            {commentForOpened && 
            <div>
                <CommentForm post={post}/>
                <List
                header={<div>{post.Comment.length}개의 댓글</div>}
                dataSource={post.Comment}
                renderItem={comment=>(
                <li>
                <Comment 
                    author={comment.User.nickname}
                    avatar={<Avatar>{comment.User.nickname[0]}</Avatar>}
                    content={comment.content}
                />
                </li>
                )}
                />
            </div>}

        </div>
    )
}

PostCard.propTypes = {
    post:PropTypes.shape({
        id:PropTypes.number,
        User:PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comment:PropTypes.arrayOf(PropTypes.object),
        imagePaths:PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};


export default PostCard
