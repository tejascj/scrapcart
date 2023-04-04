import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Cookies from 'js-cookie';
import App from '../../App';
function Home() {
    // get isLoggedin from cookies
    const [isLoggedin, setIsLoggedin] = useState(Cookies.get('isLoggedIn') === 'true' ? true : false);
    
    // use useeffect to check if user is logged in or not
    useEffect(() => {
        const handleCookieChange = () => {
            if (Cookies.get("isLoggedIn") === "true") {
                setIsLoggedin(true);
            }
        };
        console.log(isLoggedin);
        window.addEventListener('storage', handleCookieChange);

        return () => {
            window.removeEventListener('storage', handleCookieChange);
        };
    }, []);
    const handleLogout = () => {
        Cookies.set('isLoggedIn', false);
        Cookies.remove('email');
        Cookies.remove('name');
        Cookies.remove('phone');
        window.location.reload();
    };
    const [formchange, setFormchange] = useState(false);
    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [password_confirm, setPassword_confirm] = useState("");
    const [message, setMessage] = useState("");
    
    const handlelogin = (e) => {
        e.preventDefault();
        console.log(useremail, userpassword);
        try {
            fetch('https://brainy-fly-handkerchief.cyclic.app//userlogin', {
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
                        Cookies.set('isLoggedIn', true);
                        setIsLoggedin(true);
                        Cookies.set('email', data.email);
                        Cookies.set('name', data.name);

                    } else {
                        alert("Login failed");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }
    const handleregister = (e) => {
        e.preventDefault();
        if (password === password_confirm) {
            try {
                fetch('https://scrapcart-ai.vercel.app/userregister', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name, email: email, password: password, phone: phone }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status === "success") {
                            setFormchange(false);
                            setMessage("Register successful please login");
                        } else {
                            alert("Register failed");
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Password not matched");
        }
    }
    return (
        <div>
            <div>
                <Navbar />
            </div>
            {/* if isloggdin is false show the below code or else rende app.js */}
            {!isLoggedin ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 d-none d-md-block">
                            {/* add gif */}
                            <div>
                                <img src="https://cdn.dribbble.com/users/449035/screenshots/4600869/media/ddbe890f0a8a7f7ee09a9851f33506e3.gif"
                                    className="img-fluid rounded d-block mx-auto mt-5"
                                    style={{ width: "800px", height: "455px", objectFit: "cover", objectPosition: "center" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            {/* create login form */}
                            <div className="container border border-3 rounded mt-5">
                                {!formchange ? (
                                    <>
                                        <h1 className="text-left">Login</h1>
                                        <hr />
                                        <form onSubmit={handlelogin}>
                                            <div className="form-group">
                                                <label htmlFor="email" className="mb-2">Email</label>
                                                <input type="email" className="form-control mb-2" id="useremail" placeholder="Enter email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
                                                <label htmlFor="password" className="mb-2">Password</label>
                                                <input type="password" className="form-control mb-2" id="userpassword" placeholder="Enter password" value={userpassword} onChange={(e) => setUserpassword(e.target.value)} />
                                                {/* create a sign up text */}
                                                <div className="text-left">
                                                    <a
                                                        href="#"
                                                        className="text-decoration-none"
                                                        onClick={() => setFormchange(true)}
                                                    >
                                                        Create new account
                                                    </a>
                                                </div>
                                                <input type="submit" className="btn btn-primary mb-2" value="Login" />
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-left">Register</h1>
                                        <hr />
                                        <form onSubmit={handleregister}>
                                            <div className="form-group">
                                                <label htmlFor="name" className="mb-2">Name</label>
                                                <input type="text" className="form-control mb-2" id="regname" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                                                <label htmlFor="email" className="mb-2">Email</label>
                                                <input type="email" className="form-control mb-2" id="regemail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label htmlFor="password" className="mb-2">Password</label>
                                                <input type="password" className="form-control mb-2" id="regpassword" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label htmlFor="password" className="mb-2">Confirm Password</label>
                                                <input type="password" className="form-control mb-2" id="regpassword_confirm" placeholder="Enter password" value={password_confirm} onChange={(e) => setPassword_confirm(e.target.value)} />
                                                <label htmlFor="phone" className="mb-2">Phone</label>
                                                <input type="number" className="form-control mb-2" id="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                <div className="text-left">
                                                    <a href="#" className="text-decoration-none" onClick={() => setFormchange(false)}>Already have an account?Log in</a>
                                                </div>
                                                <input type="submit" className="btn btn-primary mb-2" value="Sign Up" />
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<App handleLogout={handleLogout} />)}

        </div>
    );
}
export default Home;