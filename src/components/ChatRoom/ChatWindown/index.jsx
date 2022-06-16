import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { RoomsContext } from '../../Context/RoomsProvider';
import { addDocument } from './../../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFireStore from './../../../hooks/useFireStore';


const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        }

        &__title {
        margin: 0;
        font-weight: bold;
        }

        &__description {
        font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;


const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;


function ChatWindown(props) {

    const data = useContext(RoomsContext)
    // console.log(data)
    const { selectedRoom, members, setIsInviteMemberVisible } = data

    const user = useContext(AuthContext)
    // console.log(user)

    const currentRoom = selectedRoom
    // console.log(currentRoom)

    const handleClickAddMember = () => {
        setIsInviteMemberVisible(true)
    }

    const [inputVale, setInputVale] = useState('')
    const [form] = Form.useForm()
    const handleInputChange = (e) => {
        setInputVale(e.target.value)
    }

    const handleOnsubmit = () => {
        addDocument('messages', {
            text: inputVale,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoom.id,
            displayName: user.displayName
        })
        form.resetFields(['message'])
    }

    // dieu kien fieldName roomId trong messages == selectedRoom.id
    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id,
    }), [selectedRoom.id]);

    const messages = useFireStore('messages', condition)

    if (!currentRoom || !Object.keys(currentRoom).length || currentRoom.constructor !== Object)
        return (
            <Alert message="Hay chon phong" type="info" showIcon style={{ margin: 5 }} />
        )
    else if (currentRoom)
        return (
            <WrapperStyled>

                <HeaderStyled>

                    <div className="header__info">
                        <p className="header__title"> {currentRoom.name} </p>
                        <span className="header__description">
                            {currentRoom.description}
                        </span>
                    </div>

                    <ButtonGroupStyled>
                        <Button
                            type="text" icon={<UserAddOutlined />}
                            onClick={handleClickAddMember}
                        >
                            Mời
                        </Button>
                        <Avatar.Group size="small" maxCount={2}>
                            {
                                members.map(member => (
                                    <Tooltip
                                        key={member.uid}
                                        title={member.displayName}
                                    >
                                        <Avatar src={member.photoURL}>
                                            {
                                                member.photoURL ? '' :
                                                    member.displayName?.charAt(0).toUpperCase()
                                            }
                                        </Avatar>
                                    </Tooltip>
                                ))
                            }
                        </Avatar.Group>
                    </ButtonGroupStyled>

                </HeaderStyled>

                <ContentStyled>
                    <MessageListStyled>
                        {messages.map(message => (
                            <Message
                                key={message.id}
                                text={message.text}
                                photoURL={message.photoURL}
                                displayName={message.displayName}
                                createdAt={message.createdAt}
                            />
                        ))}
                    </MessageListStyled>
                    <FormStyled form={form}>
                        <Form.Item name="message">
                            <Input
                                value={inputVale}
                                bordered={false}
                                autoComplete="off"
                                placeholder="Nhập tin nhắn ..."
                                onChange={handleInputChange}
                                onPressEnter={handleOnsubmit}
                            />
                        </Form.Item>
                        <Button type="primary" onClick={handleOnsubmit}>Gui</Button>
                    </FormStyled>
                </ContentStyled>

            </WrapperStyled>
        );
    else return <Alert message="Hay chon phong" type="info" showIcon style={{ margin: 5 }} />
}

export default ChatWindown;