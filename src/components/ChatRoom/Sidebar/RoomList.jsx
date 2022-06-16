import React, { useContext, useMemo } from 'react';
import { Typography, Collapse, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import useFireStore from './../../../hooks/useFireStore';
import { AuthContext } from './../../Context/AuthProvider';
import { RoomsContext } from './../../Context/RoomsProvider';

const PanelStyled = styled(Collapse.Panel)`
    &&& {
        .ant-collapse-header,
        p {
        color: white;
        }

        .ant-collapse-content-box {
        padding: 0 40px;
        }

        .add-room {
        color: white;
        padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

function RoomList(props) {
    // const data = useContext(AuthContext)
    // // console.log(data.uid);

    // const roomsCondition = useMemo(() => ({
    //     // tìm trong filed members là 1 array có uid tồn tại
    //     fieldName: 'members',
    //     operator: 'array-contains',
    //     compareValue: data.uid
    // }), [data])

    // const rooms = useFireStore('rooms', roomsCondition)

    const data = useContext(RoomsContext)
    // console.log(data)
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = data

    const handleClickAddRoom = () => {
        setIsAddRoomVisible(true)
    }

    const handleSelectedRoom = (roomId) => {
        // console.log(roomId)
        setSelectedRoomId(roomId)
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key="1">
                {
                    rooms.map(room => (
                        <LinkStyled
                            key={room.id}
                            onClick={() => handleSelectedRoom(room.id)}
                        >
                            {room.name}
                        </LinkStyled>
                    ))
                }
                <Button
                    type="text" icon={<PlusSquareOutlined />}
                    className="add-room"
                    onClick={handleClickAddRoom}
                >
                    Thêm phòng
                </Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;