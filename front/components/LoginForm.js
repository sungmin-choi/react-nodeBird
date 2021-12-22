import React, { useState,useCallback } from 'react'
import { Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const InputItem = styled(Form.Item)`
display:"flex";
flexDirection:"column";
alignItems:"flex-start";
`
const LoginForm = () => {

    const [id,setId] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = (event)=>{
        //event.preventDefault();
        console.log(event);
    }

    const onChange = useCallback((event)=>{
            const {target:{name}} = event;
    
            if(name === 'Id') setId(event.target.value);
            else if(name === 'password') setPassword(event.target.password);
        },
    []) 

    return (
        <Form onFinish={onSubmit}>
        <InputItem style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}
            label="아이디"
            name="Id"
            rules={[
            {
                required: true,
                message: 'Please input your ID!',
            },
            ]}
        >
        <Input name="Id" value={id} onChange={onChange} style={{width:"194px"}}/>   
        </InputItem>
        <InputItem 
        style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}
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
        </Form>
    )
}



export default LoginForm
