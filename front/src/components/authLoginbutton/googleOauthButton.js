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
    // <button onClick={handleLogin}>Login with Google</button>

    <div class="d-grid gap-2 col-15 mx-auto">
      <button class="btn btn-light btn-lg" type="button" onClick={handleLogin}>
        <FcGoogle  style={{ marginRight: '8px' }}/>
        Login with Google
      </button>
    </div>

  );
}

export default LoginButton;
