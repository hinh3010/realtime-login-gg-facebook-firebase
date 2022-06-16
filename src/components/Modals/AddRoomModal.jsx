import React, { useContext } from 'react';
import { Modal, Form, Input } from 'antd'
import { RoomsContext } from '../Context/RoomsProvider';
import { addDocument } from './../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';

function AddRoomModal(props) {

    const user = useContext(AuthContext)
    // console.log(user)

    const data = useContext(RoomsContext)
    const { isAddRoomVisible, setIsAddRoomVisible } = data
    // console.log(data)

    // truy xuất data của Form với hook useForm
    const [form] = Form.useForm()

    const handleOk = () => {
        // console.log(form.getFieldValue())

        // add firebase
        const data = { ...form.getFieldValue(), members: [`${user.uid}`] }
        addDocument('rooms', data)
        // reset form
        form.resetFields()

        // close modal
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        // reset form
        form.resetFields()

        // close modal
        setIsAddRoomVisible(false)
    }

    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name='name'>
                        <Input placeholder="Nhập tên phòng ..." />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <Input placeholder="Nhập mô tả ..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;