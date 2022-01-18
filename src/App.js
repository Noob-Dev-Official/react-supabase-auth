import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';

import './App.css';

function App() {
   return (
      <>
         <Router>
            <div className='auth-app'>
               <div className='content'>
                  <AuthProvider>
                     <Routes>
                        <PrivateRoute path='/' component={Home} />
                        <PrivateRoute
                           path='/update-profile'
                           component={UpdateProfile}
                        />
                        <Route path='/' element={<Home />} />
                        <Route path='/sign-in' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route
                           path='/forgot-password'
                           element={<ForgotPassword />}
                        />
                     </Routes>
                  </AuthProvider>
               </div>
            </div>
         </Router>
      </>
   );
}

export default App;
