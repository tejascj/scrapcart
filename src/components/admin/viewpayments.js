// create a function to fetch all orders from the database and store only the orders where paymentstatus is Initiated. use aceordion to display the orders in a responsive table. use the same table as in orders.js . use another aceordion to display orders which are paid.
import React, { useState, useEffect } from 'react';
function Viewpayments () {
    const [orders, setOrders] = useState([]);
    const [paidorders, setPaidorders] = useState([]);
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/fetchallorders');
            const data = await response.json();
            console.log(data);
            setOrders(data);
            setPaidorders(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, []);
    const handlecompleteorder = (id) => async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/complete-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderid: id })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                alert('Order completed');
                window.location.reload();
            } else {
                alert('Order not completed');
            }
        } catch (err) {
            console.log(err);
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
                                    Orders to be Paid
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
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Payment Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order, index) => {
                                                        if (order.paymentstatus === "Initiated") {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{order.date}</td>
                                                                    <td>{order.time}</td>
                                                                    <td>{order.status}</td>
                                                                    <td>{order.amount}</td>
                                                                    <td>{order.paymentstatus}</td>
                                                                    <td>
                                                                        <button className="btn btn-primary" onClick={handlecompleteorder(order._id)}>Pay</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
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
                                    Paid Orders
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
                                                        <th scope="col">Pick-UP Date</th>
                                                        <th scope="col">Time Slot</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Payment Status</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paidorders.map((order, index) => {
                                                        if (order.paymentstatus === "Paid") {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{order.date}</td>
                                                                    <td>{order.time}</td>
                                                                    <td>{order.status}</td>
                                                                    <td>{order.amount}</td>
                                                                    <td>{order.paymentstatus}</td>
                                                                    
                                                                </tr>
                                                            )
                                                        }
                                                    }
                                                    )}
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
        </div >
    )
}
export default Viewpayments;
