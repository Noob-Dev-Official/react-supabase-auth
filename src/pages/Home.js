import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../components/Alert';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const HomeStyle = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   & .welcome {
      margin: 300px auto 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 80px;
      border: 1px solid #666666;
      border-radius: 10px;
      max-width: 600px;
      color: #1e1e1e;
      .email {
         padding-top: 10px;
      }
      .update-profile {
         margin-top: 30px;
         color: #fff;
         padding: 10px 20px;
         background-color: #007bff;
         border-color: #007bff;
         border-radius: 0.25rem;
         padding: 10px 80px;
         font-size: 1rem;
         transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
         box-shadow: none;
         text-decoration: none;
         &:hover {
            cursor: pointer;
            background-color: #0058b7;
         }
      }
   }
   & .logout {
      margin-top: 30px;
      button {
         color: #006ee5;
         text-decoration: none;
         font-size: 1.1rem;
         &:hover {
            text-decoration: underline;
         }
      }
   }
`;

const Home = () => {
   const [error, setError] = useState(false);
   const [errorMssg, setErrorMssg] = useState('');
   const navigate = useNavigate();

   const { currentUser, signout } = useAuth();

   const handleSignout = async (e) => {
      e.preventDefault();

      setError(false);

      try {
         await signout();
         navigate('/sign-in');
      } catch (err) {
         console.log(err);
         setErrorMssg('Failed to Logout');
      }
   };

   return (
      <>
         <HomeStyle>
            {error && <Alert mssg={errorMssg} />}

            <div className='welcome'>
               <h1>Welcome to Dashboard</h1>
               <p className='email'>
                  <strong>Email: </strong>
                  {currentUser.email}
               </p>
               <Link className='update-profile' to='/update-profile'>
                  Update Profile
               </Link>
            </div>
            <div className='logout'>
               <button onClick={handleSignout}>Log Out</button>
            </div>
         </HomeStyle>
      </>
   );
};

export default Home;
