import React from 'react';
import quoteImg from '../images/quote-img.png';
import review1 from '../images/review-1.png';
import review2 from '../images/review-2.png';
import review3 from '../images/review-3.png';

const Review = () => {
  return (
    <section className="review" id="review">
      <h1 className="heading">Mišljenja naših klijenata</h1>
      <div className="box-container">
        <div className="box">
          <img src={quoteImg} alt="" className="quote" />
          <p>Book-a-Look mi je pomogao da pronađem savršen salon za moje vjenčanje. Usluga je bila besprijekorna, a frizura i šminka su trajale cijeli dan. Toplo preporučujem svima da isprobaju Book-a-Look!</p>
          <img src={review1} className="user" alt="" />
          <h3>Marija Marković</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>
        <div className="box">
          <img src={quoteImg} alt="" className="quote" />
          <p>Zahvaljujući Book-a-Looku, našla sam salon koji nudi nevjerovatne usluge stilizovanja kose. Moja kosa nikada nije izgledala bolje, a proces rezervacije je bio jednostavan i brz.</p>
          <img src={review2} className="user" alt="" />
          <h3>Jana Janković</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>
        <div className="box">
          <img src={quoteImg} alt="" className="quote" />
          <p>Book-a-Look mi je omogućio da uživam u vrhunskoj masaži lica i tijela. Saloni koje preporučuju zaista su najbolji, i uvijek se osjećam opušteno i obnovljeno nakon tretmana.</p>
          <img src={review3} className="user" alt="" />
          <h3>Jovana Jovanović</h3>
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
