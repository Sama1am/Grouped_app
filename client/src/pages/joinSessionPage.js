import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import { usePitchList } from '../context/pitchContext'; 

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
        setRoomCodeC(sessionCode);
        window.location.href = '/dashboard?sessionCode=' + sessionCode;
    }

    return(
        <>
            <h3  class="text-center">Join Session</h3>
            <div class="input-group mb-3">
                <input 
                    type="text" 
                    style={{ fontFamily: 'Gabarito' }}
                    class="form-control" placeholder="Enter Session code..." aria-label="Recipient's username" aria-describedby="button-addon2"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" style={{ fontFamily: 'Gabarito' }}
                    onClick={() => checkSessionId(inputValue)}>
                        Join
                </button>
            </div>
        </>
    )
}

export default Join