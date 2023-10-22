import React, { useEffect, useState, useContext } from 'react';
import { socket } from '../../context/socketContext';
import PitchCreationTab from '../../components/pitchCreation/picthCreationPopUp';
import { AdminContext } from '../../context/adminContext';
import PitchComponent from '../pitchComponent/pitchComponent';
import { usePitchList } from '../../context/pitchContext'; 
import { AiOutlinePlusCircle } from 'react-icons/ai';

function Pitches(){
    const { pitchList, addPitch, myPitch, sessionName } = usePitchList();
    const [triggerValue, setTriggerValue] = useState(true);
    const [createPicthState, setCreatePicthState] = useState(false);
    const [loading, setLoading] = useState(true);
   

    useEffect( () => {
        socket.on('receivePitch', receivePitchHandler);

        return () => {
            socket.off('receivePitch', receivePitchHandler);
        };

    }, [addPitch, socket, loading, pitchList, myPitch]);

    function checkPitchList(){
        console.log(pitchList);
    }

    function receivePitchHandler(data){
        console.log("receided pitch: ", data);
        if(pitchList.some((pitch) => pitch.key === data.key)){
            console.log("pitch with key already exists");
        }else{
            addPitch(data); // Add the received pitch to the context
        }
    }

    return(
        <>
            <section id='Pitches'class="col align-items-center" 
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
                    <PitchCreationTab trigger ={createPicthState} setTrigger={setCreatePicthState} />
                <h1 class='row' style={{paddingTop: '3%'}}>{sessionName}</h1>
                <br />
                <section className='Main' style={{width: '75%'}}>
                    <section className='PitchesSection' id='picthSection' style={{height: '100%'}}>
                        <ul>
                            {pitchList.length === 0 ? (
                                <p>No pitches available.</p>
                            ) : (
                            pitchList.map((pitchData, index) => (
                                <PitchComponent 
                                    key={index} 
                                    data={pitchData}
                                />
                            ))
                            )}
                        </ul>
                    </section>
                    
                    {myPitch >= 1 ? (null): (
                        <section className='PitchButton' style={{position: 'fixed', bottom: '2%', right: '1%'}}>
                            <button class="btn btn-secondary p-2 rounded-circle btn-sm position-absolute bottom-0 end-0 justify-content-center align-items-center" 
                                style={{ padding: "10px" }}
                                type="button" 
                                onClick={() => setCreatePicthState(true)}> 

                                <AiOutlinePlusCircle size={30}/> 
                            </button>
                        </section>
                    )}
                    
                </section>
            </section>
        </>
    )
}

export default Pitches