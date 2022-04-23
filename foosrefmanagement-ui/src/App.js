import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import MenuComponent from './Menu';
import LoginForm from './pages/login/LoginForm';
import Games from './pages/games/Games';
import Events from './pages/events/Events';
import Referees from './pages/referees/Referees';


const App = () => {
    const [user, setUser] = React.useState(sessionStorage.getItem('user'));

    return (
        <BrowserRouter>
        <MenuComponent user={user} />
        <Routes>
            <Route path="/" element={<Referees />} />
            <Route path="/games" element={<Games />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<LoginForm onLogin={setUser} />} />
        </Routes>
        </BrowserRouter>
    );
};

export default App;