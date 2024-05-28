//prikaz svih salona za korisnika, sa search barom
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalonSearch = () => {
  const [saloni, setSaloni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSaloni = async () => {
      try {
        const res = await axios.get("http://localhost:5000/saloni")
        setSaloni(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaloni();
  }, []);

  const filteredSaloni = saloni.filter(salon => {
    return isSearching ? salon.naziv && salon.naziv.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  });

  return (
    <div className='s'>
      <h1>Pretraga salona</h1>
      <input
        type="text"
        placeholder="Pretražite salone po imenu..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsSearching(true);
        }}
      />
      <div className='saloni'>
        {filteredSaloni.map(salon => (
          <div className='salon' key={salon.naziv}>
            <h2> {salon.naziv} </h2>
            <p> Adresa: {salon.adresa} </p>
            <p> Grad: {salon.grad} </p>
            <p> Telefon: {salon.tel} </p>
            <p> Email: {salon.email} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalonSearch;
