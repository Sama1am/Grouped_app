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
        
    }, [token, isAdmin]);

    return(
        <>
            <section style={{justifyContent: 'center', position: 'absolute', width: '100%', height: '100vh', backgroundColor: '#E7EAFB', overflow: 'hidden'}}>
                <section className='bg-shape opcaity bg-blur bg-one'></section>''
                <section className='bg-shape opcaity bg-blur bg-two' style={{textAlign: 'center'}}></section>
                <section className='bg-shape-sml opcaity bg-blur bg-two top-right-corner'></section>
                <section className='bg-shape-sml opcaity bg-blur bg-one bottom-right-corner'></section>
            </section>

            <section>
                <section class="position-absolute top-50 start-50 translate-middle align-middle card" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', padding: '1%'}}>
                    <div class="card-body">
                        <br />
                        <section style={{textAlign: 'center'}}>
                            <img src="/logo_grouped.png" alt="My Logo" className='logo'/>
                        </section>
                        <h1 class="text-center card-title" style={{ fontFamily: 'Gabarito' }}>Grouped</h1>
                        <br />
                        <br />
                        { isAdmin === true ? 
                        <> <Create /> <br /><br /> <Join /> </> : 
                        <Join /> 
                        }
                        <br />
                        <button onClick={() =>{console.log(sessionStorage.getItem('admin'))}}>admin</button>
                    </div>
                </section>

                
            </section>
        </>
        
    );
}

export default Main