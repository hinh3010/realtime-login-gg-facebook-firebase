import React, { createContext, useMemo, useState } from 'react';
// file
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useFireStore from '../../hooks/useFireStore';

export const RoomsContext = createContext()

function RoomsProvider({ children }) {

    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)

    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)

    const [selectedRoomId, setSelectedRoomId] = useState('')

    const user = useContext(AuthContext)
    // console.log(user.uid);

    const roomsCondition = useMemo(() => ({
        // tìm trong filed members là 1 array chứa uid tồn tại
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: user.uid
    }), [user])

    // => lấy ra các rooms tren db chứa user hiện tại
    const rooms = useFireStore('rooms', roomsCondition)

    // room đang hiển thị
    const selectedRoom = useMemo(() => {
        return rooms.find(room => room.id === selectedRoomId) || {}
    }, [rooms, selectedRoomId])
    // console.log(selectedRoom)

    const usersCondition = useMemo(() => ({
        // tìm uid trong mảng members của room đc hiển thị
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members
    }), [selectedRoom])

    // => lấy ra các users tren db chứa trong rooms đc hiển thị hiện tại
    const members = useFireStore('users', usersCondition)
    // console.log(members)

    return (
        <RoomsContext.Provider value={{
            rooms,
            isAddRoomVisible, setIsAddRoomVisible,
            selectedRoomId, setSelectedRoomId,
            selectedRoom, members,
            isInviteMemberVisible, setIsInviteMemberVisible
        }}>
            {children}
        </RoomsContext.Provider>
    );
}

export default RoomsProvider;