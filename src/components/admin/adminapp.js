import { Link,Routes,Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "./sidebar";
import Admindashboard from "./admindashboard";
import Vieworder from "./vieworders";
import Viewpayments from "./viewpayments";
function AdminApp(props) {
  const [name, setName] = useState('');

  function handleaddcategory(e) {
    console.warn("name", name);
    e.preventDefault();
    try {
      let result = fetch("https://scrapcart-ai.vercel.app/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name
        })
      });
      alert("Category Added");
    } catch (e) {
      console.warn("error", e);
    }
  }

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
            <Route path="/" Component={Admindashboard} />
            <Route path="/vieworders" Component={Vieworder} />
            <Route path="/viewpayments" Component={Viewpayments} />
            {/* <Route path="/placeorder" Component={PlaceOrder} />
            <Route path="/addaddress" Component={AddAddress} />
            <Route path="/admindashboard" Component={Admindashboard} />
            <Route path="/mypayments" Component={MyPayments} /> */}

            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminApp;
