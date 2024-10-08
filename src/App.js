import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

  // Fetch Users
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        toast.error("Failed to load users");
      });
  }, []);

  const addUser = (user) => {
    setUsers([...users, user]); // Appends user to the end of the array
    toast.success("User added successfully!");
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    toast.success("User updated successfully!");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully!");
  };

  // Filtered users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add User</Link>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: '20px' }} // Add some spacing
        />
      </nav>

      <Routes>
        <Route path="/" element={<UserTable users={filteredUsers} onDelete={deleteUser} />} />
        <Route path="/add" element={<UserForm onSubmit={addUser} />} />
        <Route path="/edit/:id" element={<UserForm users={users} onSubmit={updateUser} />} />
        <Route path="/user/:id" element={<UserDetail users={users} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
