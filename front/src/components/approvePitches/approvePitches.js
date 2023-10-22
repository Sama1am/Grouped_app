import React from "react";
import { useState, useEffect } from 'react';
import { usePitchList } from '../../context/pitchContext'; 
import ApprovePitchComponent from './approvePitchComponent';

function ApprovePitch(){
    const { pitchList, addPitch } = usePitchList();
    const [triggerValue, setTriggerValue] = useState(false);
    //const admin = localStorage.getItem('admin');
    const [admin, setAdmin] = useState(null);
    const serverUrl = process.env.REACT_APP_APILINK;


    return(
        <>
            <main class="col align-items-center" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                <h1>Approve pitchs</h1>

                <section style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                    {pitchList.map((pitch, index) => (
                        <ApprovePitchComponent key={index} data={pitch}/>
                    ))}           
                </section>
            </main>
        </>
    )
}

export default ApprovePitch