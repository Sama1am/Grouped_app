import React from 'react';
import { FcGoogle } from 'react-icons/fc';

function LoginButton() {
  const serverUrl = process.env.REACT_APP_APILINK;
  const baseUrl = window.location.origin;

  console.log(serverUrl);

  const handleLogin = async() => {
    const redirectUrl = encodeURIComponent(`${baseUrl}/main`);
    window.location.href = `${serverUrl}/auth/google?redirectUrl=${redirectUrl}`;
  };

  return (
    <div class="d-grid gap-2 col-15 mx-auto">
      <button class="btn btn-outline-secondary btn-lg" style= {{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)' }} type="button" onClick={handleLogin}>
        <FcGoogle size={25}  style={{ marginRight: '8px', background: 'transparent'}}/>
        Login with Google
      </button>
    </div>

  );
}

export default LoginButton;
