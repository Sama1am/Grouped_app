import React, { useEffect, useState, useContext } from "react";
import './pitchCreation.css'
import { socket } from '../../context/socketContext';
import { useLocation } from 'react-router-dom';
import { usePitchList } from '../../context/pitchContext';
import { AdminContext } from '../../context/adminContext';
import TagComponent from '../tagComponent/tagComponent';

function PitchCreationTab(props) {
    const { userEmail, roles, isAdmin, userName } = useContext(AdminContext);
    const { setMyPitch, myPitch } = usePitchList();
    const serverUrl = process.env.REACT_APP_APILINK;
    const [sessionCode, setSessionCode] = useState('');
    const [pitchName, setPitchName] = useState('');
    const [pitchDisc, setPitchDisc] = useState('');
    const [pitchTags, setPitchTags] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [rolesWanted, setRolesWanted] = useState([]);
    const [status, setStatus] = useState('pending');
    const [pitchTriggerValue, setPitchTriggerValue] = useState(false);
    const [tempInput, setTempInput] = useState('')

    let key 
    let members = [];

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const nameChange = (event) =>{
        setPitchName(event.target.value);
    }

    const pitchDiscChange = (event) =>{
        setPitchDisc(event.target.value);
    }

    const handleRoleChange = (event) => {
        const roleValue = event.target.value;
        if (event.target.checked) {
          // If the checkbox is checked, add the role to the selectedRoles array
          setRolesWanted([...rolesWanted, roleValue]);
        } else {
          // If the checkbox is unchecked, remove the role from the selectedRoles array
          setRolesWanted(rolesWanted.filter((role) => role !== roleValue));
        }
    };

    const handleTagSubmit = () => {
        // Make sure tempInput is not empty before adding it to pitchTags
        if (tempInput.trim() !== '') {
          setPitchTags([...pitchTags, tempInput]);
          setTempInput(''); // Clear the input field after submitting
        }
    };

    function handleReset(){
        checkCssClass();
        setPitchName(''); 
        setPitchDisc('');
        setUserRole('');
        setPitchTags([]); // Reset the input value to an empty string
        setRolesWanted([]);
    }

    function checkCssClass(){
        if(document.getElementById('pitchName').classList.contains('invalid')){
            document.getElementById('pitchName').classList.remove('invalid');
            document.getElementById('disc').classList.remove('invalid');
            document.getElementById('roleSelector').classList.remove('invalid');
            document.getElementById('roleWanted').classList.remove('invalid');
        }
    }

    function checkInputs(){
        if(isAdmin){
            if(pitchName === '' || pitchDisc === '' || rolesWanted.length === 0){
                checkCssClass();
                setPitchTriggerValue(true);
                return 400;
            }
            else {
                return 200;
            }
        } else{
            if(pitchName === '' || pitchDisc === '' || userRole === '' || rolesWanted.length === 0){
                document.getElementById('pitchName').classList.add('invalid');
                document.getElementById('disc').classList.add('invalid');
                document.getElementById('roleSelector').classList.add('invalid');
                document.getElementById('roleWanted').classList.add('invalid');
                setPitchTriggerValue(true);
                return 400;
            }
            else {
                return 200;
            }
        }
        
    }

    function generateUniqueCode() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000); // Adjust the range as needed
        const uniqueCode = timestamp.toString() + random.toString(); // Combine timestamp and random
        key = uniqueCode;
        console.log("KEY IS: ", key);
    }

    function createPitch(){
        
        let res = checkInputs();
        console.log(res);

        if(!isAdmin){
            let newMember = { email: userEmail, role: userRole, userName: userName };
            members.push(newMember);
        }
        
        if(res === 200){

           generateUniqueCode(); 

           const picthData = {
                room: sessionCode,
                key: key,
                author: userName,
                email: userEmail,
                name: pitchName,
                disc: pitchDisc,
                tags: pitchTags,
                rolesWanted: rolesWanted,
                groupMembers: members,
                status: status
            }
            
            socket.emit('createPitch', picthData);
            let temp = myPitch + 1
            setMyPitch(temp);
            setPitchTriggerValue(false);
            handleReset();

        } else if (res === 400){
            //setPitchTriggerValue(true);
            console.log("INPUT FEILDS FOR PITCH ARE EMPTY");
        }
    }

    useEffect(() =>{
        if(sessionCode === '')
        {
            let code = queryParams.get('sessionCode');
            setSessionCode(code);
        }

        if(props.trigger === true && pitchTriggerValue === false) {
            props.setTrigger(false);
        }

        if(props.trigger === false && pitchTriggerValue === true) {
            props.setTrigger(true);
        }

    }, [pitchTriggerValue])

    function deleteRolesTag(roleToRemove){
        setRolesWanted(prevRolesWanted => {
            // Use the filter() method to create a new array without the role to remove
            const updatedRoles = prevRolesWanted.filter(role => role !== roleToRemove);
            console.log("removign role ", updatedRoles);
            return updatedRoles;
        });
    }

    function deleteTags(tags){
        setPitchTags(prevPitchTags => {
            // Use the filter() method to create a new array without the role to remove
            const updatedTags = prevPitchTags.filter(tag => tag !== tags);
            console.log("removign role ", updatedTags);
            return updatedTags;
        });
    }

    return(props.trigger) ? (
        <section className="pitchCreationComp"> 
            <section class="card d-flex justify-content-center align-items-center col" className="picthCard">
                <section class='card-header row'>
                    <h1 style={{fontSize: '35px', textAlign: "center"}}>Create Pitch</h1>
                    <button
                        type="button"
                        className="btn-close btn-sml"
                        aria-label="Close"
                        onClick={() => {
                        props.setTrigger(false);
                        handleReset();
                        }}
                        style={{position: "absolute", top: "40px", right: "10px", margin: '5px'}}></button>
                </section>
                    <br />        
                <section id="mainContent" class="card-body align-items-center justify-content-center col">
                    <section class='row justify-content-center align-items-center' id="name&role">
                        <section class='col-6'>
                            <div style={{width: '100%'}}>
                                <label class="form-label">Name of pitch:</label>
                                <input type="text" class="form-control" id="pitchName" aria-describedby="emailHelp"
                                    value={pitchName}
                                    onChange={nameChange}
                                    placeholder="Pitch name.."
                                    style={{backgroundColor: '#E8F0FE'}}
                                    />

                            </div>
                        </section>
                        
                        <section class='col-6'> 
                            {isAdmin ? (null) : (
                                <>
                                    <label class="form-label">Select your Role:</label>
                                    <select id="roleSelector"
                                        style={{width: '100%', backgroundColor: '#E8F0FE'}}
                                        class="form-select" 
                                        aria-label="Default select example"
                                        value={userRole}
                                        onChange={(e) => {
                                            setUserRole(e.target.value)
                                        }}>
                                        <option value="">Select your role</option>
                                        {roles.map((role, index) => (
                                            <option key={index} value={role.name}> 
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </section>
                    </section>
                    
                    <br />
                    <section class="row justify-content-center align-items-center" style={{width: '100%'}}>
                        <section style={{width: '100%'}}>
                            <label class="form-label">Discription</label>
                            <textarea  type="text" class="form-control" id="disc" aria-describedby="emailHelp"
                                value={pitchDisc}
                                onChange={pitchDiscChange}
                                placeholder="Pitch discription..." 
                                style={{backgroundColor: '#E8F0FE'}}
                                />
                        </section>
                       
                    </section>
                    
                    <br />

                    <section className="row justify-content-center align-items-center" id="Tag&Roles">
                        <section className="col-6">
                            <label className="form-label">Select roles wanted:</label>
                            <select
                                id="roleWanted"
                                style={{ width: '100%', backgroundColor: '#E8F0FE' }}
                                className="form-select d-flex input-group justify-content-end"
                                aria-label="Default select example"
                                value={rolesWanted}
                                onChange={(e) => {
                                    setRolesWanted([...rolesWanted, e.target.value]);
                                }}
                            >
                                <option value="">Roles wanted</option>
                                {roles.map((role, index) => (
                                    <option value={role.name} key={index}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </section>

                        <section className="col-6">
                            <section style={{ width: '100%' }}>
                                <label className="form-label">Tags</label>
                                <div className="d-flex input-group justify-content-end" style={{ width: '100%' }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tags"
                                        value={tempInput}
                                        style={{ width: '60%', backgroundColor: '#E8F0FE' }}
                                        onChange={(e) => {
                                            setTempInput(e.target.value);
                                        }}
                                        placeholder="Projects tags"
                                    />
                                    <button className="btn" style={{ backgroundColor: '#8A9CFF', color: 'white' }} type="button" onClick={handleTagSubmit}>
                                        Add
                                    </button>
                                </div>
                            </section>
                        </section>
                    </section>

                    <br />   

                    <section class='row justify-content-center align-items-center"'>
                            <section class='col-6'>
                                <section>
                                    {rolesWanted.map((role, index) => (
                                        <TagComponent key={index} data={role} event={() => deleteRolesTag(role)} />
                                    ))}
                                </section>
                            </section>
                            <section class='col-6'>
                                <section >
                                    {pitchTags.map((tag, index) => (
                                        <TagComponent key={index} data={tag} event={() => deleteTags(tag)} />
                                    ))}
                                </section>
                            </section>
                        </section>

                    <br />
                    <section class="row justify-content-center align-items-center" style={{ paddingTop: '2%', textAlign: 'center' }}>
                        <button class="button-pitch" style={{ width: '40%' }} onClick={() => { createPitch(); props.setTrigger(pitchTriggerValue); }}>Create</button>
                    </section>
                    {[props.children]}
                </section>
                <br />
            </section>
        </section>
    ) : "";
}

export default PitchCreationTab