import React, { useState, useEffect, useContext  } from 'react';
import { usePitchList } from '../context/pitchContext'; 
import { socket } from '../context/socketContext';

function Create(){
    const { maxNumOfMembers, setMaxNumOfMembers } = usePitchList();
    const [maxPeople, setMaxPeople] = useState(undefined);
    const serverUrl = process.env.REACT_APP_APILINK;
    const [SessionName, setSessionName] = useState('');
    let SessionCode = ''

    const handleInputChange = (event) => {
        setSessionName(event.target.value);
    };

    function generateCode(){
        let code = ''
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 6; i++) {
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        //setSessionCode(code);
        SessionCode = code;
        console.log(SessionCode);
        //console.log(SessionCode);
        return SessionCode;
    }
   
    async function pushSession(){
        const url = `${serverUrl}/session/createSession`;
        const postData = {
            sessionCode: SessionCode,
            moduleName: SessionName,
            active: 1,
            maxGroupMembers: maxNumOfMembers
        };
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        };
    
        const data =  await fetch(url, requestOptions)
        console.log( await data.json());
    }

    function checkInputs(){
        if(SessionName === '' || maxNumOfMembers === undefined){
            console.log(SessionName);
            console.log(maxNumOfMembers);
            console.log("inputs are empty");
        }else{
            joinWithMultipleActions();
        }
    }

    function joinWithMultipleActions(){
        generateCode();
        pushSession();
        JoinSession(SessionCode);
    }

    function JoinSession(sessionCode){
        window.location.href = '/dashboard?sessionCode=' + sessionCode;
    }

    return(
        <>
            <section>
                <h3 class="text-center">Create Session</h3>
               
                <div class="input-group mb-3 needs-validation" noValidate>
                    <input 
                        type="text" 
                        style={{ fontFamily: 'Gabarito' }}
                        class="form-control" placeholder="Enter session name" aria-label="Recipient's username" aria-describedby="button-addon2"
                        value={SessionName}
                        onChange={handleInputChange}
                    />
                    <br />
                    <select 
                            class="form-select" 
                            aria-label="Default select example"
                            value={maxNumOfMembers}
                            onChange={(e) => {
                                setMaxNumOfMembers(e.target.value);
                            }}>

                            <option value="">Number of group members</option>
                                <option key={2} value={2}>1-2</option>
                                <option key={3} value={3}>2-3</option>
                                <option key={4} value={4}>3-4</option>
                                <option key={5} value={5}>4-5</option>
                        </select>

                            
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" style={{ fontFamily: 'Gabarito' }}
                        onClick={checkInputs}>
                            Create session
                    </button>
                </div>
            </section>
        </>
    )
}

export default Create