//prikaz svih korisnika uz mogućnost brisanja, za admina
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Greška prilikom preuzimanja korisnika:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Greška prilikom brisanja korisnika:', error);
      alert('Greška prilikom brisanja korisnika');
    }
  };

  const filteredUsers = users.filter(user =>
    user.ime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prezime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1>Korisnici</h1>
      <input
        type="text"
        placeholder="Pretraži korisnike..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Upravljanje</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.ime}</td>
              <td>{user.prezime}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Obriši
                </button>
                <h6>Napomena: brisanjem korisnika brišu se i svi njegovi zakazani termini</h6>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
