import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Dashboard from './components/users/dashboard';
import Orders from './components/users/orders';
import PlaceOrder from './components/users/placeorder';
import Admindashboard from './components/admin/adminapp';
import MyPayments from './components/users/mypayments';


function App(props) {
  return (
    
    <div className="App">
      

      <div className="container-fluid">
        <div className='row'>
          <div className='col-2 bg-dark '>
            <Sidebar handleLogout={props.handleLogout}/>
          </div>
          <div className='col-10'>
            <Routes>
              <Route path="/" Component={Dashboard} />
              <Route path="/orders" Component={Orders} />
              <Route path="/placeorder" Component={PlaceOrder} />
              <Route path="/admindashboard" Component={Admindashboard} />
              <Route path="/mypayments" Component={MyPayments} />
              
            </Routes>
          </div>
        </div>
      </div>
    </div>
    
  );
}


export default App;
