import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send-email', formData);
      if (response.status === 200) {
        alert('Email uspješno poslat!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Došlo je do greške prilikom slanja emaila.');
      }
    } catch (error) {
      console.error('Greška prilikom slanja emaila:', error);
      alert('Došlo je do greške prilikom slanja emaila.');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <h3>Kontaktirajte nas!</h3>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Vaše ime"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBox">
            <input
              type="email"
              placeholder="Vaša e-mail adresa"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBox">
            <textarea
              placeholder="Poruka"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <input type="submit" value="Pošalji poruku" className="btn" />
        </form>
        <div className="image">
          {/*da zauzima prostor*/}
        </div>
      </div>
    </section>
  );
};

export default Contact;
