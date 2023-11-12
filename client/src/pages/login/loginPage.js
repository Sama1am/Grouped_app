import React from 'react';
import LoginButton from '../../components/authLoginbutton/googleOauthButton';
import './loginPage.css'

function Login() {

  return (
    <>
      <div style={{overflow: 'hidden'}}>
        {/* <section style={{justifyContent: 'center', position: 'absolute', width: '100%', height: '100vh', backgroundColor: '#b9bee1', overflow: 'hidden'}}>
          <section className='bg-shape opcaity-2 bg-blur bg-purple'></section>''
          <section className='bg-shape opcaity bg-blur bg-green' style={{textAlign: 'center'}}></section>
          <section className='bg-shape-sml opcaity-2 bg-blur bg-purple top-right-corner'></section>
          <section className='bg-shape-sml opcaity bg-blur bg-pink bottom-right-corner'></section>
        </section> */}
        
        <section style={{ position: 'absolute', width: '100%', height: '100vh', backgroundColor: '#b9bee1', overflow: 'hidden'}}>
          <section>
            <section className='blob bg-purple idk  bg-blur'></section>
            <section className='blob-m bg-green idk-1  bg-blur'></section>
            <section className='blob-s bg-pink idk-2 blur'></section>
          </section>

          <section>
            <section className='two-blob bg-purple ps bg-blur-2'></section>
            <section className='two-blob-2 bg-green ps-1  bg-blur-2'></section>
            <section className='two-blob-3 bg-pink ps-2 blur-2'></section>
          </section>

          <section>
            <section className='three-blob two-ps bg-purple sec-blur'></section>
            <section className='three-blob-2 two-ps-2 bg-green sec-blur'></section>
            <section className='three-blob-3 two-ps-3 bg-pink sec-blur-2'></section>
          </section>
        </section>



          <section style={{width: '100%', height: '100vh'}}>
            <section class="position-absolute top-50 start-50 translate-middle align-middle">
              <section style={{textAlign: 'center'}}>
                <img src="/logo_white.png" alt="My Logo" className='logo'/>
              </section>
              <h1 class="text-center" style={{ fontFamily: 'Gabarito', color: 'white' }} className='title'>Grouped</h1>
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
