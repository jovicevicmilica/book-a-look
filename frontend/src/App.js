import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddSalon from './pages/AddSalon';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'; 
import UsersNav from './components/UsersNav';
import AdminNav from './components/AdminNav';
import Logout from './components/Logout'; 
import Footer from './components/Footer';
import UpdateSalon from './components/UpdateSalon';
import Salons from './components/Salons';
import Users from './components/Users';
import Profile from './components/UserProfile';
import BookingForm from './components/BookingForm';
import BookingsAdmin from './components/BookingsAdmin';
import SalonSearch from './components/SalonSearch';
import './App.css';
import './homestyle.css';
import './authstyle.css';
import './salonstyle.css';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null); //da pratimo je li korisnik ili admin

  useEffect(() => {
    const token = localStorage.getItem('token');
    //da vidimo je li token u local storage
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.role);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {user === 'admin' && <AdminNav />}
        {user === 'user' && <UsersNav />}
        {user === null && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/add" element={<AddSalon />} />  
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} /> 
          <Route path="/salons" element={<Salons />} />
          <Route path="/update/:id" element={<UpdateSalon />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/allBookings" element={<BookingsAdmin />} />
          <Route path="/salonSearch" element={<SalonSearch />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
