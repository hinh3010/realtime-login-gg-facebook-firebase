import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
// import { useHistory } from 'react-router-dom';
// file
import firebase, { auth, db } from '../../firebase/config'
import { addDocument, generateKeywords } from './../../firebase/services';

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function Login(props) {

    const handleFbLogin = async (provider) => {
        try {

            const data = await auth.signInWithPopup(provider);
            // const data = await auth.signInWithPopup(fbProvider)
            console.log(data);
            const { additionalUserInfo, user } = data

            // kiểm tra xem có phải người dùng mới hay không => nếu có ghi vào db
            if (additionalUserInfo?.isNewUser) {
                const data = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,

                    keywords: generateKeywords(user.displayName)
                }
                // db.collection('users').add(data)
                addDocument('users', data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    // const history = useHistory()
    // auth.onAuthStateChanged((user) => {
    //     console.log({ user })
    //     if (user) {
    //         history.push('/')
    //     }
    // })

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </Title>
                    <Button
                        style={{ width: '100%', marginBottom: 5 }}
                        onClick={() => handleFbLogin(googleProvider)}
                    >
                        Đăng nhập với Google
                    </Button>
                    <Button
                        style={{ width: '100%' }}
                        onClick={() => handleFbLogin(fbProvider)}
                    >
                        Đăng nhập với Facebook</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;