import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../components/SignupValidation';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/signup', {
          name: values.name,
          lastname: values.lastname,
          email: values.email,
          password: values.password
        });

        alert('Korisnik uspješno kreiran!');
        navigate('/login');
      } catch (err) {
        console.error("Greška prilikom dodavanja korisnika: ", err);
        alert('Greška prilikom kreiranja korisnika. Pokušajte ponovo.');
      }
    }
  };

  return (
    <div className="register">
      <div className="reg-card">
        <div className="reg-left">
          <h1>Registruj se.</h1>
          <p>
            Book-a-Look olakšava salonima upravljanje terminima, a klijentima omogućava brzo i jednostavno zakazivanje tretmana. Pridružite nam se i unaprijedite svoj proces zakazivanja već danas!
          </p>
          <span>Već imaš nalog?</span>
          <Link to="/login">
            <button>Prijavi se</button>
          </Link>
        </div>
        <div className="reg-right">
          <h1>Registracija</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ime"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span>{errors.name}<br></br></span>}
            <input
              type="text"
              placeholder="Prezime"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              required
            />
            {errors.lastname && <span>{errors.lastname}<br></br></span>}
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span>{errors.email}<br></br></span>}
            <div style={{ position: 'relative' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Lozinka"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
                style={{ paddingRight: '40px' }} 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="visibility-button"
              >
                {passwordVisible ? <FaEyeSlash style={{ color: 'black' }} /> : <FaEye style={{ color: 'black' }} />}
              </button>
            </div>
            {errors.password && <span>{errors.password}<br></br></span>}
            <button type="submit" className="submit-button-reg">Registruj se</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
