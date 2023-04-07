import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Home from './components/users/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Driverhome from './components/driver/driverhome';
import AdminHome from './components/admin/AdminHome';
// import DriverHome from './components/driver/DriverHome';

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/delivery/*" element={<Driverhome />} />
          <Route path="/admin/*" element={<AdminHome/>}>
          
          </Route>
          {/* <Route path="/driver/*">
            {isLoggedIn === 'true' && userRole === 'driver' ? <DriverHome /> : <Navigate to="/" />}
          </Route> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

reportWebVitals();
