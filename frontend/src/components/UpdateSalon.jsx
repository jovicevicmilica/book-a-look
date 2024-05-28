import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateSalon = ({ naziv }) => {
  const [salon, setSalon] = useState({});
  const [formData, setFormData] = useState({
    grad: '',
    adresa: '',
    tel: '',
    email: ''
  });
  const [gradovi, setGradovi] = useState([]);
  const [usluge, setUsluge] = useState([]);
  const [selectedUsluge, setSelectedUsluge] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const currentPath = window.location.pathname;
        const parts = currentPath.split('/');
        const nazivSalona = decodeURIComponent(parts[2]);
        const response = await axios.get(`http://localhost:5000/saloni/${nazivSalona}`);
        setSalon(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja podataka o salonu:', error);
      }
    };

    const fetchGradovi = async () => {
      try {
        const gradoviResponse = await axios.get('http://localhost:5000/gradovi');
        setGradovi(gradoviResponse.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja gradova:', error);
      }
    };

    const fetchUsluge = async () => {
      try {
        const uslugeResponse = await axios.get('http://localhost:5000/usluge');
        setUsluge(uslugeResponse.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja usluga:', error);
      }
    };

    fetchSalon();
    fetchGradovi();
    fetchUsluge();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUslugeChange = (index, field, value) => {
    setSelectedUsluge(prevUsluge => {
      const updatedUsluge = [...prevUsluge];
      updatedUsluge[index][field] = value;
      return updatedUsluge;
    });
  };

  const handleAddUsluga = () => {
    setSelectedUsluge(prevUsluge => ([...prevUsluge, { naziv: '', cijena: '' }]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentPath = window.location.pathname;
      const parts = currentPath.split('/');
      const nazivSalona = decodeURIComponent(parts[2]);

      await axios.put(`http://localhost:5000/saloni/${nazivSalona}`, formData);
      alert('Podaci o salonu su uspješno ažurirani!');
      navigate("/salons");
    } catch (error) {
      console.error('Greška prilikom ažuriranja podataka o salonu:', error);
      alert('Došlo je do greške prilikom ažuriranja podataka o salonu.');
    }
  };

  const handleAddNewUsluga = async () => {
    try {
      const currentPath = window.location.pathname;
      const parts = currentPath.split('/');
      const nazivSalona = decodeURIComponent(parts[2]);

      const uslugaData = {
        salon: salon.naziv, //prilagođeno za slanje naziva salona
        usluge: selectedUsluge //koristimo stanje odabranih usluga
      };

      const response = await axios.post(`http://localhost:5000/salon_usluga`, uslugaData);
      if (response.status === 200) {
        alert('Usluga uspješno dodana salonu!');
        setSelectedUsluge([{ naziv: '', cijena: '' }]);
      } else {
        alert('Došlo je do greške prilikom dodavanja usluge salonu.');
      }
    } catch (error) {
      console.error('Greška prilikom dodavanja usluge salonu:', error);
      alert('Došlo je do greške prilikom dodavanja usluge salonu.');
    }
  };

  return (
    <div className="update-salon-container">
      <h2>Ažuriraj salon: {salon.naziv}</h2>
      <form onSubmit={handleSubmit} className="update-salon-form">
        <select
          value={formData.grad}
          required
          onChange={(e) => setFormData(prev => ({ ...prev, grad: e.target.value }))}
        >
          <option value="">Odaberi grad</option>
          {gradovi.map(grad => (
            <option key={grad} value={grad}>{grad}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Adresa"
          name="adresa"
          value={formData.adresa}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="tel"
          value={formData.tel}
          required
          maxLength="9"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">Ažuriraj Salon</button>
      </form>
      <p>Napomena: Naziv salona se ne može mijenjati jer je primarni ključ u bazi podataka.</p>

      <div className="add-usluga">
        <h3>Dodaj uslugu:</h3>
        <button type="button" className="add-usluga-button" onClick={handleAddUsluga}>Dodaj uslugu</button>
        {selectedUsluge.map((usluga, index) => (
          <div key={index} className="usluga">
            <select
              value={usluga.naziv}
              required
              onChange={(e) => handleUslugeChange(index, 'naziv', e.target.value)}
            >
              <option value="">Odaberi uslugu</option>
              {usluge.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cena"
              value={usluga.cijena}
              required
              step="0.01"
              onChange={(e) => handleUslugeChange(index, 'cijena', e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="submit-button" onClick={handleAddNewUsluga}>
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default UpdateSalon;
