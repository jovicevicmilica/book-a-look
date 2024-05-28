import React from 'react';
import instagram from "../images/instagram.png";

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Zapratite nas!</h3>
          <p>Možeš nas pronaći ovdje:</p>
          <div className="share">
            <img src={instagram} className="instagram-icon"/>
          </div>
        </div>
        <div className="box">
          <h3>Kontaktirajte nas</h3>
          <p>+382 67 123 456</p>
          <a href="#" className="link">bookalook@gmail.com</a>
        </div>
        <div className="box">
          <h3>Lokacija</h3>
          <p>88 Bulevar Svetog Petra Cetinjskog<br />
            Podgorica <br />
            Crna Gora</p>
        </div>
      </div>
      <div className="credit"> napravljeno od strane <span>book-a-look</span> | sva prava zaštićena! </div>
    </section>
  );
};

export default Footer;
