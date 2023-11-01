import React, { useState, useContext } from 'react';
import ApplyButton from '../applyButton/applyButton';
import { AdminContext } from '../../context/adminContext';
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import ApprovedComp from '../approvePitches/approvedCheck';
import { usePitchList } from '../../context/pitchContext'; 
import Tag2Component from '../tagComponent/tags2Component';

function PitchComponent({index, data}) {
    const { maxNumOfMembers } = usePitchList();
    const { userEmail, roomCodeC, isAdmin } = useContext(AdminContext);
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
            <section class='col' style={{height: '100%', width: '90%', padding: '2%'}}>
                <section class="card col" style={{width: '100%', padding: '2%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'}}>
                    <section style={{width: '100%'}}>
                        <section style={{ display: 'flex', fontFamily: 'Gabarito', fontWeight: 'bold', fontSize: 'large' }}>
                            <h3 className="col-md-9">{data.name}</h3>
                            <section className="col-md-3 d-flex justify-content-end">
                                {data.status === 'Approved' ? <ApprovedComp /> : null}
                            </section>
                        </section>
                        <hr />
                        <section class="card-body">
                            <p class="card-text">{data.disc}</p>
                            
                            <section style={{ width: '100%' }}>
                                <a style={{ fontWeight: 'bold' }}> Roles wanted: </a>
                                <br />
                                <section style={{ display: 'flex'}}>
                                    {data.rolesWanted.map((tag, index) => (
                                        <Tag2Component data={tag} key={index} />
                                    ))}
                                </section>
                            </section>   

                            <section style={{ width: '100%' }}>
                                <a style={{ fontWeight: 'bold' }}> Tags: </a>
                                <br />
                                <section style={{ display: 'flex'}}>
                                    {data.tags.map((tag, index) => (
                                        <Tag2Component data={tag} key={index} />
                                    ))}
                                </section>
                            </section>   
                        </section>      
                    </section>

                    <section style={{width: '100%'}}>
                        <ul class="list-group">
                                <li class="list-group-item card-header" aria-current="true" style={{fontWeight: 'bold', backgroundColor: '#E2E7FF'}}>Members: </li>
                                {data.groupMembers.map((member, index) => (
                                    <li class="list-group-item" key={index}>
                                        <BsFillPersonFill size={22} style={{ marginRight: '5px' }}/> <a style={{marginRight:'3%'}}>{member.userName}</a> 
                                        <GrUserWorker size={22} style={{ marginRight: '5px' }} /> {member.role}
                                    </li>
                                ))}
                        </ul> 
                    </section>  
                    <section style={{marginTop:'1%'}}>
                        {isAdmin ? (null) : (
                            <>
                                {data.email === userEmail ? (null) : (
                                    <>
                                        {data.groupMembers.length === maxNumOfMembers ? (null) : (
                                    <>

                                        {data.status === 'Approved' ?  null : 
                                            <section style={{textAlign: 'center'}}>
                                                {data.groupMembers.some((member) => member.email === userEmail) ? (
                                                    null
                                                ) : (<ApplyButton uniqueKey={data.key} />)}

                                            </section> }
                                    </>
                                )}
                                    </>
                                )} 
                            </>
                        )}
                    </section>
                </section>
           </section>
        </>

    );
}

export default PitchComponent; 