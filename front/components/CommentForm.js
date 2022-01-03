import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import useInput from './hooks/useInput';

function CommentForm({ post }) {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setText('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(() => {
    console.log(id, text);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: text, id: post.id, userId: id },
    });
  }, [text, id]);

  return (
    <Form onFinish={onSubmit} style={{ position: 'relative', marginBottom: '30px' }}>
      <Input.TextArea value={text} onChange={onChangeText} rows={4} />
      <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
