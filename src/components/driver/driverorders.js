import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
function Driverorders() {
    const [orders, setOrders] = useState([]);
    const drivername = Cookies.get('drivername');
    // create modal to fill the details of the order
    const [modal, setModal] = useState(false);
    const [selectedorder, setSelectedorder] = useState("");
    const toggleshow = (order) => {
        setTotalAmount(0);
        setSelectedorder(order);  
        setModal(!modal);
    }
    const closeshow = () => {
        setModal(false);
    }


    // create a function to fetch all orders from the database and store only the orders which are assigned to the driver by checking the driverid in the orders is equal to the driverid of the driver who is logged in
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/fetchallorders');
            const data = await response.json();
            console.log(data);
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    }
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/get-categories');
            const data = await response.json();
            console.log("categories:", data);
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchOrders();
        fetchCategories();
    }, []);
    const [inputValues, setInputValues] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        // Fetch the categories from the server
        const fetchCategories = async () => {

            // Calculate the total amount
            const newTotalAmount = Object.entries(inputValues).reduce((accumulator, [wasteType, inputValue]) => {
                const category = categories.find((cat) => cat.name === wasteType);
                if (!category) {
                    return accumulator;
                }
                const amountPerKg = parseInt(category.amount);
                return accumulator + amountPerKg * parseFloat(inputValue);
            }, 0);
            setTotalAmount(newTotalAmount);

        };

        // Call the fetchCategories function whenever inputValues changes
        fetchCategories();
    }, [inputValues]);

    const handleInputChange = (event, wasteType) => {
        // Update the input value for the current waste type
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [wasteType]: event.target.value,
        }));
        console.log(inputValues);
    };
    //   create a function to handle the submit button where the driver will submit the details of the order. we need to send the orderid,weight of each wastetype and the total amount to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderid = selectedorder._id;
        const weight = Object.entries(inputValues);
        const amount = totalAmount;
        console.log(orderid, weight, amount);
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/update-paymentstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid,
                    weight,
                    amount
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                alert("Order details submitted successfully");
                closeshow();
            }
            else {
                alert("Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
            <div>
                <h1>Driver Orders</h1>
                <div className='table-responsive'>
                <table className="table table-striped">
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
                            <th scope="col">Payment Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* filter the order where driverid is equal to driverid in the data stored */}
                        {orders.filter((order) => order.drivername === drivername && order.status!=="Completed").map((order, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.date}</td>
                                    <td>{order.time}</td>
                                    <td>
                                        <Link to={order.addressurl} target="_blank" >{order.address}</Link>
                                    </td>
                                    <td>{order.wasteTypes.join(", ")}</td>
                                    <td>{order.weight}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.status}</td>
                                    <td>{order.paymentstatus}</td>
                                    <td><button className="btn btn-primary" onClick={() => toggleshow(order)}>Mark as Completed</button></td>
                                </tr>
                            )
                        })}
                        {/* display No New assigned orders if no orders are there when filtered */}
                        {orders.filter((order) => order.drivername === drivername && order.status!=="Completed").length === 0 && <tr><td colSpan="10">No New Assigned Orders</td></tr>}
                    </tbody>
                </table>
                </div>
                
                
                <Modal show={modal} onHide={closeshow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleInputEmail1">Order ID</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={selectedorder._id} disabled />
                            </div>
                            {/* in this form i want to display each wastetypes  along with an input for number of kgs .and i also want to have add button to add another wastetype . the newly added field should be a dropdown which contains the categories from the get-category. */}
                            {selectedorder && selectedorder.wasteTypes && selectedorder.wasteTypes.map((wasteType) => (
                                <div key={wasteType} className="input-group mb-3">
                                    <span className="input-group-text">{wasteType}</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => handleInputChange(e, wasteType)} />
                                    <span className="input-group-text">kg</span>
                                </div>
                            ))}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Total Amount</span>
                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" value={totalAmount ? totalAmount : '0'} disabled={true} />
                                <span className="input-group-text">Rs.</span>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={toggleshow}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Mark as Completed</button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    export default Driverorders;