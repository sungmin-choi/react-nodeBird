import React,{ useCallback }from 'react'
import { Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from './hooks/useInput';
import { loginAction } from '../reducers/user';
import { useDispatch } from 'react-redux';

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


const LoginForm = () => {
    const dispatch = useDispatch()

    const [id,setId] = useInput('')
    const [password,setPassword] = useInput('');

    const onSubmit = useCallback(()=>{
            //event.preventDefault();
            console.log(id,password);
            dispatch(loginAction({id,password}));
        },
    [id,password],) 


    return (
        <FormWrapper
        onFinish={onSubmit}
        autoComplete="off">
        <InputItem 
            label="아이디"
            rules={[
            {
                required: true,
                message: 'Please input your ID!',
            },
            ]}
        >
        <InputId name="Id" value={id} onChange={setId}/>   
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
        <Input.Password name="password" onChange={setPassword}/>
        </InputItem>
        <Form.Item
        wrapperCol={{
          offset: 1,
          span: 14,
        }}
        >
        <Button type="primary" htmlType="submit">
            로그인
        </Button>
        <Button type="link">
           <Link href="/signup"><a>회원가입</a></Link>
        </Button>
        </Form.Item>
        </FormWrapper>
    )
}



export default LoginForm
