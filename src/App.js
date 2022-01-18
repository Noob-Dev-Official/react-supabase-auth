import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import './App.css';

function App() {
   return (
      <>
         <Router>
            <div className='auth-app'>
               <div className='content'>
                  <AuthProvider>
                     <Switch></Switch>
                  </AuthProvider>
               </div>
            </div>
         </Router>
      </>
   );
}

export default App;
