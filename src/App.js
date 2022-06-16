import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/index';
import AuthProvider from './components/Context/AuthProvider';
import ChatRoom from './components/ChatRoom';
import RoomsProvider from './components/Context/RoomsProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RoomsProvider>
                    <Switch>
                        <Route component={Login} path='/login' />
                        <Route component={ChatRoom} path='/' />
                    </Switch>
                    <AddRoomModal />
                    <InviteMemberModal />
                </RoomsProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
