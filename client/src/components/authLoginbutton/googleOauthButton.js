import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import './authButton.css'


function LoginButton() {
  const serverUrl = process.env.REACT_APP_APILINK;
  const baseUrl = process.env.FRONTEND;  //window.location.origin;

  console.log(serverUrl);

  const handleLogin = async() => {
    const redirectUrl = encodeURIComponent(`${baseUrl}/main`);
    window.location.href = `${serverUrl}/auth/google?redirectUrl=${redirectUrl}`;
  };

  return (
    <div class="d-grid gap-2 col-15 mx-auto">
      <button className='button-login' style= {{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)'}} type="button" onClick={handleLogin}>
        <AiFillGoogleCircle size={30}  style={{ marginRight: '8px', background: 'transparent'}}/>
        Login with Google
      </button>
    </div>

  );
}

export default LoginButton;
