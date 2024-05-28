import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //mičemo token iz storagea i resetujemo state
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); //redirect
  }, [navigate, setUser]);

  return null;
};

export default Logout;