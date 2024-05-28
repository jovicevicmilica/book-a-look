import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalon = () => {
  const [salon, setSalon] = useState({
    ime: '',
    grad: '',
    adresa: '',
    tel: '',
    email: '',
    gradovi: []
  });

  const [usluge, setUsluge] = useState([]);
  const [selectedUsluge, setSelectedUsluge] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGradovi = async () => {
      try {
        const gradoviResponse = await axios.get('http://localhost:5000/gradovi');
        setSalon(prevSalon => ({ ...prevSalon, gradovi: gradoviResponse.data }));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsluge = async () => {
      try {
        const uslugeResponse = await axios.get('http://localhost:5000/usluge');
        setUsluge(uslugeResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGradovi();
    fetchUsluge();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalon(prev => ({ ...prev, [name]: value }));
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

    if (selectedUsluge.length === 0) {
      alert('Morate dodati barem jednu uslugu.');
      return;
    }

    try {
      const salonResponse = await axios.post('http://localhost:5000/saloni', {
        ime: salon.ime,
        grad: salon.grad,
        adresa: salon.adresa,
        tel: salon.tel,
        email: salon.email
      });

      if (salonResponse.status === 200) {
        const salonNaziv = salon.ime;
        const uslugeResponse = await axios.post('http://localhost:5000/salon_usluga', {
          salon: salonNaziv,
          usluge: selectedUsluge
        });

        if (uslugeResponse.status === 200) {
          alert('Salon i usluge uspješno dodati!');
          navigate('/salons');
        } else {
          alert('Greška prilikom dodavanja usluge:', uslugeResponse.status);
        }
      } else {
        alert('Greška prilikom dodavanja salona:', salonResponse.status);
      }
    } catch (error) {
      alert('Error:', error.message);
    }
  };

  return (
    <div className="add-salon-container">
      <h2>Dodaj novi salon</h2>
      <div className='crudDiv'>
        <form onSubmit={handleSubmit} className="salon-form">
          <input 
            type="text" 
            placeholder="Ime" 
            name="ime"
            value={salon.ime} 
            required
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            placeholder="Adresa" 
            name="adresa"
            value={salon.adresa} 
            required
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            placeholder="Telefon" 
            name="tel"
            value={salon.tel} 
            required
            maxLength="9"
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={salon.email} 
            required
            onChange={handleInputChange}
          />
          <select 
            value={salon.grad} 
            required
            onChange={(e) => setSalon(prev => ({ ...prev, grad: e.target.value }))}>
            <option value="">Odaberi grad</option>
            {salon.gradovi.map(grad => (
              <option key={grad} value={grad}>{grad}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddUsluga} className="add-usluga-button">Dodaj uslugu</button>
          {selectedUsluge.map((usluga, index) => (
            <div key={index} className="usluga">
              <select
                value={usluga.naziv}
                required
                onChange={(e) => handleUslugeChange(index, 'naziv', e.target.value)}>
                <option value="">Odaberi uslugu</option>
                {usluge.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <input 
                type="number" 
                placeholder="Cijena" 
                value={usluga.cijena}
                required
                step="0.01"
                onChange={(e) => handleUslugeChange(index, 'cijena', e.target.value)}
              />
            </div>
          ))}
          <br/>
          <button type="submit" className="submit-button">Dodaj salon</button>
        </form>
      </div>
    </div>
  );
};
export default AddSalon;
