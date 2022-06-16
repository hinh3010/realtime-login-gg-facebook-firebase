import React, { useContext, useEffect } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth, db } from '../../../firebase/config';
import { AuthContext } from './../../Context/AuthProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

// logout
const handleLogout = () => {
    auth.signOut()
}

function UserInfo(props) {


    // useEffect(() => {
    //     // khi có sự thay đổi ở trong collection users thì onSnapshot sẽ thực thi => real time
    //     db.collection('users').onSnapshot(snapshot => {
    //         const data = snapshot.docs.map(doc => ({
    //             ...doc.data(),  // data là hàm của firestore giúp convert data từ db sang {}
    //             id: doc.id
    //         }))
    //         // console.log('data', data)
    //         // console.log('snapshot', snapshot.docs[0].data())
    //     })
    // }, [])

    const data = useContext(AuthContext)
    // console.log(data)
    const { displayName, photoURL } = data

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL} >
                    {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography.Text
                    className='username'
                >
                    {displayName}
                </Typography.Text>
            </div>
            <Button ghost onClick={handleLogout}>Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;