import React, { useCallback, useRef, useState } from 'react';
import {Form,Input,Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';



const PostForm = props => {
    const dispatch = useDispatch();

    const {imagePaths} = useSelector((state)=>state.post);

    const [text,setText] = useState('');
    const imageInput = useRef();

    const onSubmit = useCallback(()=>{
        dispatch(addPost);
        setText("");
    },[]);

    const onChangeText =useCallback((event) =>{
        setText(event.target.value);
    },[]);

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
            <div>
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
