import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

function UserTable({ users, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(userIdToDelete);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const [firstName, lastName] = user.name.split(' '); // Split full name into first and last name

            return (
              <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.score !== null && user.score !== undefined ? user.score : '0'}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                  &nbsp;&nbsp;
                  <Link to={`/user/${user.id}`}>View</Link>
                  &nbsp;&nbsp;
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </>
  );
}

export default UserTable;
