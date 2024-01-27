import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element = {<Login />} />
      </Routes>
    </main>

    </BrowserRouter>
    
  );
}

export default App;
