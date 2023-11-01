import React from 'react';
import LoginButton from '../../components/authLoginbutton/googleOauthButton';
import './loginPage.css'

function Login() {

  return (
    <>
      <div style={{overflow: 'hidden'}}>
        <section style={{justifyContent: 'center', position: 'absolute', width: '100%', height: '100vh', backgroundColor: '#E7EAFB', overflow: 'hidden'}}>
          <section className='bg-shape opcaity bg-blur bg-one'></section>''
          <section className='bg-shape opcaity bg-blur bg-two' style={{textAlign: 'center'}}></section>
          <section className='bg-shape-sml opcaity bg-blur bg-two top-right-corner'></section>
          <section className='bg-shape-sml opcaity bg-blur bg-one bottom-right-corner'></section>
        </section>

          <section style={{width: '100%', height: '100vh'}}>
            <section class="position-absolute top-50 start-50 translate-middle align-middle">
              <section style={{textAlign: 'center'}}>
                <img src="/logo_grouped.png" alt="My Logo" className='logo'/>
              </section>
              <h1 class="text-center" style={{ fontFamily: 'Gabarito' }} className='title'>Grouped</h1>
                <br />
                <br />
                  <LoginButton />
                <br />
                <br />
            </section>
          </section>
        </div>
    </>
  );
};

export default Login;
