// create a driver dashboard component .it should have separate cards for each of the following: new orders(orders which has status assigned), completed orders(orders which has status completed)
import React, { Component,useState,useEffect } from 'react';
import Cookies from 'js-cookie';
function Driverdashboard() {
    const [orders, setOrders] = useState([]);
    const drivername = Cookies.get('drivername');
    useEffect(() => {
        fetch("https://brainy-fly-handkerchief.cyclic.app/fetchallorders")
            .then(res => res.json())
            .then(
                (result) => {
                    setOrders(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])
    return (
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">New Orders</h5>
                <p className="card-text">{orders.filter(order=>order.status==="assigned" && order.drivername===drivername).length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Completed Orders</h5>
                <p className="card-text">{orders.filter(order=>order.status==="Completed" && order.drivername===drivername).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Driverdashboard;