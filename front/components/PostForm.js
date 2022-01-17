/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE} from '../reducers/post';
import useInput from './hooks/useInput';
import { SERVER_URL } from '../constants';

function PostForm() {
  const dispatch = useDispatch();

  const { addPostDone, addPostLoading, imagePaths } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput('');
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if(!text || !text.trim()){
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach((path)=>{
      formData.append('image',path);
    })
    formData.append('content',text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onImageInput = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) =>{
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) =>{
      imageFormData.append('image', f);
    });
    return dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  },[])

  const removeImage= useCallback((index)=>{
    dispatch({
      type:REMOVE_IMAGE,
      data: index,
    })
  })
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        maxLength={140}
        value={text}
        onChange={onChangeText}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div style={{ marginTop: '10px' }}>
        <input type="file" accept="image/*" name='image' multiple hidden ref={imageInput} onChange={onChangeImages}/>
        <Button onClick={onImageInput}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} loading={addPostLoading} htmlType="submit">짹짹!</Button>
      </div>
      <div>
        {imagePaths.map((imgpath,index) => {
          return <div key={imgpath} style={{ display: 'inline-block' }}>
            <img src={`${SERVER_URL}/${imgpath}`} style={{ width: '200px' }} alt={imgpath} />
            <div>
              <Button onClick={()=>removeImage(index)}>제거</Button>
            </div>
          </div>;
        })}
      </div>
    </Form>
  );
}

export default PostForm;
