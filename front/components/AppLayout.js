import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Menu,Input,Row,Col} from "antd";
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
const AppLayout = ({children}) => {

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const onSearch = value => console.log(value);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a>
                </Link>
                </Menu.Item>
                <Menu.Item>
                <Input.Search placeholder="input search text" style={{verticalAlign:"middle"}} onSearch={onSearch} enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={6}>
                <Col xs={24} md={8} >
                    {isLoggedIn ? <UserProfile/>:<LoginForm/>}
                </Col>
                <Col xs={24} md={10}>
                    mid
                </Col>
                <Col xs={24} md={6}>
                    <a href='https://www.youtube.com/' target="_blank" rel = "noreferrer noopener">아무링크</a>
                </Col>
            </Row>
            {children}
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout

