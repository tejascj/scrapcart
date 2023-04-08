// create a new component for admin dashboard . It should contain separate cards for each of the following: number of orders, number of users,number of drivers
import React, { Component,useState,useEffect } from 'react';
function Admindashboard() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [drivers, setDrivers] = useState([]);
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
    useEffect(() => {
        fetch("https://brainy-fly-handkerchief.cyclic.app/get-drivers")
            .then(res => res.json())
            .then(
                (result) => {
                    setDrivers(result);
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])
    useEffect(() => {
        fetch("https://brainy-fly-handkerchief.cyclic.app/get-users")
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);
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
                <h5 className="card-title">Number of Orders</h5>
                <p className="card-text">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Number of Users</h5>
                <p className="card-text">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Number of Drivers</h5>
                <p className="card-text">{drivers.data.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );

}
export default Admindashboard;