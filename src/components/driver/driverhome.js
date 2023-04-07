import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Cookies from 'js-cookie';    
import DriverApp from './driverapp';
function Driverhome() {
    const [isDriverLoggedin, setIsDriverLoggedin] = useState(Cookies.get('isDriverLoggedIn') === 'true' ? true : false);
    console.log(isDriverLoggedin);
    // use useeffect to check if user is logged in or not
    useEffect(() => {
        const handleCookieChange = () => {
            if (Cookies.get("isDriverLoggedIn") === "true") {
                setIsDriverLoggedin(true);
            }
        };

        window.addEventListener('storage', handleCookieChange);

        return () => {
            window.removeEventListener('storage', handleCookieChange);
        };
    }, []);
    const handleLogout = () => {
        Cookies.set('isDriverLoggedIn', false);
        Cookies.remove('drivername');
        Cookies.remove('driveremail');
        Cookies.remove('driverid');
        window.location.reload();
    };

    const [driveremail, setDriveremail] = useState("");
    const [driverpassword, setDriverpassword] = useState("");
    const [message, setMessage] = useState("");
    const handlelogin = (e) => {
        e.preventDefault();
        console.log(driveremail, driverpassword);
        try {
            fetch('https://brainy-fly-handkerchief.cyclic.app/driverlogin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ driveremail: driveremail, driverpassword: driverpassword }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === "success") {
                        Cookies.set('isDriverLoggedIn', true);
                        setIsDriverLoggedin(true);
                        Cookies.set('driveremail', data.data.driveremail);
                        Cookies.set('drivername', data.data.drivername);
                        Cookies.set('driverid', data.data.driverid);
                    } else {
                        alert("Login failed");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }
   
    return (
        <div>
            <div>
                <Navbar />
            </div>
            {/* if isloggdin is false show the below code or else render app.js */}
            {!isDriverLoggedin ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 d-none d-md-block">
                            {/* add gif */}
                            <div>
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDQyMDczODkwNTllMjk3ZWY1ZTg5YjAwYTQ3NWE5M2U0NWYyN2EzNCZjdD1n/16NO9iVD39xJ8K6luE/giphy.gif"
                                    className="img-fluid rounded d-block mx-auto mt-5"
                                    style={{ width: "800px", height: "455px", objectFit: "cover", objectPosition: "center" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            {/* create login form */}
                            <div className="container border border-3 rounded mt-5">
                                <h1 className="text-left">Login</h1>
                                <hr />
                                <form onSubmit={handlelogin}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="mb-2">Email</label>
                                        <input type="email" className="form-control mb-2" id="useremail" placeholder="Enter email" value={driveremail} onChange={(e) => setDriveremail(e.target.value)} />
                                        <label htmlFor="password" className="mb-2">Password</label>
                                        <input type="password" className="form-control mb-2" id="userpassword" placeholder="Enter password" value={driverpassword} onChange={(e) => setDriverpassword(e.target.value)} />
                                        
                                        <input type="submit" className="btn btn-primary mb-2" value="Login" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<DriverApp handleLogout={handleLogout} />)}

        </div>
    );
}
export default Driverhome;