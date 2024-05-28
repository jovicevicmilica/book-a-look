import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Saloni = () => {
  const [saloni, setSaloni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async (naziv) => {
    try {
      await axios.delete(`http://localhost:5000/saloni/${naziv}`);
      alert('Uspješno obrisan salon iz baze.');
      setSaloni(saloni.filter(salon => salon.naziv !== naziv));
    } catch (error) {
      console.log(error);
      alert('Greška prilikom brisanja salona iz baze.');
    }
  }

  const filteredSaloni = saloni.filter(salon => {
    return isSearching ? salon.naziv && salon.naziv.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  });

  return (
    <div className="saloni-container">
      <h2>Upravljanje salonima</h2>
      <div className='crudDiv'>
        <input
          type="text"
          placeholder="Pretražite salone po imenu..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearching(true);
          }}
          className="search-input"
        />
        <button className='add-salon-button'>
          <Link to="/add" className='add-salon-link'>Dodaj salon</Link>
        </button>
        <div className="saloni-list">
          {filteredSaloni.map(salon => (
            <div className="salon-item" key={salon.naziv}>
              <h3>{salon.naziv}</h3>
              <p>Adresa: {salon.adresa}</p>
              <p>Grad: {salon.grad}</p>
              <p>Telefon: {salon.tel}</p>
              <p>Email: {salon.email}</p>

              <button className="crud-button" onClick={() => handleDelete(salon.naziv)}>Obriši salon</button>
              <Link to={`/update/${salon.naziv}`} className="update-link">Uredi podatke</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Saloni;
