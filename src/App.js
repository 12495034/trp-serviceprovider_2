import './App.css';
import './LoginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
//import pages for react-router-dom routes
import Homepage from './pages/Homepage'
import ClinicManagement from './pages/ClinicManagement'
import ClinicDetail from './pages/ClinicDetail';
import UserManagement from './pages/UserManagement'
import LoginScreen from './pages/LoginScreen';
import ResetScreen from './pages/ResetScreen';
import SignupScreen from './pages/SignupScreen';
import UserProfileEdit from './pages/UserProfileEdit';
import UserProfileData from './pages/UserProfileData';
import UnAuthorisedScreen from './pages/UnAuthorisedScreen';
import Missing from './pages/Missing';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        {/* //Protected Routes */}
        <Route element={<ProtectedRoute/>} >
          <Route path="/home" element={<Homepage />} />
          <Route path="/clinics" element={<ClinicManagement />} />
          <Route path="/clinics/:clinicId" element={<ClinicDetail />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:userid" element={<UserProfileData />} />
          <Route path="/users/:userid/edit" element={<UserProfileEdit />} />
         
        </Route>

        {/* //un-protected routed */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/reset" element={<ResetScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/unauthorised" element={<UnAuthorisedScreen />} />

        {/* //Catch all - page does not exist */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </AuthContextProvider >
  );
}

export default App;
