import React from 'react';
import styled from 'styled-components';

const AlertDiv = styled.div`
   border: 4px solid #d9004c;
   margin: 45px 150px 0px 150px;
   color: #970035;
   padding: 10px 20px;
   text-align: center;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   background: rgb(217, 0, 76, 0.4);
   /* min-width: 200px; */
   & h3 {
      font-size: 1.3rem;
   }
`;

const Alert = (props) => {
   const { mssg } = props;

   return (
      <>
         <AlertDiv>
            <h3>{mssg}</h3>
         </AlertDiv>
      </>
   );
};

export default Alert;
