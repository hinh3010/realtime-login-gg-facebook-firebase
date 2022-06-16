import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindown from './ChatWindown';

function ChatRoom(props) {
    return (
        <Row>
            <Col span={6}>
                <Sidebar />
            </Col>
            <Col span={18}>
                <ChatWindown />
            </Col>
        </Row>
    );
}

export default ChatRoom;