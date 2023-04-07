// create a react component to fetch all the categories from the database and display them in a table . also create a button to add a new category and a button to delete a category.the category should contain a name and a description and amount per kg
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
function Category() {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    const [categoryid, setCategoryid] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const toggleshow = (id) => {
        setCategoryid(id);
        setModal(!modal);
    }
    const toggleedit = (id) => {
        setAmount(categories[id].amount);
        setName(categories[id].name);
        setDescription(categories[id].description);
        console.log(id);
        setCategoryid(categories[id]);
        console.log(categoryid);
        setEditmodal(!editmodal);
    }
    const closetoggle = () => {
        setName("");
        setDescription("");
        setAmount("");
        setEditmodal(false);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/get-categories');
            const data = await response.json();
            console.log(data);
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    const deleteCategory = async (id) => {
        console.log(id);
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/delete-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                fetchCategories();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const addCategory = async () => {
        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    amount: amount
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                setModal(false);
                setAmount("");
                setName("");
                setDescription("");
                setModal(false);
                fetchCategories();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const editCategory = async () => {

        try {
            const response = await fetch('https://brainy-fly-handkerchief.cyclic.app/edit-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: categoryid._id,
                    name: categoryid.name,
                    description: categoryid.description,
                    amount: amount
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                setEditmodal(false);
                setAmount("");
                setName("");
                setDescription("");
                setEditmodal(false);
                setCategoryid("");
                fetchCategories();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div>
            <h1>Category</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.amount}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteCategory(category._id)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => toggleedit(index)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={toggleshow}>Add Category</button>
            {/* category add modal */}
            <Modal show={modal} onHide={toggleshow}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" id="categoryname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" id="categorydesc" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="text" className="form-control" id="categoryamt" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={addCategory}>Add</button>
                </Modal.Footer>
            </Modal>
            {/* category edit modal */}
            <Modal show={editmodal} onHide={closetoggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" id="categoryname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" id="categorydesc" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="text" className="form-control" id="categoryamt" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={editCategory}>Edit</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Category;
