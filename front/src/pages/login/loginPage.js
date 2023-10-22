import React from 'react';
import LoginButton from '../../components/authLoginbutton/googleOauthButton';
import { socket } from '../../context/socketContext';

function Login() {

  return (
    <>
    <div class="position-absolute top-50 start-50 translate-middle align-middle">
      <h1 class="text-center fs-1" style={{ fontFamily: 'Gabarito' }}>Grouped</h1>
        <br />
        <br />
      <LoginButton />
        <br />
        <br />
    </div>
    </>
  );
};

export default Login;
