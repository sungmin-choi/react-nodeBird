import React ,{useCallback, useState}from "react";
import {Form,Input,Button} from 'antd';
import styled  from "styled-components";
import useInput from "./hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const FormWrapper = styled(Form)`
    margin-top: 1rem;
`;

const Span = styled.span`
    display: block;
    margin-right:10px ;
    line-height: 2rem;
`;

const ScInput = styled(Input)`
    width: 300px;
`;

const NicknameEditForm = () => {
    const dispatch = useDispatch();

    const {me} = useSelector((state)=>state.user);

    const [editName,setEditName]= useState('');

    const onChangeEditName = useCallback((e)=>{
        setEditName(e.target.value);
    },[editName]);

    const onSubmit = useCallback(()=>{
        dispatch({
            type:CHANGE_NICKNAME_REQUEST,
            data:{nickname:editName},
        })
    },[editName])

    return (
        <FormWrapper onFinish={onSubmit}>
            <Span>{me.nickname}</Span>
            <ScInput
                placeholder="input Edit Name"
                bordered
                value={editName}
                onChange={onChangeEditName}
            />
            <Button type="primary" htmlType="submit">Edit</Button>
        </FormWrapper>
    )
}


export default NicknameEditForm
