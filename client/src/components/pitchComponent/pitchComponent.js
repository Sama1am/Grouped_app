import React, { useState, useContext } from 'react';
import ApplyButton from '../applyButton/applyButton';
import { AdminContext } from '../../context/adminContext';
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import ApprovedComp from '../approvePitches/approvedCheck';
import { usePitchList } from '../../context/pitchContext'; 
import Tag2Component from '../tagComponent/tags2Component';
import { CgCheckO } from 'react-icons/cg'
import { RxCrossCircled } from 'react-icons/rx'
import { GoCircle } from 'react-icons/go'

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
            <section class='col d-flex justify-content-center align-items-center' style={{height: '100%', width: '100%', padding: '2%'}}>
                <section class="card col" style={{width: '100%', padding: '4%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px'}}>
                    <section style={{width: '100%'}}>
                        <section style={{ width: '100%', display: 'flex', fontFamily: 'Gabarito', fontWeight: 'bold', fontSize: 'large' }}>
                            <h3 className="col-md-8">{data.name}</h3>

                            <section class='col-4 d-flex align-items-center justify-content-end'>
                                {data.status === 'pending' ? (null):
                                    <>
                                        {data.status === 'Approved' ? (
                                            <section class='text-align-center btn disabled' style={{backgroundColor: '#AFD8D0', padding: '5%', fontWeight: 'bold'}} >
                                                <CgCheckO size={18}/> {data.status}
                                            </section>) : (
                                                <> 
                                                    {data.status === 'Denied' ? (
                                                    <section class='text-align-center btn disabled' style={{backgroundColor: '#F2C8C8', padding: '5%', fontWeight: 'bold'}} >
                                                        <RxCrossCircled size={18}/> {data.status}
                                                    </section>) : (null)}
                                                </>
                                        )}
                                    </>
                                }
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
                                <li class="list-group-item card-header" aria-current="true" style={{fontWeight: 'bold', backgroundColor: '#5F53C8', color: '#EFF2F9'}}>Members: </li>
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
                                {data.email == userEmail ? (null) : (
                                    <>
                                        {data.groupMembers.length == maxNumOfMembers ? (null) : (
                                    <>

                                        {data.status == 'Approved' ?  null : 
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