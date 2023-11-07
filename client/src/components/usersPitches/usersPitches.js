import { useContext } from 'react';
import React from "react";
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import MyPitchComp from './myPitchComponent';

function UsersPitches(){
    const { pitchList } = usePitchList();
    const { userEmail, roomCodeC } = useContext(AdminContext);

    return(
        <>
           <section class="d-flex flex-column col" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                <h1 style={{paddingTop: '3%', color: '#36494E'}}>My pitch</h1>
                <br />
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