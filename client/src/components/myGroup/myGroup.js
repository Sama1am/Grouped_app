import { useContext } from 'react';
import React from "react";
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import MyGroupComp from './myGroupComponent';

function MyGroup(){
    const { pitchList } = usePitchList();
    const { userEmail, roomCodeC } = useContext(AdminContext);

    return(
        <>
           <section class="col" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <h1 style={{paddingTop: '3%'}}> My Group</h1>
                <br />
                <section class='align-items-center' 
                    style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                    {pitchList
                        .filter(pitch => pitch.email !== userEmail)
                        .map((pitch, index) => (
                            pitch.groupMembers.some(member => member.email === userEmail) ? (
                            <MyGroupComp key={index} data={pitch} room={roomCodeC} />
                            ) : null
                        ))
                    }
                </section>
            </section>
        </>
    )
}

export default MyGroup