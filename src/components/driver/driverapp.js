import { Link,Routes,Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./sidebar";
import Driverdashboard from "./driverdashboard";
import Driverorders from "./driverorders";


function DriverApp(props) {
  const [name, setName] = useState('');

  return (
    <div className="AdminApp">
      {/* <div>
        <h1>Admin Dashboard</h1>
        // add categories name
        <input type="text" placeholder="Enter Category Name" onChange={(e) => setName(e.target.value)} />
        <button onClick={handleaddcategory}>Add Category</button>
      </div> */}

      <div className="container-fluid">
        <div className='row'>
          <div className='col-2 bg-dark '>
            <Sidebar handleLogout={props.handleLogout}/>
          </div>
          <div className='col-10'>
            <Routes>
            <Route path="/" Component={Driverdashboard} />
            <Route path="/orders" Component={Driverorders} />
           
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DriverApp;
