import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

const generateAvailableSlots = () => {
  const availableSlots = [];
  const startHour = 8; //početak radnog vremena
  const endHour = 20; //kraj radnog vremena

  for (let hour = startHour; hour < endHour; hour++) {
    //generišemo termine za svaki sat od početka do kraja radnog vremena
    const slot = `${hour.toString().padStart(2, '0')}:00`; //formatiramo sat kao HH:00
    availableSlots.push(slot);
  }

  return availableSlots;
};

const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); //postavljamo vrijeme na ponoć kako bismo uporedili samo datume
  return date > today;
};

const getEmailFromToken = (token) => {
  try {
    const decoded = jwtDecode(token); //koristimo ispravno ime funkcije
    return decoded.email;
  } catch (error) {
    console.error('Greška prilikom dekodiranja tokena:', error);
    return null;
  }
};

const BookingForm = () => {
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/saloni');
        setSalons(response.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja salona:', error);
      }
    };

    fetchSalons();
  }, []);

  useEffect(() => {
    //generisanje dostupnih termina i filtriranje nedelje i prošlih dana
    const slots = generateAvailableSlots().filter(slot => {
      const currentDate = new Date();
      const [hours] = slot.split(':');
      currentDate.setHours(hours); //postavljamo trenutni sat kako bismo mogli da proverimo da li je danas
      return currentDate.getDay() !== 0 && isFutureDate(currentDate);
    });
    setAvailableSlots(slots);
  }, []);

  const handleSalonChange = async (salonName) => {
    try {
      setSelectedSalon(salonName);
      const response = await axios.get(`http://localhost:5000/salon_usluge/${salonName}`);
      setServices(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvatanja usluga za salon:', error);
    }
  };

  const handleServiceChange = (serviceName) => {
    const service = services.find(service => service.usluga === serviceName);
    setSelectedService(serviceName);
    setPrice(service ? service.cijena : '');
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); //pretpostavljamo da je token sačuvan u localStorage
      const email = getEmailFromToken(token);

      //slanje zahtjeva za zakazivanje tretmana na backend
      const response = await axios.post('http://localhost:5000/treatments', {
        email, 
        salon: selectedSalon,
        usluga: selectedService,
        cijena: price,
        datum: date,
        vrijeme: time
      });
      console.log('Zakazivanje uspješno:', response.data);
      alert('Uspješno zakazano!');
      navigate("/profile");
    } catch (error) {
      console.error('Greška prilikom zakazivanja tretmana:', error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Zakazivanje tretmana</h2>
      <div className="booking-form">
        <label>Odaberite salon:</label>
        <select value={selectedSalon} onChange={(e) => handleSalonChange(e.target.value)}>
          <option value="">Odaberite salon</option>
          {salons.map(salon => (
            <option key={salon.id} value={salon.naziv}>{salon.naziv}</option>
          ))}
        </select>

        <label>Odaberite uslugu:</label>
        <select value={selectedService} onChange={(e) => handleServiceChange(e.target.value)}>
          <option value="">Odaberite uslugu</option>
          {services.map(service => (
            <option key={service.id} value={service.usluga}>{service.usluga}</option>
          ))}
        </select>

        <label>Cijena:</label>
        <input type="text" value={price} disabled />

        <label>Datum:</label>
        <input type="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Vrijeme:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Odaberite vrijeme</option>
          {availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        <button onClick={handleSubmit}>Zakaži</button>
      </div>
    </div>
  );
};

export default BookingForm;
