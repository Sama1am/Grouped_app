import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import { usePitchList } from '../context/pitchContext'; 
import './MainPage.module.css'

function Join(){
    const { maxNumOfMembers, setMaxNumOfMembers } = usePitchList();
    const { roomCodeC, setRoomCodeC} = useContext(AdminContext);
    const serverUrl = process.env.REACT_APP_APILINK;
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const checkSessionId = async (code) => {
        const url = `${serverUrl}/join/checkSession`;
        const postData = {
            code: code,
        };
        console.log(postData);
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        };
    
        try {
            const response = await fetch(url, requestOptions);
            console.log(response);
    
            // Now you can work with responseData directly
            if (response.status === 200) {
                // Session exists and is active
                console.log("Session exists and is active.");
                setRoomCodeC(inputValue);
                JoinSession(inputValue);
            } else if (response.status === 404) {
                // Session does not exist or is not active
                console.log("Session does not exist or is not active.");
                document.getElementById('input').classList.add('invalid');
                alert("Something went wrong!");
            } else if(response.status === 500){
                // Handle unexpected response
                console.log("Unexpected response from the server.");
            }
        }
        catch(e)
        {
            console.log("an error occurred: " + e);
        }

    }

    const JoinSession = (sessionCode) =>{
        if(document.getElementById('input').classList.contains('invalid')){
            document.getElementById('input').classList.remove('invalid');
        }
        setRoomCodeC(sessionCode);
        window.location.href = '/dashboard?sessionCode=' + sessionCode;
    }

    function checkInputs(){
        if(inputValue === '')
        {
            document.getElementById('input').classList.add('invalid');
        }else{
            checkSessionId(inputValue);
        }
    }

    return(
        <>
            <h3  class="text-center">Join Session</h3>
            <br />
            <div class="input-group mb-3">
                <input 
                    id='input'
                    type="text" 
                    style={{ fontFamily: 'Gabarito', backgroundColor: '#E8F0FE' }}
                    class="form-control" placeholder="Enter Session code..." aria-label="Recipient's username" aria-describedby="button-addon2"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" style={{ fontFamily: 'Gabarito', backgroundColor: '#5F53C8', color: 'white'}}
                    onClick={() => checkSessionId(inputValue)}>
                        Join
                </button>
            </div>
        </>
    )
}

export default Join