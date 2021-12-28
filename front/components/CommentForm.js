import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Button} from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ScButton = styled(Button)`
    position: absolute;
    right: 0;
    bottom: -40px;
`

const CommentForm = ({post}) => {
    const id = useSelector((state)=>state.user.me?.id);
    const [text,setText] = useState('');
    const onChangeText =useCallback((event)=>{
        setText(event.target.value);
    },[]);

    const onSubmit = useCallback(()=>{
        console.log(id,text);
        setText('');
    },[text]);

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
