/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST} from '../reducers/post';
import useInput from './hooks/useInput';

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
    dispatch({
      type: ADD_POST_REQUEST,
      data: {content:text},
    });
  }, [text]);

  const onImageInput = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) =>{
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) =>{
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  },[])
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
        {imagePaths.map((imgpath) => {
          <div key={imgpath} style={{ display: 'inline-block' }}>
            <img src={imgpath} style={{ width: '200px' }} alt={imgpath} />
            <div>
              <Button>제거</Button>
            </div>
          </div>;
        })}
      </div>
    </Form>
  );
}

export default PostForm;
