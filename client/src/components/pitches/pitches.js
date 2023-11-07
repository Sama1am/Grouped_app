import React, { useEffect, useState, useContext } from 'react';
import { socket } from '../../context/socketContext';
import PitchCreationTab from '../../components/pitchCreation/picthCreationPopUp';
import { AdminContext } from '../../context/adminContext';
import PitchComponent from '../pitchComponent/pitchComponent';
import { usePitchList } from '../../context/pitchContext'; 
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './pitches.css';

function Pitches(){
    const { isAdmin,  userName} = useContext(AdminContext);
    const { pitchList, addPitch, myPitch, sessionName } = usePitchList();
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
            <section id='Pitches'class="d-flex flex-column col align-items-center"  aria-hidden="true"
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <PitchCreationTab trigger ={createPicthState} setTrigger={setCreatePicthState} style={{height: '85%'}}/>

                    <section class='row'>
                        {sessionName === '' ? (
                            <h1 class="card-title placeholder-glow row" style={{paddingTop: '3%', width: '30%'}}>
                                <span class="placeholder col-10"></span>
                            </h1>
                        ) : (
                            <h1 class='row' style={{paddingTop: '3%', color: '#36494E'}}>{sessionName}</h1>
                        )}
                    </section>
                    
                    <section class="row d-flex flex-column align-items-center" className='Main' style={{ width: '100%', padding: '1%' }}>
                        <section id='pitchSection' class="col-8 mx-auto" style={{ width: '70%', height: '100%' }}>
                            {pitchList.length === 0 ? (
                            <p class="text-center">No pitches available.</p>
                            ) : (
                            pitchList.map((pitchData, index) => (
                                <PitchComponent
                                key={index}
                                data={pitchData}
                                />
                            ))
                            )}
                        </section>
                    </section>
                
                {isAdmin ? (
                        <section class="col align-self-end justify-content-end" className='PitchButton' style={{position: 'fixed', bottom: '2%', right: '1%'}}>
                            <button class="p-2 position-absolute bottom-0 end-0" 
                                className='create-pitchbtn'
                                type="button" 
                                onClick={() => setCreatePicthState(true)}> 
                                <AiOutlinePlusCircle size={30} color='white'/> 
                            </button>
                        </section>
                    ) : (
                        <>
                        {myPitch >= 1 ? (null) : (
                            <section class="col align-self-end justify-content-end" style={{position: 'fixed', bottom: '2%', right: '1%'}}>
                                <button class="p-2 position-absolute bottom-0 end-0" 
                                    className='create-pitchbtn'
                                    type="button" 
                                    onClick={() => setCreatePicthState(true)}> 
                                    <AiOutlinePlusCircle size={30} color='white'/> 
                                </button>
                            </section>
                        )}
                        </>
                    )}

            </section>
        </>
    )
}

export default Pitches