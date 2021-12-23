import React from 'react';
import { Card, Col, Row,Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {StopTwoTone} from '@ant-design/icons';
    
const ScCard = styled(Card)`
    margin-top: 2rem;
    text-align: center;
`;
const ScButton = styled(Button)`
    margin-top: 1rem;
`
const ScStopTwoTone = styled(StopTwoTone)`
    font-size: 1.5rem;
`;

const FollowList = ({name,data}) => {
    return (
        <ScCard
        title={name}
        >
        <Row gutter={10}>
            {data&& data.map(ele=>{
                return (<Col span={6}>
                            <Card title={ele.nickname}>
                                <ScStopTwoTone />
                            </Card>
                        </Col>);
            })}
        </Row>
            <ScButton>더 보기</ScButton>
        </ScCard>
    )
}

FollowList.propTypes = {

}

export default FollowList
