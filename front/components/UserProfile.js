import React from 'react';
import { Card, Avatar,Button } from 'antd';
import styled from 'styled-components';

const CardForm = styled(Card)`
    width: 330px;
    margin:1rem;
`;

const LogOutBtn = styled(Button)`
    margin-top: 1rem;
`;

const UserProfile = ({setIsLoggedIn})=> {

    const onLogOut = ()=>{
        setIsLoggedIn(false);
    }
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
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Sungmin Choi"
                description="This is the description"
            />
            <LogOutBtn onClick={onLogOut}>로그아웃</LogOutBtn>
            </CardForm>
        </div>
    )
}


export default UserProfile
