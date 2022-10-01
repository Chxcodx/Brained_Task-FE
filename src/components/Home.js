import axios from 'axios'
import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const Home = () => {
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState({})

    async function getUser() {
        try {
            await axios.get('http://localhost:3000/users')
                .then((res) => setUsers(res.data))
        } catch (error) {
            console.error(error);
        }
    }

    function editUser(user) {
        setShow(true)
        setUserData(user)
    }

    function createUser() {
        setShow(true)
        setUserData({})
    }

    function saveUser() {
        axios.post('http://localhost:3000/users', userData)
        setShow(false)
    }

    function updateUser() {
        axios.patch(`http://localhost:3000/users/${userData.id}`, userData)
        setShow(false)
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:3000/users/${id}`)
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <React.Fragment>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name :  </label>
                    <input type='text' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} /><br />
                    <label>Age : </label>
                    <input type='number' value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} /><br />
                    <label>Gender : </label>
                    <input type='text' value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)} >
                        Close
                    </Button>
                    {userData.id === undefined ?
                        <Button variant="primary" onClick={saveUser} >
                            Save
                        </Button>
                        :
                        <Button variant="primary" onClick={updateUser} >
                            Update
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
            <div className="main-div">
                <Button onClick={createUser} >Add User</Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td onClick={() => editUser(user)}>Edit</td>
                                    <td onClick={() => deleteUser(user.id)}>Delete</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Home
