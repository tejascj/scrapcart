// create a react component to add new driver using the bootstrap modal which contains a form and also display the list of drivers in a responsive table
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function Drivers() {
    const [show, setShow] = useState(false);
    const [drivername, setDrivername] = useState('');
    const [driveremail, setDriveremail] = useState('');
    const [driverphone, setDriverphone] = useState('');
    const [driveraddress, setDriveraddress] = useState('');
    const [driverpassword, setDriverpassword] = useState('');
    const [message, setMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleadddriver = (e) => {
        e.preventDefault();
        // check if all the fields are filled
        if (drivername === '' || driveremail === '' || driverphone === '' || driveraddress === '' || driverpassword === '') {
            setMessage("Please fill all the fields");
            return;
        }
        try {
            let result = fetch("https://brainy-fly-handkerchief.cyclic.app/add-driver", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    drivername, driveremail, driverphone, driveraddress, driverpassword
                })
            });
            console.log("result", result);
            result.then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setShow(false);
                        setMessage('')
                        setDrivername('');
                        setDriveremail('');
                        setDriverphone('');
                        setDriveraddress('');
                        setDriverpassword('');

                    } else {
                        console.log("error", data);
                    }
                });

        } catch (e) {
            console.warn("error", e);

        }
    };
    // fetch the list of drivers from the backend
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
        getDrivers();
    }, []);
    const [selectedDrivers, setSelectedDrivers] = useState([]);
    const handleDriverSelect = (event, orderId) => {
        if (event.target.checked) {
            setSelectedDrivers((prevState) => [...prevState, orderId]);
        } else {
            setSelectedDrivers((prevState) =>
                prevState.filter((id) => id !== orderId)
            );
        }
        console.log(selectedDrivers);
    };
    const deletedrivers = () => {
        try {
            fetch("https://brainy-fly-handkerchief.cyclic.app/delete-drivers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    driverids:selectedDrivers
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    getDrivers();
                });
        } catch (e) {
            console.warn("error", e);
        }
    };
    return (
        <div>
            <h1>Drivers</h1>
            {/* create a react component to add new driver using the bootstrap modal which contains a form and also display the list of drivers in a responsive table */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="driverName">Driver Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="driverName"
                                placeholder="Enter Driver Name"
                                onChange={(e) => setDrivername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverEmail">Driver Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="driverEmail"
                                placeholder="Enter Driver Email"
                                onChange={(e) => setDriveremail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverPhone">Driver Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="driverPhone"
                                placeholder="Enter Driver Phone"
                                onChange={(e) => setDriverphone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverAddress">Driver Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="driverAddress"
                                placeholder="Enter Driver Address"
                                onChange={(e) => setDriveraddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverPassword">Driver Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="driverPassword"
                                placeholder="Enter Driver Password"
                                onChange={(e) => setDriverpassword(e.target.value)}
                            />
                        </div>
                        <p className='text-danger'><b>{message}</b></p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleadddriver}>
                        Add Driver
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary" onClick={handleShow}>
                            Add Driver
                        </button>
                        <button className='btn btn-danger m-2' disabled={!selectedDrivers.length}  onClick={deletedrivers}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                {/* use drivers variable to map and display the content */}
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Driver Name</th>
                                    <th scope="col">Driver Email</th>
                                    <th scope="col">Driver Phone</th>
                                    <th scope="col">Driver Address</th>
                                    <th scope="col">Driver Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers.map((driver, index) => {
                                    return (
                                        <tr key={driver._id}>
                                            <th ><input
                                                type="checkbox"
                                                onChange={(event) => handleDriverSelect(event, driver._id)}
                                            /></th>
                                            <td>{driver.drivername}</td>
                                            <td>{driver.driveremail}</td>
                                            <td>{driver.driverphone}</td>
                                            <td>{driver.driveraddress}</td>
                                            <td>{driver.driverpassword}</td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Drivers;