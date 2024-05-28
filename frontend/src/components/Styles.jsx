import React from 'react';
import style1 from '../images/style-1.jpg';
import style2 from '../images/style-2.jpg';
import style3 from '../images/style-3.jpg';
import style4 from '../images/style-4.jpg';

const Styles = () => {
  return (
    <section className="styles" id="styles">
      <h1 className="heading">Istražite usluge dostupne na Book-a-Look - u</h1>
      <div className="box-container">
        <div className="box">
          <div className="image">
            <img src={style1} alt="manikir" />
          </div>
          <div className="content">
            <h3 className="title">Manikir i pedikir</h3>
            <p>Biramo samo najbolje salone koji nude vrhunske manikir i pedikir usluge. Uživajte u savršeno sređenim noktima uz profesionalni tretman.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style2} alt="kosa" />
          </div>
          <div className="content">
            <h3 className="title">Stilizovanje kose</h3>
            <p>Na našoj platformi nudimo usluge stilizovanja kose od najboljih salona. Osigurajte savršen izgled za svaku priliku uz stručnjake za kosu.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style3} alt="sminka" />
          </div>
          <div className="content">
            <h3 className="title">Usluge šminkanja</h3>
            <p>Preporučujemo vam samo najbolje salone za šminkanje, koji će istaći vašu ljepotu i učiniti da zablistate na svakom događaju.</p>
          </div>
        </div>
        <div className="box">
          <div className="image">
            <img src={style4} alt="masaza" />
          </div>
          <div className="content">
            <h3 className="title">Masaža</h3>
            <p>Naš izbor salona nudi vrhunske masaže za tijelo i lice. Opustite se i osvježite uz tretmane koji će vam pružiti osećaj svježine i obnove.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Styles;
