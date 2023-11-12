import React, { useState } from 'react';
import { usePitchList } from '../context/pitchContext'; 
import './MainPage.module.css'

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
            document.getElementById('name').classList.add('invalid');
            document.getElementById('select').classList.add('invalid');
            console.log("inputs are empty");
        }else{
            if(document.getElementById('name').classList.contains('invalid')){
                document.getElementById('name').classList.remove('invalid');
                document.getElementById('select').classList.remove('invalid');
            }

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
                <br />
                <section class="mb-3 needs-validation row " noValidate>
                    <section class="col-6">
                        <input 
                            id='name'
                            type="text" 
                            style={{ fontFamily: 'Gabarito', marginRight: '5%', backgroundColor: '#E8F0FE' }}
                            class="form-control" placeholder="Session name"
                            value={SessionName}
                            onChange={handleInputChange}
                        />
                    </section>
                    

                    <section class='col input-group'>
                        <select 
                                id='select'
                                class="form-select" 
                                aria-label="Default select example"
                                value={maxNumOfMembers}
                                style={{backgroundColor: '#E8F0FE', fontFamily: 'Gabarito'}}
                                onChange={(e) => {
                                    setMaxNumOfMembers(e.target.value);
                                }}>

                                <option value="">Group size</option>
                                    <option key={2} value={2}>1-2</option>
                                    <option key={3} value={3}>2-3</option>
                                    <option key={4} value={4}>3-4</option>
                                    <option key={5} value={5}>4-5</option>
                            </select>

                                
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" style={{ fontFamily: 'Gabarito', backgroundColor: '#4F43B3', color: 'white' }}
                            onClick={checkInputs}>
                                Create
                        </button>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Create