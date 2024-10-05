import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api';

function UserForm({ users = [], onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
    score: 0,  // Default score is 0
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Load existing user details for editing
  useEffect(() => {
    if (id) {
      const user = users.find(u => u.id === parseInt(id));
      if (user) setFormData(user);
    }
  }, [id, users]);

  // Handle changes for regular inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested object updates (address and company)
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFormData({
        ...formData,
        [outerKey]: {
          ...formData[outerKey],
          [innerKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission (add or update user)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateUser(id, formData).then((response) => {
        onSubmit(response.data);
        navigate('/');
      });
    } else {
      createUser(formData).then((response) => {
        onSubmit(response.data);
        navigate('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" required />
      <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" required />
      <input type="text" name="company.name" value={formData.company.name} onChange={handleChange} placeholder="Company" />
      <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
      <input type="number" name="score" value={formData.score} onChange={handleChange} placeholder="Score" />
      <button type="submit">{id ? 'Update User' : 'Add User'}</button>
    </form>
  );
}

export default UserForm;
