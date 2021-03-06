import React,{useCallback,useEffect,useState} from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import {Form,Input,Checkbox,Button} from 'antd';
import styled from 'styled-components';
import useInput from '../components/hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useRouter } from 'next/router'

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
    const dispatch = useDispatch();
    const router = useRouter();

    const [email,setEmail] = useInput('');
    const [nickname,setNickName] = useInput('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('')
    const [passwordError,setPasswordError] = useState(false);
    const [checkTems,setCheckTems] = useState(false);

    const {signUpLoading, signUpDone, signUpError,me} = useSelector((state)=>state.user);
    
    useEffect(()=>{
        if(signUpDone){
            router.replace('/');
        }

    },[signUpDone]);

    useEffect(()=>{
        if(me && me.id){
            router.replace('/');
        }

    },[me && me.id]);

    useEffect(()=>{
        if(signUpError){
            alert(signUpError);
        }
    },[signUpError])

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

    const onSubmit = useCallback(()=>{
          if(checkTems && passwordError) {
              console.log(email,nickname,password);
              dispatch({
                type:SIGN_UP_REQUEST,
                data:{email,nickname,password}
            })
          }
    },[checkTems,passwordError]);

    return (
        <div>
            <Head>
                <title>???????????? | NodeBird</title>
            </Head>
        <AppLayout>
        <ScForm onFinish={onSubmit}>
            <ScFormItem
                label="?????????"
                name ="email"
                rules = {[{required:true, message:'????????? ??????????????????.'},]}
            >
                <ScInput  name="email" onChange={setEmail} value={email}/>
                </ScFormItem>
            <ScFormItem
                label="?????????"
                name ="nickName"
                rules = {[{required:true, message:'????????? ??????????????????.'},]}
            >
                <ScInput  name="nickName" onChange={setNickName} value={nickname}/>
            </ScFormItem>
            <ScFormItem
                label="????????????"
                name ="password"
                rules = {[{required:true, message:'???????????? ??????????????????.'},]}
            >
                <ScInputPassword  name="password" value={password} onChange={checkPasswordVaild}/>
            </ScFormItem>
            <ScFormItem
                label="??????????????????"
                name ="passwordCheck"
                rules={[{
                    validator: (params, value) =>
                    passwordError? Promise.resolve() : Promise.reject(new Error('??????????????? ???????????? ????????????.')),
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
                <Checkbox onClick={(e)=>setCheckTems(e.target.checked)}>???????????? ??????</Checkbox>
                
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
                ????????????
            </Button>
            </ScForm>
        </AppLayout>
        </div>
    )
}
export default Signup
