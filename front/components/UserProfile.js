import React, { useCallback } from 'react';
import { Card, Avatar,Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequestAction} from '../reducers/user';
const CardForm = styled(Card)`
    margin:1rem;
`;

const LogOutBtn = styled(Button)`
    margin-top: 1rem;
`;

const UserProfile = ()=> {
    const dispatch = useDispatch();

    const {me,isLoggingOut} = useSelector((state)=>state.user);

    const onLogOut = useCallback(()=>{
        dispatch(logOutRequestAction());
    },[]);
    return (
        <div>
            <CardForm
            actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="following">팔로잉<br/>0</div>,
                <div key="followers">팔로워<br/>0</div>
            ]}
            >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
                description="This is the description"
            />
            <LogOutBtn loading={isLoggingOut} onClick={onLogOut}>로그아웃</LogOutBtn>
            </CardForm>
        </div>
    )
}


export default UserProfile
