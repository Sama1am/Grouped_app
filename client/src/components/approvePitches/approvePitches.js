import React from "react";
import { useState, useEffect } from 'react';
import { usePitchList } from '../../context/pitchContext'; 
import ApprovePitchComponent from './approvePitchComponent';

function ApprovePitch(){
    const { pitchList } = usePitchList();

    return(
        <>
            <main class="col align-items-center" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', padding: '2%'}}>
                <h1>Approve pitchs</h1>
                <br />
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