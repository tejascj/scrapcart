// create a dashboard component that displays Hi,user in left and wallet:balance in right .below that create 3 cards for place order,bank details and profile details.
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
function Dashboard() {
    const [name, setName] = useState(Cookies.get("name"));
    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card">
                        <img src="https://cdn.dribbble.com/users/6286917/screenshots/14612889/media/1736de9baf6897091f30401603331df4.gif" className="card-img-top" alt="..." />
                        <div className="card-body">
                            
                            <h5 className="card-title">Place Order</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <Link to="/placeorder" className="btn btn-primary"> Place Order</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card">
                        <img src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Payments Details</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <Link to="/Mypayments" className="btn btn-primary"> Bank Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card">
                        <img src="https://cdn.dribbble.com/users/620800/screenshots/3408767/media/3127c8b23aeae1f9a9bab499d831bbd8.gif" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Profile Details</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
export default Dashboard;