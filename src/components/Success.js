import React from 'react';
import styled from 'styled-components';

const SuccessDiv = styled.div`
   border: 4px solid #198754;
   margin: 45px 150px 0px 150px;
   color: #115e3a;
   padding: 10px 20px;
   text-align: center;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   background: rgb(25, 135, 84, 0.4);
   /* min-width: 200px; */
   & h3 {
      font-size: 1.3rem;
   }
`;

const Success = (props) => {
   const { mssg } = props;

   return (
      <>
         <SuccessDiv>
            <h3>{mssg}</h3>
         </SuccessDiv>
      </>
   );
};

export default Success;
