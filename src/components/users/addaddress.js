import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Placeorder from './placeorder';
export function AddAddress(props) {
    const [showaddaddress, setShowaddaddress] = useState(props.showaddaddress);
    const addressInputRef = useRef(null);
    const [tag, setTag] = useState('');
    const [address, setAddress] = useState('');
    const[link,setLink]=useState('');
    const [userEmail, setUserEmail] = useState(Cookies.get('email'));
    const handleAddAddress = (e) => {
        console.log('add address');
        e.preventDefault();
        try{
            fetch('http://192.168.29.204:3001/users/addaddress', {
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
            }
            );
            
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        // Load the Google Maps JavaScript API script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATW1gGZVpKfaBHlW1C8i4UKiIYohH-SWQ&libraries=places`;
        script.async = true;
        document.body.appendChild(script);

        // Initialize the Autocomplete object for the address input field
        script.onload = () => {
            const options = {
                types: ['address'],
                componentRestrictions: { country: 'in' } // or any other country code
            };
            const google = window.google;
            const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, options);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const address = place.formatted_address;
                const link=place.url;
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
    }, []);
    return (
        <div>
            <h3>add address</h3>
            <hr />
            <form onSubmit={handleAddAddress}>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" name="address" ref={addressInputRef}  onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <select className="form-control" id="tag" name="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
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
                <button type="submit" className="btn btn-primary" >Add Address</button>
            </form>
        </div>

    )
}
