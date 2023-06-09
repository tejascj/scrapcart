import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faTable, faFileInvoiceDollar, faUser } from '@fortawesome/free-solid-svg-icons'

function Sidebar(props) {
  const [name, setName] = useState(Cookies.get('drivername'));
  const handlelogout = () => {
    props.handleLogout();

  }
  return (
    <div>
      <div className="d-flex flex-column align-items-sm-start text-white min-vh-100">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <Link className="nav-link" to="/delivery" >
              <FontAwesomeIcon icon={faHouse} /> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/delivery/orders">
              <FontAwesomeIcon icon={faTable} /> <span className="ms-1 d-none d-sm-inline">Orders</span>
            </Link>
          </li>
          

        </ul>

        <hr />
        <div className="dropdown pb-4">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faUser} className='round-circle' />
            <span className="d-none d-sm-inline mx-1">{name}</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">

            <li><a className="dropdown-item" href="#" onClick={handlelogout}>Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Sidebar;
