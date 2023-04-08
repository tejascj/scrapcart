// create a profile component that displays name ,email and phone number of the user. Show the addresses of the user in a table with edit and delete buttons. add a button to add a new address.
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
function Profile() {
    const [name, setName] = useState(Cookies.get("name"));
    const [phone, setPhone] = useState(Cookies.get("phone"));
    const [addressList, setAddressList] = useState([]);
    const [userEmail, setUserEmail] = useState(Cookies.get("email"));
    const [showaddaddress, setShowaddaddress] = useState(false);
    const fetchAddresses = async () => {
        try {
            const response = await fetch(`https://brainy-fly-handkerchief.cyclic.app/get-user-data?email=${userEmail}`);
            const data = await response.json();
            console.log(data);
            setAddressList(data[0].address);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAddresses();
    }, []);
    const handleuserupdate = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/update-user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, name: name, phone: phone }),
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                Cookies.set('name', name);
                Cookies.set('phone', phone);
                alert("User updated successfully");
            } else {
                alert("User update failed");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddressDelete = async (address) => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/deleteaddress', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, address: address }),
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                alert("Address deleted successfully");
                fetchAddresses();
            } else {
                alert("Address delete failed");
            }
        } catch (error) {
            console.error(error);
        }
    };
    // adding address
    const addressInputRef = useRef(null);
    const [tag, setTag] = useState('');
    const [address, setAddress] = useState('');
    const [url, setUrl] = useState('');
    const handleAddAddress = (e) => {
        console.log('add address');
        e.preventDefault();
        try {
            fetch('https://brainy-fly-handkerchief.cyclic.app/users/addaddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    address: address,
                    tag: tag,
                    url: url
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    fetchAddresses();
                    setShowaddaddress(false);
                }
                );

        } catch (error) {
            console.log(error);
        }
    };
    const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_googleapi}&libraries=places`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const options = {
                types: ['address'],
                componentRestrictions: { country: 'in' }
            };
            const google = window.google;
            const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, options);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const address = place.formatted_address;
                const link = place.url;
                const addressComponents = {};
                place.address_components.forEach(component => {
                    const type = component.types[0];
                    addressComponents[type] = component.long_name;
                });
                setUrl(link);
                setAddress(address);
                addressInputRef.current.value = address;
            });
        };
    }
    return (
        // create a profile component that displays name ,email and phone number of the user. Show the addresses of the user in a table with edit and delete buttons. add a button to add a new address.
        <div className="container-fluid p-1">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Profile</h5>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="email" value={userEmail} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary" onClick={handleuserupdate}>Save</button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Addresses</h5>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {addressList.map((address, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{address.address}</td>
                                                            <td>
                                                                <button className="btn btn-danger" onClick={() => handleAddressDelete(address.address)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mb-3">
                                                <button className="btn btn-primary" onClick={()=>setShowaddaddress(true)}>Add Address</button>
                                            </div>
                                            {showaddaddress && (
                                                <div>
                                                    <h3>Add Address</h3>
                                                    <hr />
                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" className="form-control" id="address" name="address" ref={addressInputRef} onChange={(e) => setAddress(e.target.value)} onFocus={loadGoogleMapsScript} />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="tag">Tag</label>
                                                        <select className="form-control" id="tag" name="tag" value={tag} onChange={(e) => setTag(e.target.value)} >
                                                            <option value="">Select a tag</option>
                                                            <option value="home">Home</option>
                                                            <option value="office">Office</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                    {tag === 'other' && (
                                                        <div className="form-group">
                                                            <label htmlFor="otherTag">Other Tag</label>
                                                            <input type="text" className="form-control" id="otherTag" name="otherTag" />
                                                        </div>
                                                    )}
                                                    <div className='clearfix mb-3'>
                                                        <button type="submit" className="btn btn-primary float-start" onClick={() => setShowaddaddress(false)} >Cancel</button>
                                                        <button type="submit" className="btn btn-primary float-end" onClick={handleAddAddress} >Add Address</button>
                                                    </div>
                                                </div>
                                            )}
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
export default Profile;