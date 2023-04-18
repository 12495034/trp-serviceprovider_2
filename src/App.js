import './styling/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Routes,
  Route,
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
import ProtectedRoute from './navigation/ProtectedRoute';
import PrivacyPolicyMobile from './pages/PrivacyPolicyMobile';
import PrivacyPolicyWeb from './pages/PrivacyPolicyWeb';
import TermsAndConditions from './pages/TermsAndConditions';
import WelcomeScreen from './pages/WelcomeScreen';

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
        <Route path="/privacy-policy-mobile" element={<PrivacyPolicyMobile />} />
        <Route path="/privacy-policy-web" element={<PrivacyPolicyWeb />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        {/* //Catch all - page does not exist */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </AuthContextProvider >
  );
}

export default App;
