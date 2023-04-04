import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
function Orders() {
    const email = Cookies.get('email');
    // fetch orders from database
    const [orders, setOrders] = useState([]);
    const fetchoreders = async () => {
        const response = await fetch(`http://192.168.29.204:3001/fetchorders?email=${email}`);
        const data = await response.json();
        console.log(data);
        setOrders(data);
    }
    useEffect(() => {
        fetchoreders();
    }, []);
    // cancel order
    const [cancelorderid, setCancelorderid] = useState('');
    const Handlecancelorder = async (order) => {
        console.log(order);
        setCancelorderid(order._id);
        const response = await fetch(`http://192.168.29.204:3001/cancel-orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderid: order._id }),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            alert("Order cancelled");
            window.location.reload();
        } else {
            alert("Order not cancelled");
        }
    }


    return (
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
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Pick-UP Date</th>
                                                        <th scope="col">Time Slot</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Driver Number</th>
                                                        <th scope="col">Cancel</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.filter(order => order.status === "ongoing").map((order, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{order.date}</td>
                                                                <td>{order.time}</td>
                                                                <td>{order.status}</td>
                                                                <td>{order.driverphone}</td>
                                                                <td><button className="btn btn-danger" onClick={() => Handlecancelorder(order)}>Cancel</button></td>
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
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Pick-UP Date</th>
                                                        <th scope="col">Time Slot</th>
                                                        <th scope="col">Weight</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Payment Status</th>
                                                        <th scope="col">Order Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.filter(order => order.status !== "ongoing").map((order, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td className='text-truncate' style={{maxWidth:'140px'}}>{order._id}</td>
                                                                <td>{order.date}</td>
                                                                <td>{order.time}</td>
                                                                <td>{order.weight}</td>
                                                                <td>{order.amount}</td>
                                                                <td>{order.paymentstatus}</td>
                                                                <td>{order.status}</td>
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
    )
}
export default Orders;