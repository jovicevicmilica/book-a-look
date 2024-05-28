import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/treatments');
        setBookings(response.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja zakazanih tretmana:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/treatments/${id}`);
      console.log('Tretman uspješno obrisan:', response.data);
      setBookings(bookings.filter(booking => booking.id !== id));
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
    <div className="bookings-container">
      <h2>Zakazani tretmani</h2>
      <div className="crudDiv">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Korisnik</th>
              <th>Salon</th>
              <th>Usluga</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.korisnik}</td>
                <td>{booking.salon}</td>
                <td>{booking.usluga}</td>
                <td>{formatDate(booking.datum)}</td>
                <td>{booking.vrijeme}</td>
                <td>
                  <button className="crud-button" onClick={() => handleCancel(booking.id)}>Otkaži</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsAdmin;
