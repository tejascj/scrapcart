import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Cookies from 'js-cookie';    
import AdminApp from './adminapp';
function AdminHome() {
    const [isAdminLoggedin, setIsAdminLoggedin] = useState(Cookies.get('isAdminLoggedIn') === 'true' ? true : false);
    console.log(isAdminLoggedin);
    // use useeffect to check if user is logged in or not
    useEffect(() => {
        const handleCookieChange = () => {
            if (Cookies.get("isAdminLoggedIn") === "true") {
                setIsAdminLoggedin(true);
            }
        };

        window.addEventListener('storage', handleCookieChange);

        return () => {
            window.removeEventListener('storage', handleCookieChange);
        };
    }, []);
    const handleLogout = () => {
        Cookies.set('isAdminLoggedIn', false);
        Cookies.remove('adminname');
        Cookies.remove('adminemail');
        window.location.reload();
    };

    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const [message, setMessage] = useState("");
    const handlelogin = (e) => {
        e.preventDefault();
        console.log(useremail, userpassword);
        try {
            fetch('http://192.168.29.204:3001/adminlogin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: useremail, password: userpassword }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === "success") {
                        Cookies.set('isAdminLoggedIn', true);
                        setIsAdminLoggedin(true);
                        Cookies.set('adminemail', data.email);
                        Cookies.set('adminname', data.name);
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
            {!isAdminLoggedin ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 d-none d-md-block">
                            {/* add gif */}
                            <div>
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRlZjExNjAzMGFmMzNkOGU5N2I3MmY5YzIxMmQyYjAyOTI5ODFmZSZjdD1n/RXFdqeK4JR12QoBl07/giphy.gif"
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
                                        <input type="email" className="form-control mb-2" id="useremail" placeholder="Enter email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
                                        <label htmlFor="password" className="mb-2">Password</label>
                                        <input type="password" className="form-control mb-2" id="userpassword" placeholder="Enter password" value={userpassword} onChange={(e) => setUserpassword(e.target.value)} />
                                        
                                        <input type="submit" className="btn btn-primary mb-2" value="Login" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<AdminApp handleLogout={handleLogout} />)}

        </div>
    );
}
export default AdminHome;