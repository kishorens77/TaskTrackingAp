import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Home from './components/home/Home';
import Mytasks from './components/mytasks/Mytasks';
import { useState, useEffect } from 'react';


function App() {

  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('userData');
      const userData = JSON.parse(storedData);
      const userToken = userData.token;

      setToken(userToken);
      setIsLoggedIn(!!token);
    } catch (error) {
      handleLogout();
    }
  }, []);

  console.log("TOKEN at APP", token)


  const handleLogin = () => {
    setIsLoggedIn(true);
    const storedData = localStorage.getItem('userData');
      const userData = JSON.parse(storedData);
      const userToken = userData.token;

      setToken(userToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    setToken('');
  };


  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/Registration" element={<Registration />} />
          {isLoggedIn ? (
            <>
              <Route path="/Home/:id" element={<Home handleLogout={handleLogout} isLoggedIn={isLoggedIn} token={token} />} />
              <Route path="/Mytasks/:id" element={<Mytasks handleLogout={handleLogout} isLoggedIn={isLoggedIn} token={token} />} />
            </>
          ) : (
            "No Token"
          )}
        </Routes>
      </main>
    </BrowserRouter>

  );
}

export default App;
