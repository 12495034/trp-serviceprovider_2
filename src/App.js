import './App.css';
import './LoginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
} from 'react-router-dom'
//import pages for react-router-dom routes
import Homepage from './pages/Homepage'
import ClinicManagement from './pages/ClinicManagement'
import ClinicDetail from './pages/ClinicDetail';
import UserManagement from './pages/UserManagement'
import LoginScreen from './pages/LoginScreen';
import ResetScreen from './pages/ResetScreen';
import SignupScreen from './pages/SignupScreen';
import UserProfile from './pages/UserProfile';
import UserProfileData from './pages/UserProfileData';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {


  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/clinics" element={<ProtectedRoute><ClinicManagement /></ProtectedRoute>} />
        <Route path="/clinics/:clinicId" element={<ProtectedRoute><ClinicDetail /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/users/:userid" element={<ProtectedRoute><UserProfileData /></ProtectedRoute>} />
        <Route path="/userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

        {/* <Route path="/home" element={<Homepage />} />
        <Route path="/clinics" element={<ClinicManagement />} />
        <Route path="/users" element={<UserManagement />} /> */}

        <Route path="/" element={<LoginScreen />} />
        <Route path="/reset" element={<ResetScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </AuthContextProvider >
  );
}

export default App;
