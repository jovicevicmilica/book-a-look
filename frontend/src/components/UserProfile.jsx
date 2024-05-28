import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../profilestyle.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); //preko tokena uzimamo mejl, pa preko mejla ostale podatke na bekendu
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        setUserEmail(userEmail);

        const response = await axios.post('http://localhost:5000/get-user-info', { email: userEmail });
        setUserData(response.data);

        const bookingsResponse = await axios.post('http://localhost:5000/user-treatments', { email: userEmail });
        setUserBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja podataka:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/treatments/${id}`);
      console.log('Tretman uspješno obrisan:', response.data);
      setUserBookings(userBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Greška prilikom brisanja tretmana:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    
    const months = [
      'januar', 'februar', 'mart', 'april', 'maj', 'jun', 
      'jul', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'
    ];
    
    const month = months[date.getMonth()];
    return `${day}. ${month} ${year}.`;
  };

  return (
    <div className="profile-container">
      <div className="profile-content crudDiv">
        <h1>Korisnik</h1>
        {userData ? (
          <div className="user-info">
            <p className='tag'>Ime: {userData.ime}</p>
            <p className='tag'>Prezime: {userData.prezime}</p>
            <p className='tag'>Email: {userEmail}</p>
          </div>
        ) : (
          <p>Dohvatanje podataka o korisniku...</p>
        )}

        <h2>Moji zakazani tretmani</h2>
        {userBookings.length > 0 ? (
          <table className="profile-table">
            <thead>
              <tr>
                <th>Salon</th>
                <th>Usluga</th>
                <th>Datum</th>
                <th>Vrijeme</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.salon}</td>
                  <td>{booking.usluga}</td>
                  <td>{formatDate(booking.datum)}</td>
                  <td>{booking.vrijeme}</td>
                  <td>
                    <button className="crud-button-profile" onClick={() => handleCancel(booking.id)}>Otkaži</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nema zakazanih tretmana.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
