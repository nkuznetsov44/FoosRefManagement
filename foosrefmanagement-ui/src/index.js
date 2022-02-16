import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import MenuComponent from './Menu';
import App from './App';
import Games from './pages/games/Games';
import Events from './pages/events/Events';
import Referees from './pages/referees/Referees';

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <MenuComponent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/games" element={<Games />} />
        <Route path="/events" element={<Events />} />
        <Route path="/referees" element={<Referees />} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);