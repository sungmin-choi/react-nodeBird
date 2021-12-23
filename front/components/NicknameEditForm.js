import React ,{useCallback}from "react";
import {Form,Input,Button} from 'antd';
import styled  from "styled-components";
import useInput from "./hooks/useInput";

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
    const [editName,setEditName]= useInput('');

    const onSubmit = useCallback(()=>{
        console.log(editName);
    },[],)

    return (
        <FormWrapper onFinish={onSubmit}>
            <Span>Sungmin</Span>
            <ScInput
                placeholder="input Edit Name"
                bordered
                value={editName}
                onChange={setEditName}
            />
            <Button type="primary" htmlType="submit">Edit</Button>
        </FormWrapper>
    )
}


export default NicknameEditForm
