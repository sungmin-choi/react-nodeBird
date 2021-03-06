import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from './hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const InputItem = styled(Form.Item)`
display:flex;
flex-direction:column;
align-items:flex-start;
`;

const InputId = styled(Input)`
    width:196px;
`;

const FormWrapper = styled(Form)`
    margin: 1rem;
`;

function LoginForm() {
  const dispatch = useDispatch();

  const { logInLoading , logInError} = useSelector((state) => state.user);

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  useEffect(()=>{
    if(logInError){
      alert(logInError);
    }
  },[logInError])

  const onSubmit = useCallback(
    () => {
    // event.preventDefault();
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password],
  );

  return (
    <FormWrapper
      onFinish={onSubmit}
      autoComplete="off"
    >
      <InputItem
        label="이메일"
        rules={[
          {
            required: true,
            message: 'Please input your ID!',
          },
        ]}
      >
        <InputId name="user-email" value={email} onChange={setEmail} />
      </InputItem>
      <InputItem
        label="비밀번호"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name="password" onChange={setPassword} />
      </InputItem>
      <Form.Item
        wrapperCol={{
          offset: 1,
          span: 14,
        }}
      >
        <div style={{display:"flex", width:'180px'}}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Button  type="link">
          <Link href="/signup"><a>회원가입</a></Link>
        </Button>
        </div>
      </Form.Item>
    </FormWrapper>
  );
}

export default LoginForm;
