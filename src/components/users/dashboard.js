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
                            <p className="card-text">Fill in the details of your waste material and schedule a pickup time. We'll weigh it and pay you on the spot! </p>
                            <Link to="/placeorder" className="btn btn-primary"> Place Order</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card">
                        <img src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Payments Details</h5>
                            <p className="card-text">Keep track of your payment history and manage your payment methods on this page. Securely add or update your bank details anytime.</p>
                            <Link to="/Mypayments" className="btn btn-primary"> Bank Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div className="card">
                        <img src="https://cdn.dribbble.com/users/620800/screenshots/3408767/media/3127c8b23aeae1f9a9bab499d831bbd8.gif" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Profile Details</h5>
                            <p className="card-text">View and update your profile information, and preferences. Keep your information up-to-date to ensure a smooth user experience.</p>
                            <Link to="/profile" className="btn btn-primary"> Profile Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
export default Dashboard;