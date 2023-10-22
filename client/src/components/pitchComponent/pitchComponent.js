import React, { useState, useContext, useEffect, memo } from 'react';
import ApplyButton from '../applyButton/applyButton';
import { AdminContext } from '../../context/adminContext';
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import ApprovedComp from '../approvePitches/approvedCheck';
import { usePitchList } from '../../context/pitchContext'; 
import Tag2Component from '../tagComponent/tags2Component';

function PitchComponent({index, data}) {
    const { maxNumOfMembers } = usePitchList();
    const { userEmail, roomCodeC } = useContext(AdminContext);
    const [author, setAuthor] = useState(undefined);
    const [inPitch, setInPitch] = useState(undefined)

    if (data.name === undefined || data.disc === undefined) {
        // Don't render the component if data or its properties are empty
        return null;
    }

    function checkMembers(){
        let temp =  data.groupMembers.some((member) => member.email === userEmail);
        console.log("TEMP IS", temp);
        setInPitch(temp);
    }

    return (
        <>
            <section class='container-md' style={{height: '100%', padding: '3%'}}>
                <section class="card text col" style={{width: '100%'}}>
                    <section style={{width: '100%'}}>
                        <section className="card-header" style={{ display: 'flex', fontFamily: 'Gabarito', fontWeight: 'bold', fontSize: 'large' }}>
                            <h3 className="col-md-9">{data.name}</h3>
                            <section className="col-md-3 d-flex justify-content-end">
                                {data.status === 'Approved' ? <ApprovedComp /> : null}
                            </section>
                        </section>

                            <section class="card-body">
                                <p class="card-text">{data.disc}</p>

                                <section style={{width: '100%', display: 'flex', flexDirection: 'row' }}>
                                    <a style={{fontWeight: 'bold'}}> Tags: </a> <nv /><nv />
                                    <br />
                                    <section style={{width: '100%', }}>
                                        {data.tags.map((tag, index) => (
                                            <Tag2Component data={tag}/>
                                        ))}
                                    </section>
                                </section>   
                            </section>

                            
                    </section>        
                    
                    <section style={{width: '100%'}}>
                        <ul class="list-group">
                                <li class="list-group-item card-header" aria-current="true" style={{fontWeight: 'bold'}}>Members: </li>
                                {data.groupMembers.map((member, index) => (
                                    <li class="list-group-item" key={index}>
                                        <BsFillPersonFill style={{ marginRight: '5px' }}/> {member.userName} <nv /><nv />
                                        <GrUserWorker style={{ marginRight: '5px' }} /> {member.role}
                                    </li>
                                ))}
                        </ul> 
                    </section>  

                    {data.email === userEmail ? (null) : (
                                <>
                                    {data.groupMembers.length === maxNumOfMembers ? (null) : (
                                <>

                                    {data.status === 'Approved' ?  null : 
                                        <section class="card-footer text-body-secondary">
                                            {data.groupMembers.some((member) => member.email === userEmail) ? (
                                                null
                                            ) : (<ApplyButton uniqueKey={data.key} />)}

                                        </section> }
                                </>
                            )}
                                </>
                    )} 
                </section>
           </section>
        </>

    );
}

export default PitchComponent; 