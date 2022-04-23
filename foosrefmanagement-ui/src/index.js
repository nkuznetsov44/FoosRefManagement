import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import MenuComponent from './Menu';
import LoginForm from './pages/login/LoginForm';
import Games from './pages/games/Games';
import Events from './pages/events/Events';
import Referees from './pages/referees/Referees';
import LoginButton from './pages/login/LoginButton';

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <MenuComponent />
      <LoginButton />
      <Routes>
        <Route path="/" element={<Referees />} />
        <Route path="/games" element={<Games />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);