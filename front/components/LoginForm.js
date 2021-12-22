import React, { useState,useCallback } from 'react'
import { Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

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


const LoginForm = ({setIsLoggedIn}) => {

    const [id,setId] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = useCallback(
        ()=>{
            //event.preventDefault();
            console.log(id,password);
            setIsLoggedIn(true);
        },
    [id,password],) 

    const onChange = useCallback((event)=>{
            const {target:{name}} = event;
    
            if(name === 'Id') setId(event.target.value);
            else if(name === 'password') setPassword(event.target.password);
        },
    []) 

    return (
        <FormWrapper
        onFinish={onSubmit}
        autoComplete="off">
        <InputItem 
            label="아이디"
            name="Id"
            rules={[
            {
                required: true,
                message: 'Please input your ID!',
            },
            ]}
        >
        <InputId name="Id" value={id} onChange={onChange}/>   
        </InputItem>
        <InputItem 
        label="비밀번호"
        name="password"
        rules={[
        {
            required: true,
            message: 'Please input your password!',
        },
        ]}
        >
        <Input.Password name="password" value={password}/>
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
