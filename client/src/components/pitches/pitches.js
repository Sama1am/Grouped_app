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
                style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: "100vh"}}>
                    <PitchCreationTab trigger ={createPicthState} setTrigger={setCreatePicthState} style={{height: '85%'}}/>
                    {sessionName === '' ? (
                        <h1 class="card-title placeholder-glow row" style={{paddingTop: '3%', width: '30%'}}>
                            <span class="placeholder col-10"></span>
                        </h1>
                    ) : (
                        <h1 class='row' style={{paddingTop: '3%'}}>{sessionName}</h1>
                    )}
                <section class="d-flex flex-column col align-items-center" className='Main' style={{width: '90%', padding: '1%'}}>
                    <section class="align-items-center" id='picthSection' style={{width: '90%', height: '100%'}}>
                        <section>
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
                        </section>
                    </section>
                    
                    {isAdmin ? (
                        <section className='PitchButton' style={{position: 'fixed', bottom: '2%', right: '1%'}}>
                            <button class="btn btn-secondary p-2 rounded-circle btn-sm position-absolute bottom-0 end-0 justify-content-center align-items-center" 
                                style={{ padding: "10px", backgroundColor: '#636363' }}
                                type="button" 
                                onClick={() => setCreatePicthState(true)}> 

                                <AiOutlinePlusCircle size={30} color='white'/> 
                            </button>
                        </section>
                    ) :(
                        <>
                            {myPitch >= 1 ? (null): (
                                <section style={{position: 'fixed', bottom: '2%', right: '1%'}}>
                                    <button class="position-absolute bottom-0 end-0 justify-content-center align-items-center" 
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
            </section>
        </>
    )
}

export default Pitches