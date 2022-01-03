import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu,Input,Row,Col} from "antd";
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import styled ,{ createGlobalStyle } from "styled-components";
import {useSelector} from 'react-redux';


const InputSearch = styled(Input.Search)`
    vertical-align:middle;
`;

const Global = createGlobalStyle`
    .ant-row{
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
    .ant-col::first-child{
        padding-left: 0 !important;
    }
    .ant-col::last-child{
        padding-right: 0 !important;
    }
`;

const AppLayout = ({children}) => {
    const {me} = useSelector((state)=>state.user);

    const onSearch = value => console.log(value);

    return (
        <div>
            <Global />
            <Menu mode="horizontal">
                <Menu.Item key="nodeBird"> 
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a>
                </Link>
                </Menu.Item>
                <Menu.Item key="serachInput">
                <InputSearch placeholder="input search text" onSearch={onSearch} enterButton />
                </Menu.Item>
                <Menu.Item key="signUp">
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={6}>
                <Col xs={24} md={6} >
                    {me ? <UserProfile />:<LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href='https://www.youtube.com/' target="_blank" rel = "noreferrer noopener">아무링크</a>
                </Col>
            </Row>
            
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout

