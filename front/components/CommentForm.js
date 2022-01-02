import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ADD_COMMENT_REQUEST } from '../reducers/post'
import useInput from './hooks/useInput'

const ScButton = styled(Button)`
    position: absolute;
    right: 0;
    bottom: -40px;
`

const CommentForm = ({post}) => {
    const dispatch = useDispatch();

    const id = useSelector((state)=>state.user.me?.id);
    const {addCommentDone} = useSelector((state)=>state.post);

    const [text,onChangeText,setText] = useInput('');

    useEffect(()=>{
        if(addCommentDone){
            setText('');
        }
    },[addCommentDone])


    const onSubmit = useCallback(()=>{
        console.log(id,text);
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{content:text,id:post.id,userId:id}
        })
    },[text,id]);

    return (
        <Form onFinish={onSubmit} style={{position:"relative",marginBottom:"30px"}}>
            <Input.TextArea value={text} onChange={onChangeText} rows={4}/>
            <ScButton type="primary" htmlType="submit" >삐약</ScButton>
        </Form>
    )
    
}

CommentForm.propTypes = {
    post:PropTypes.object.isRequired,
}

export default CommentForm
