import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
function Placeorder() {
    const [showModal, setShowModal] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [userEmail, setUserEmail] = useState(null);
    const [showaddaddress, setShowaddaddress] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
    console.log(process.env.gooleapi);
    const handleWasteTypeChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setSelectedWasteTypes((prevSelectedWasteTypes) => [...prevSelectedWasteTypes, ...selectedValues,]);
        console.log(selectedWasteTypes);
    };


    const fetchAddresses = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get-user-data?email=${userEmail}`);
            const data = await response.json();

            setAddressList(data[0].address);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-categories');
            const data = await response.json();

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    // adding address
    const addressInputRef = useRef(null);
    const [tag, setTag] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const handleAddAddress = (e) => {
        console.log('add address');
        e.preventDefault();
        try {
            fetch('http://localhost:3001/users/addaddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    address: address,
                    tag: tag,
                    link: link
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    setShowaddaddress(false);
                    fetchAddresses();

                }
                );

        } catch (error) {
            console.log(error);
        }
    };
    const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.gooleapi}&libraries=places`;
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
                setLink(link);
                setAddress(address);
                addressInputRef.current.value = address;
            });
        };
    }
    const [phone, setPhone] = useState(Cookies.get('phone'));
    useEffect(() => {
        const email = Cookies.get('email');
        setUserEmail(email);
        fetchCategories();
        fetchAddresses();
    }, [userEmail]);
    // once fomr is submitted send it to placeorder api and then redirect to orders page
    const selectedTime = Array.from(document.getElementsByName('flexRadioDefault')).find(radio => radio.checked)?.value;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');

        try {
            fetch('http:////localhost:3001/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    phone: phone,
                    address: selectedAddress,
                    wasteTypes: selectedWasteTypes,
                    date: document.getElementById('date').value,
                    time: selectedTime,
                    status: 'ongoing',
                    ordertime: new Date().toLocaleString(),
                    driverid: 'Not Assigned',
                    drivername: 'Not Assigned',
                    driverphone: 'Not Assigned',
                    weight:'N/A',
                    amount:'N/A',
                    paymentstatus:'N/A'
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    window.location.href = '/orders';
                }
                );
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid border border-3 rounded w-100 mt-3'>
            <h3>Place Order</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    {/* create select component for waste type wgich will display the array from categories */}
                    <label htmlFor="wasteType" className="form-label">Waste Type</label>
                    <select className="form-select" aria-label="Default select example" multiple onChange={handleWasteTypeChange}>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category.name}
                                disabled={selectedWasteTypes.includes(category.name)}
                            >{category.name}</option>
                        ))}
                    </select>
                    {selectedWasteTypes.length > 0 && (
                        <p className="mt-2">Selected Waste Types: {selectedWasteTypes.join(', ')}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='Morning' />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Morning
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='Afternoon'
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Afternoon
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='Evening'
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Evening
                        </label>
                    </div>
                </div>
                {!showaddaddress ? (
                    <>
                        <div className="mb-3">
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="addressDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}
                                >
                                    {selectedAddress ? selectedAddress : "Select Address"}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="addressDropdown" style={{ overflow: "auto", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                                    {addressList && addressList.length === 0 ? (
                                        <li className="text-muted">No address found.</li>
                                    ) : (
                                        <>
                                            {addressList && addressList.map((address) => (
                                                <li key={address.address}>
                                                    <button className="dropdown-item" type="button" onClick={() => setSelectedAddress(address.address)}>
                                                        <span >{address.address}</span>
                                                    </button>
                                                </li>
                                            ))}

                                        </>
                                    )}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setShowaddaddress(true)}
                                        >
                                            Add New Address
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                ) : (
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
                <hr />
                <button type="submit" className="btn btn-primary mb-3">
                    Place Order
                </button>
            </form>
        </div>
    );
}
export default Placeorder;