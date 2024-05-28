import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../components/LoginValidation';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode'; //dodato za dekodiranje JWT tokena

const Login = ({ setUser }) => { //primamo setUser kao prop
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/login', values)
        .then(res => {
          if (res.data.token) {
            const token = res.data.token;
            localStorage.setItem('token', token);

            //dekodiranje tokena da se dobiju podaci o korisniku
            const decoded = jwtDecode(token);
            setUser(decoded.role); //postavljanje korisničke uloge u stanje

            if (decoded.role === 'admin') {
              navigate('/allBookings');
            } else {
              navigate('/profile');
            }
          } else {
            alert(res.data);
            navigate('/login');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Prijavi se.</h1>
          <p>
            Book-a-Look olakšava salonima upravljanje terminima, a klijentima omogućava brzo i jednostavno zakazivanje tretmana. Pridružite nam se i unaprijedite svoj proces zakazivanja već danas!
          </p>
          <span>Nemaš nalog?</span>
          <Link to="/signup">
            <button>Registruj se</button>
          </Link>
        </div>
        <div className="right">
          <h1>Prijava</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail adresa"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span>{errors.email} <br /></span>}
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
                  right: '-70px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {passwordVisible ? <FaEyeSlash style={{ color: 'black' }} /> : <FaEye style={{ color: 'black' }} />}
              </button>
            </div>
            {errors.password && <span>{errors.password} <br /></span>}
            <button type="submit">Prijavi se</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
