import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
function Vieworder() {
    const [orders, setOrders] = useState([]);
    const fetchallorders = async () => {
        const response = await fetch(`http://localhost:3001/fetchallorders`);
        const data = await response.json();
        console.log(data);
        setOrders(data);
    }
    useEffect(() => {
        fetchallorders();
    }, []);
    const [selectedOrders, setSelectedOrders] = useState([]);

    const handleOrderSelect = (event, orderId) => {
        if (event.target.checked) {
            setSelectedOrders((prevState) => [...prevState, orderId]);
        } else {
            setSelectedOrders((prevState) =>
                prevState.filter((id) => id !== orderId)
            );
        }
    };
    console.log(selectedOrders);
    return (
        <div>
            <h1>View Orders</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Current Orders
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className=" ">
                                            <div>
                                                <button className="btn btn-primary " disabled={!selectedOrders.length}><FontAwesomeIcon icon={faTruck} /> Assign to Driver</button>
                                                
                                                {/* create a button to cancel button with icon for that */}
                                                <button className='btn btn-danger' disabled={!selectedOrders.length}><FontAwesomeIcon icon={faTrash} /> Cancel Orders</button>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Address</th>
                                                            <th scope="col">Waste Types</th>
                                                            <th scope="col">Weight</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Driver Name</th>
                                                            <th scope="col">Driver Number</th>
                                                            <th scope="col">Payment Status</th>
                                                            <th scope="col">Assign to Driver</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.filter(order => order.status === "ongoing").map((order, index) => {
                                                            return (
                                                                <tr key={order._id}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{order.date}</td>
                                                                    <td>{order.time}</td>
                                                                    <td>{order.address}</td>
                                                                    <td>{order.wasteTypes.join(", ")}</td>
                                                                    <td>{order.weight}</td>
                                                                    <td>{order.amount}</td>
                                                                    <td>{order.status}</td>
                                                                    <td>{order.drivername}</td>
                                                                    <td>{order.driverphone}</td>
                                                                    <td>{order.paymentstatus}</td>
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                            onChange={(event) => handleOrderSelect(event, order._id)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Previous Orders
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className=" ">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>

                                                            <th scope="col">Email</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Time</th>
                                                            <th scope="col">Address</th>
                                                            <th scope="col">Waste Types</th>
                                                            <th scope="col">Weight</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Driver Name</th>
                                                            <th scope="col">Driver Number</th>
                                                            <th scope="col">Payment Status</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.filter(order => order.status !== "ongoing").map((order, index) => {
                                                            return (
                                                                <tr key={order._id}>
                                                                    <th scope="row">{index + 1}</th>

                                                                    <td>{order.email}</td>
                                                                    <td>{order.date}</td>
                                                                    <td>{order.time}</td>
                                                                    <td>{order.address}</td>
                                                                    <td>{order.wasteTypes.join(", ")}</td>
                                                                    <td>{order.weight}</td>
                                                                    <td>{order.amount}</td>
                                                                    <td>{order.status}</td>
                                                                    <td>{order.drivername}</td>
                                                                    <td>{order.driverphone}</td>
                                                                    <td>{order.paymentstatus}</td>

                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vieworder;