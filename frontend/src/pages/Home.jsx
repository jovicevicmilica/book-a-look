import React from 'react';
import HomeSection from '../components/HomeSection';
import About from '../components/About';
import Styles from '../components/Styles';
import Review from '../components/Review';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div>
      <div id="home"><HomeSection /></div>
      <div id="about"><About /></div>
      <div id="styles"><Styles /></div>
      <div id="contact"><Contact /></div>
      <div id="review"><Review /></div>
    </div>
  );
};

export default Home;
