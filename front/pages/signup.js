import React,{useCallback,useRef,useState} from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import {Form,Input,Checkbox,Button} from 'antd';
import styled from 'styled-components';
import useInput from '../components/hooks/useInput';

const ScFormItem = styled(Form.Item)`
display:flex;
flex-direction:column;
align-items:flex-start;
margin-bottom: 0.5rem;
`;

const ScInput = styled(Input)`
    width: 280px;
`;

const ScInputPassword = styled(Input.Password)`
    width: 280px;
`
const ScForm = styled(Form)`
    margin-top: 1rem;
`;

const Signup = () => {
    const [id,setId] = useInput('');
    const [nickName,setNickName] = useInput('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('')
    const [passwordError,setPasswordError] = useState(false);
    const [checkTems,setCheckTems] = useState(false);

    const checkPasswordVaild =useCallback((e)=>{
        const {target:{name}} = e;
        if(name === 'passwordCheck'){
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value === password);
        }
        else if(name === "password"){
        setPassword(e.target.value);
        setPasswordError(e.target.value === passwordCheck);
        }
        
    },[password,passwordCheck]);

    const onSubmit = () => {
          if(checkTems && passwordError) console.log(id,nickName,password);
    }

    return (
        <div>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
        <AppLayout>
        <ScForm onFinish={onSubmit}>
            <ScFormItem
                label="아이디"
                name ="id"
                rules = {[{required:true, message:'아이디 입력해주세요.'},]}
            >
                <ScInput  name="id" onChange={setId} value={id}/>
                </ScFormItem>
            <ScFormItem
                label="닉네임"
                name ="nickName"
                rules = {[{required:true, message:'닉네임 입력해주세요.'},]}
            >
                <ScInput  name="nickName" onChange={setNickName} value={nickName}/>
            </ScFormItem>
            <ScFormItem
                label="비밀번호"
                name ="password"
                rules = {[{required:true, message:'비밀번호 입력해주세요.'},]}
            >
                <ScInputPassword  name="password" value={password} onChange={checkPasswordVaild}/>
            </ScFormItem>
            <ScFormItem
                label="비밀번호체크"
                name ="passwordCheck"
                rules={[{
                    validator: (params, value) =>
                    passwordError? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.')),
                },
                ]}
            >
                <ScInputPassword  name="passwordCheck" value={passwordCheck} onChange={checkPasswordVaild} />
            </ScFormItem>
            <Form.Item
                name="tems"
                valuePropName="checked"
                wrapperCol={{
                span: 16,
                }}
                rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                  ]}
                >
                <Checkbox onClick={(e)=>setCheckTems(e.target.checked)}>이용약관 동의</Checkbox>
                
            </Form.Item>
            <Button type="primary" htmlType="submit">
                회원가입
            </Button>
            </ScForm>
        </AppLayout>
        </div>
    )
}
export default Signup
