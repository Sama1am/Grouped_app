import React from 'react';
import LoginButton from '../../components/authLoginbutton/googleOauthButton';
import './loginPage.css'

function Login() {

  return (
    <>
        <section className="bodyColour" style={{width: '100%', height: '100%'}}>
          <section class="position-absolute top-50 start-50 translate-middle align-middle">
            <img src="/logo2.png" alt="My Logo" style={{height: '100%', width: '75px', paddingTop: '5%', alignSelf: 'center'}}/>
            <h1 class="text-center" style={{ fontFamily: 'Gabarito' }} className='title'>Grouped</h1>
              <br />
              <br />
                <LoginButton />
              <br />
              <br />
          </section>
        </section>
    </>
  );
};

export default Login;
