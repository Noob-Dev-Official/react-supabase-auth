import { BrowserRouter as Router } from 'react-router-dom';

import AllRoutes from './AllRoutes';
import { useAuth } from './contexts/AuthContext';

import './App.css';

function App() {
   const { isSignedIn } = useAuth();

   // const routing = useRoutes(AllRoutes(isSignedIn));

   return (
      <>
         <div className='auth-app'>
            <div className='content'>
               <Router>
                  <AllRoutes isSignedIn={isSignedIn} />
               </Router>
            </div>
         </div>
      </>
   );
}

export default App;
