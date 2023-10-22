import { useEffect, useState, useContext } from 'react';
import React from "react";
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import MyPitchComp from './myPitchComponent';

function UsersPitches(){
    const { pitchList } = usePitchList();
    const { userEmail, roomCodeC } = useContext(AdminContext);

    return(
        <>
           <section class="col" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                <h1>My pitch</h1>
                <section class='align-items-center' 
                    style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                {pitchList.map((pitch, index) =>
                    pitch.email === userEmail ? (
                    <MyPitchComp key={index} data={pitch} room={roomCodeC}/>
                    ) : null
                )}      
                </section>
            </section>
        </>
    )
}

export default UsersPitches