import logo from './logo.svg';
import './App.css';
import './LoginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ClinicManagement from './pages/ClinicManagement'
import UserManagement from './pages/UserManagement'
import LoginScreen from './pages/LoginScreen';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="Home" element={<Homepage />} />
        <Route path="clinics" element={<ClinicManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </div >
  );
}

export default App;
