import React from 'react';
import aboutImage from '../images/about.jpg';
import icon1 from '../images/about-icon-1.png';
import icon2 from '../images/about-icon-2.png';
import icon3 from '../images/about-icon-3.png';

const About = () => {
  return (
    <section className="about" id="about">
      <h1 className="heading">O nama</h1>
      <div className="row">
        <div className="image">
          <img src={aboutImage} alt="About us" />
        </div>
        <div className="content">
          <h3 className="title">Mi smo Book-a-Look</h3>
          <p>Dobrodošli na Book-a-Look, vaš pouzdani partner u svijetu ljepote! Naša platforma pruža jedinstveno mjesto gdje saloni ljepote mogu da se registruju i predstave svoje usluge širokoj publici zainteresovanoj za njegu i opuštanje. Na Book-a-Look-u, saloni imaju priliku da se istaknu, promovišu svoje specijalne tretmane i privuku nove klijente.</p>
          <p>Za naše korisnike, Book-a-Look nudi bezbrižno iskustvo zakazivanja različitih tretmana na jednom mjestu. Od frizerskih usluga, preko masaža, do tretmana lica i tijela, naša platforma omogućava vam da lako pronađete idealan salon u vašoj blizini. Sa samo nekoliko klikova, možete zakazati, otkazati ili izmijeniti svoje termine, sve to bez potrebe za telefonskim pozivima ili čekanjem.</p>
          <p>Takođe, pružamo mogućnost za korisnike da kreiraju svoje profile, što dodatno olakšava praćenje zakazanih termina i omiljenih usluga.</p>
          <p> Pridružite se našoj zajednici danas i iskusite novi, efikasniji način da se brinete o svojoj ljepoti i zdravlju.</p>        
          <div className="icons-container">
            <div className="icons">
              <img src={icon1} alt="pristupacno" />
              <h3>Pristupačno</h3>
            </div>
            <div className="icons">
              <img src={icon2} alt="jednostavno" />
              <h3>Jednostavno</h3>
            </div>
            <div className="icons">
              <img src={icon3} alt="brzo" />
              <h3>Brzo</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
