// create a react component that fetches the payments from the server and displays them in a table inside a accordion . let there be two accordion ,one as current payments and other as previous payments.
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function MyPayments() {
    const [payments, setPayments] = useState([]);
    const [userbanks, setUserbanks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [recievername, setRecievername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [reenteredAccountNumber, setReenteredAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const email = Cookies.get('email');
    const fetchpayments = async () => {
        const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/fetchorders?email=${email}`);
        const data = await response.json();
        console.log(data);
        setPayments(data);
    }
    useEffect(() => {
        fetchbanks();
        fetchpayments();
    }, []);
    const handleAddClick = () => {
        setAccountNumber("");
        setReenteredAccountNumber("");
        setIfscCode("");
        setBankName("");
        setBranchName("");
        setShowModal(true);
    }
    const handleIfscCodeChange = async (event) => {
        const ifsc = event.target.value;
        setIfscCode(ifsc);
        if (ifsc.length === 11) {
            try {
                const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
                const { BANK, BRANCH } = response.data;
                setBankName(BANK);
                setBranchName(BRANCH);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const fetchbanks = async () => {
        const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/get-user-data?email=${email}`);
        const data = await response.json();
        console.log("bank:", data[0].bankdetails);
        setUserbanks(data[0].bankdetails);
    }
    const handleAddPayment = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/add-bank-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    recievername,
                    accountNumber,
                    ifscCode,
                    bankName,
                    branchName,
                }),
            });
            const data = await response.json();
            console.log(data);
            setShowModal(false);
            fetchbanks();
        } catch (error) {
            console.error(error);
        }

    }
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateModal = () => {
        setRecievername(userbanks[0].recievername);
        setAccountNumber(userbanks[0].accountNumber);
        setReenteredAccountNumber(userbanks[0].accountNumber);
        setIfscCode(userbanks[0].ifscCode);
        setBankName(userbanks[0].bankName);
        setBranchName(userbanks[0].branchName);
        setShowUpdateModal(true);
    }
    const handlebankupdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/update-bank-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    recievername,
                    accountNumber,
                    ifscCode,
                    bankName,
                    branchName,
                }),
            });
            const data = await response.json();
            console.log(data);
            setShowUpdateModal(false);
            fetchbanks();
        } catch (error) {
            console.error(error);
        }
    }
    const handleremovebank = async () => {
        try {
            const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/remove-bank-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email
                }),
            });
            const data = await response.json();
            console.log(data);
            setShowUpdateModal(false);
            fetchbanks();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid">
            <div className='row'>
                <h1 className='mb-3'>Payments Methods</h1>
                {userbanks && userbanks.length > 0 ? (
                    <div className='payment-card mb-3'
                        style={{
                            border: "2px dotted grey",
                            borderRadius: "10px",
                            padding: "5px",
                            textAlign: "left",
                            maxWidth: "400px",
                            maxHeight: "500px",
                            backgroundImage: "linear-gradient(116deg, #21D4FD 0%, #B721FF 100%)"
                        }}
                    >
                        <div className='clearfix'>
                            <p className="text-light float-start">
                                Reciever Name:{userbanks[0].recievername}<br />
                                Bank Name:{userbanks[0].bankName}<br />
                                Acc No:{userbanks[0].accountNumber}<br />
                                IFSC:{userbanks[0].ifscCode}<br />
                                Branch:{userbanks[0].branchName}<br />
                            </p>
                            <div className='dropdown float-end'>
                                <button className='btn' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
                                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ color: "#ffffff" }} />
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                    <li><a className='dropdown-item' href='#' onClick={handleUpdateModal}>Update</a></li>
                                    <li><a className='dropdown-item' href='#' onClick={handleremovebank}>Remove</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className='mb-3'
                        style={{
                            border: "2px dotted grey",
                            borderRadius: "10px",
                            padding: "50px",
                            textAlign: "center",
                            maxWidth: "300px",
                            maxHeight: "500px",
                        }}
                        onClick={handleAddClick}
                    >
                        <p className='fw-light'>
                            <FontAwesomeIcon icon={faCirclePlus} /> Add Bank Account
                        </p>
                    </div>
                )
                }
                {/*Add Bank Modal */}
                <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: `${showModal ? 'block' : 'none'}` }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Bank Account</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddPayment}>
                                    {/* create inputs for account number,renenter account number,IFSC code and 2 disabled input fields for bank name and branch */}
                                    <div className="mb-3">
                                        <label htmlFor="recievername" className="form-label validate">Reciever Name</label>
                                        <input type="text" className="form-control" id="recievername" value={recievername}
                                            onChange={(e) => setRecievername(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="accountnumber" className="form-label">Account Number</label>
                                        <input type="text" className="form-control" id="accountnumber" minLength={16} maxLength={16} value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reenteraccountnumber" className="form-label">Re-enter Account Number</label>
                                        <input type="text" className="form-control" id="reenteraccountnumber" minLength={16} maxLength={16} value={reenteredAccountNumber}
                                            onChange={(e) => setReenteredAccountNumber(e.target.value)} required />
                                        {/* display only when account number and reentered account number are not equal */}
                                        {accountNumber && reenteredAccountNumber && accountNumber !== reenteredAccountNumber ? (
                                            <div className="alert alert-danger mt-2" role="alert">
                                                Account Number and Re-entered Account Number do not match
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ifsccode" className="form-label">IFSC Code</label>
                                        <input type="text" className="form-control" id="ifsccode" value={ifscCode}
                                            onChange={handleIfscCodeChange} minLength={11} maxLength={11} required />
                                    </div>
                                    {/* display only when branchname is set */}

                                    {branchName ? (
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="bankname" className="form-label">Bank Name</label>
                                                <input type="text" className="form-control" id="bankname" value={bankName} disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="branch" className="form-label">Branch</label>
                                                <input type="text" className="form-control" id="branch" value={branchName} disabled />
                                            </div>
                                        </div>

                                    ) : null}
                                    <hr />
                                    <div>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Add Bank</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Update bank Modal */}
                <div className={`modal ${showUpdateModal ? 'show' : ''}`} style={{ display: `${showUpdateModal ? 'block' : 'none'}` }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Bank Account</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowUpdateModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handlebankupdate}>
                                    <div className="mb-3">
                                        <label htmlFor="recievername" className="form-label validate">Reciever Name</label>
                                        <input type="text" className="form-control" id="recievername" value={recievername} onChange={(e) => setRecievername(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="accountnumber" className="form-label">Account Number</label>
                                        <input type="text" className="form-control" id="accountnumber" minLength={16} maxLength={16} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reenteraccountnumber" className="form-label">Re-enter Account Number</label>
                                        <input type="text" className="form-control" id="reenteraccountnumber" minLength={16} maxLength={16} value={reenteredAccountNumber} onChange={(e) => setReenteredAccountNumber(e.target.value)} required />
                                        {accountNumber && reenteredAccountNumber && accountNumber !== reenteredAccountNumber ? (
                                            <div className="alert alert-danger mt-2" role="alert">
                                                Account Number and Re-entered Account Number do not match
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ifsccode" className="form-label">IFSC Code</label>
                                        <input type="text" className="form-control" id="ifsccode" value={ifscCode} onChange={handleIfscCodeChange} minLength={11} maxLength={11} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bankname" className="form-label">Bank Name</label>
                                        <input type="text" className="form-control" id="bankname" value={bankName} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="branch" className="form-label">Branch</label>
                                        <input type="text" className="form-control" id="branch" value={branchName} disabled />
                                    </div>
                                    <hr />
                                    <div>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowUpdateModal(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Current Payments
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className=" ">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Weight</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Payment Status</th>
                                                        <th scope="col">Order Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payments.filter(payment => payment.paymentstatus === "Initiated").map((payment, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{payment._id}</th>
                                                                <td>{payment.weight}</td>
                                                                <td>{payment.amount}</td>
                                                                <td>{payment.paymentstatus}</td>
                                                                <td>{payment.status}</td>
                                                                <td><button className="btn btn-danger" >Need Support</button></td>
                                                            </tr>
                                                        )
                                                    }
                                                    )}
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
                                    Previous Payments
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className=" ">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Weight</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Payment Status</th>
                                                        <th scope="col">Order Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {payments.filter(payment => payment.paymentstatus === "Completed" || payment.paymentstatus==="cancelled").map((payment, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{payment._id}</th>
                                                                <td>{payment.weight}</td>
                                                                <td>{payment.amount}</td>
                                                                <td>{payment.paymentstatus}</td>
                                                                <td>{payment.status}</td>
                                                                <td><button className="btn btn-danger" >Need Support</button></td>
                                                            </tr>
                                                        )
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
export default MyPayments;