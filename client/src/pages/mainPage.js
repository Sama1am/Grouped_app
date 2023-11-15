import React, { useEffect, useState, useContext } from "react";
import Join from './joinSessionPage';
import Create from './createSessionPage';
import { AdminContext } from '../context/adminContext'

function Main(){
    const { isAdmin, setIsAdmin, userEmail, setUserEmail  } = useContext(AdminContext);
    const serverUrl = process.env.REACT_APP_APILINK;
    const searchParams = new URLSearchParams(window.location.search);
    const [token, setToekn] = useState(searchParams.get('token'));

    if(token)
    {
        sessionStorage.setItem('token', token);
    }

    async function getAdmin(token){
        const url = `${serverUrl}/profile/getAdmin`;
            
            try{
                const response = await fetch(url, {
                  method: 'GET', // Specify the GET method
                  headers: {
                    'Authorization': `Bearer ${token}`, // Set the JWT as a Bearer token
                    'Content-Type': 'application/json', // Set the content type if needed
                    },
                });
            
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
    
                const data = await response.json()
                
                if(data.isAdmin === true)
                {
                    console.log("from server: " + data.isAdmin);
                    await setIsAdmin(true);
                    sessionStorage.setItem('admin', true);
                    
                    console.log("from context:" + isAdmin);
                }
                else if(data.isAdmin === false)
                {
                    console.log("from server: " + data.isAdmin);
                    await setIsAdmin(false);
                    sessionStorage.setItem('admin', false);
                    
                    console.log("from context:" + isAdmin);
                }
                else if(response.status === 500){
                    // Handle unexpected response
                    console.log("Unexpected response from the server.");
                }
                
            } 
            catch (error) 
            {
                console.log(error);
                // Handle errors or show an error message to the user
            }
    }

    async function getUserEmail(){
        const url = `${serverUrl}/profile/getEmail`;
        const token = sessionStorage.getItem('accessToken');
        try{

            const response = await fetch(url, {
                method: 'GET', // Specify the GET method
                headers: {
                    'Authorization': `Bearer ${token}`, // Set the JWT as a Bearer token
                    'Content-Type': 'application/json', // Set the content type if needed
                },
            });
          
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            await setUserEmail(data);
        }
        catch (e)
        {
            console.log(e);
        }
    }

    useEffect(() => {
        if(isAdmin === undefined)
        {
            getAdmin(token);
        }

        if(userEmail === '')
        {
            getUserEmail();
        } 

        if(!isAdmin && sessionStorage.getItem('profileCreated') == true){
            sessionStorage.setItem('profileCreated', false)
        }
        
    }, [token, isAdmin, setIsAdmin]);

    return(
        <>
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

            {isAdmin === undefined ? (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <section>
                    <section class="position-absolute top-50 start-50 translate-middle align-middle card" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', padding: '1%', borderRadius: '25px'}}>
                        <div class="card-body">
                                <br />
                            <section style={{textAlign: 'center'}}>
                                <img src="/logo_grouped.png" alt="My Logo" className='logo'/>
                            </section>
                            <h1 class="text-center card-title" style={{ fontFamily: 'Gabarito' }}>Grouped</h1>
                                <br />
                                {isAdmin == true ? (
                                <>
                                    <Create />
                                    <br />
                                    <br />
                                </>
                                ) : null }

                                <Join />
                                    <br />
                        </div>
                    </section>

                
                </section>        
            )}
            
        </>
        
    );
}

export default Main