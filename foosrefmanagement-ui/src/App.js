import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import MenuComponent from './menu/Menu';
import Games from './pages/games/Games';
import Events from './pages/events/Events';
import Referees from './pages/referees/Referees';
import RefereeProfile from './pages/referees/profile/RefereeProfile';
import Users from './pages/user/Users';
import Protected from './common/permissions/protect';
import { requireLoggedIn } from './common/permissions/requirements';

const App = () => {
    return (
        <BrowserRouter>
            <MenuComponent />
            <Routes>
                <Route path="/" element={<Referees />} />
                <Route path="/games" element={<Games />} />
                <Route path="/events" element={<Events />} />
                <Route path="/refereeProfile/:id" element={<RefereeProfile />} />
                <Protected require={requireLoggedIn}>
                    <Route path="/users" element={<Users />} />
                </Protected>
            </Routes>
        </BrowserRouter>
    );
};

export default App;