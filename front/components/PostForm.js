import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Form,Input,Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequest} from '../reducers/post';
import useInput from './hooks/useInput';



const PostForm = props => {
    const dispatch = useDispatch();

    const {addPostDone} = useSelector((state)=>state.post);
    const {imagePaths} = useSelector((state)=>state.post);

    const [text,onChangeText,setText] = useInput('')
    const imageInput = useRef();

    useEffect(()=>{
        if(addPostDone){
            setText('');
        }
    },[addPostDone]);

    const onSubmit = useCallback(()=>{
        dispatch(addPostRequest(text));
    },[text]);


    const onImageInput = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
    return (
        <Form style={{margin:'10px 0 20px'}} onFinish={onSubmit}>
            <Input.TextArea 
            maxLength={140} 
            value={text} 
            onChange={onChangeText} 
            placeholder="어떤 신기한 일이 있었나요?"/>
            <div style={{marginTop:"10px"}}>
                <input type="file" accept="image/*" multiple hidden ref={imageInput}/>
                <Button onClick={onImageInput}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit" >짹짹!</Button>
            </div>
            <div>
                {imagePaths.map((imgpath)=>{
                    <div key={imgpath} style={{display:"inline-block"}}>
                        <img src={imgpath} style={{width:"200px"}} alt={imgpath} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>
        </Form>
    )
}


export default PostForm
