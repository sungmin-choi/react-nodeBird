import React, { useCallback, useState } from 'react';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,RETWEET_REQUEST} from '../reducers/post';
import FollowButton from './FollowButton';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const id = me?.id;
  const [commentForOpened, setCommentForOpened] = useState(false);

  const onLike = useCallback(() => {
    if(!id){
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, []);

  const onUnLike = useCallback(() => {
    if(!id){
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentForOpened((prev) => !prev);
  }, []);

  const removePost = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm('정말 지우시겠습니까?')) {
      return dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      });
    }
  }, []);

  const onRetweet = useCallback(()=>{
    if(!id){
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    })
  },[id])

  const liked =  post.Likers.find((v)=>v.id === id);
  return (
    <div>
      <Card
        // eslint-disable-next-line react/prop-types
        cover={post.Images[0] && <PostImages images={post.Images} />}
        style={{ marginBottom: '10px', marginTop: '20px', padding: '1px'}}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? <HeartTwoTone key="twoToneHeart" twoToneColor="#eb2f96" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" 
                    loading={removePostLoading} 
                    onClick={removePost}>삭제</Button>
                  </>
                )
                  : <Button>신고</Button>}
              </Button.Group>
                  )}
        
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname} 님이 리트윗하셨습니다.`: null}
        extra ={id && <FollowButton post={post}/>}
      >{post.RetweetId && post.Retweet
        ? (<Card
          cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
        >
          <Card.Meta
          avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
          title={post.Retweet.User.nickname}
          description={<PostCardContent postData={post.Retweet.content} />}
          />
        </Card>):(
          <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
          />
        )}

      </Card>
      {commentForOpened
            && (
            <div>
              <CommentForm post={post} />
              <List
                header={<div>{post.Comments.length}개의 댓글</div>}
                dataSource={post.Comments}
                renderItem={(comment) => (
                  <li>
                    <Comment
                      author={comment.User.nickname}
                      avatar={<Avatar>{comment.User.nickname[0]}</Avatar>}
                      content={comment.content}
                    />
                  </li>
                )}
              />
            </div>
            )}

    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comment: PropTypes.arrayOf(PropTypes.object),
    imagePaths: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    ReTweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
