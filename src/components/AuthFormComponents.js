import styled from 'styled-components';

export const AuthFormParent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   color: #1e1e1e;
   border: 1px solid #999999;
   border-radius: 10px;
   max-width: 500px;
   padding: 30px 20px;
   margin: auto;
   margin-top: 100px;
   & p {
      margin-top: 15px;
   }
   & a {
      text-decoration: none;
      color: #006ee5;
      &:visited {
         color: #006ee5;
         text-decoration: none;
      }
      &:hover {
         text-decoration: underline;
         color: #006ee5;
      }
   }
   .forgot-password-sign-in {
      margin-top: 40px;
   }
`;

export const AuthForm = styled.form`
   margin-top: 40px;
   max-width: 400px;
   margin: 20px;
   display: flex;
   flex-direction: column;
   & p {
      text-align: center;
   }
`;

export const AuthFormHeading = styled.h1`
   display: block;
   padding: 0px auto;
`;

export const AuthFormLabel = styled.label`
   font-size: 1.1rem;
`;

export const AuthFormInput = styled.input`
   display: block;
   padding: 8px 5px;
   width: 300px;
   font-size: 1rem;
   border-radius: 5px;
   border: 1px solid #999999;
   margin-top: 8px;
`;

export const AuthFormEmailDiv = styled.div``;

export const AuthFormPasswordDiv = styled.div`
   margin-top: 20px;
`;

export const AuthFormSubmitBtn = styled(AuthFormInput)`
   margin-top: 30px;
   background-color: #006ee5;
   border-color: #006ee5;
   color: #fff;
   padding: 10px 20px;
   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   &:hover {
      cursor: pointer;
      background-color: #0058b7;
   }
`;

export const AuthFormBottomText = styled.p`
   text-align: center;
   margin-top: 25px;
   & a {
      text-decoration: none;
      color: #006ee5;
      &:visited {
         color: #006ee5;
         text-decoration: none;
      }
      &:hover {
         text-decoration: underline;
         color: #006ee5;
      }
   }
`;
