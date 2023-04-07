import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
function Vieworder() {
    const [orders, setOrders] = useState([]);
    const fetchallorders = async () => {
        const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/fetchallorders`);
        const data = await response.json();
        console.log(data);
        setOrders(data);
    }
    const [drivers, setDrivers] = useState([]);
    const getDrivers = () => {
        try {
            fetch("https://brainy-fly-handkerchief.cyclic.app/get-drivers")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setDrivers(data.data);
                });
        } catch (e) {
            console.warn("error", e);
        }
    };
    useEffect(() => {
        fetchallorders();
        getDrivers();
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

    const [selectedDriver, setSelectedDriver] = useState("");
    const [showassignmodal, setShowassignmodal] = useState(false);
    const handleAssignOrders = () => {
        console.log(selectedOrders, selectedDriver);
        try {
            fetch("https://brainy-fly-handkerchief.cyclic.app/assign-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderids: selectedOrders,
                    driverid: selectedDriver,
                }),
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === "success") {
                        setShowassignmodal(false)
                        fetchallorders();
                    } else {
                        alert("Orders not assigned");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

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
                                        <div>
                                            <div>
                                                <button className="btn btn-primary m-1" disabled={!selectedOrders.length} onClick={(e) => setShowassignmodal(true)}><FontAwesomeIcon icon={faTruck} /> Assign to Driver</button>

                                                {/*open modal where a drop is given with all drivers names and below with a table of select orders  */}
                                                <Modal show={showassignmodal} onHide={() => setShowassignmodal(false)} size="xl">
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Assign Orders</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="form-group">
                                                            <label htmlFor="driver">Select Driver</label>
                                                            <select
                                                                className="form-control"
                                                                id="driver"
                                                                value={selectedDriver}
                                                                onChange={(e) => setSelectedDriver(e.target.value)}
                                                            >
                                                                <option value="">Select Driver</option>
                                                                {drivers.map((driver) => (
                                                                    <option key={driver._id} value={driver._id}>
                                                                        {driver.drivername}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <h2>Selected orders</h2>
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
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {orders.filter(order => selectedOrders.includes(order._id)).map((order, index) => {
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
                                                                                    <td>{order.drivernumber}</td>
                                                                                    <td>{order.paymentstatus}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>


                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => setShowassignmodal(false)}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary" onClick={() => handleAssignOrders()}>
                                                            Save Changes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
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
                                                        {orders.filter(order => order.status !== "complete" && order.status !== "cancelled").map((order, index) => {
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
                                                        {orders.filter(order => order.status === "cancelled" || order.status === "completed").map((order, index) => {
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