import React from "react";
import { useForm } from "react-hook-form";
import {Form,Input,Button} from 'antd';
import styled  from "styled-components";

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
    const { register, handleSubmit } = useForm();

    const onSubmit = ()=>{
        console.log(register);
    }

    return (
        <FormWrapper onFinish={handleSubmit(onSubmit)}>
            <Span>Sungmin</Span>
            <ScInput
                placeholder="input Edit Name"
                bordered
                {...register("editName")}
            />
            <Button type="primary" htmlType="submit">Edit</Button>
        </FormWrapper>
    )
}


export default NicknameEditForm
