import React, { useEffect, useState, useContext } from "react";
import './pitchCreation.css'
import { socket } from '../../context/socketContext';
import { useLocation } from 'react-router-dom';
import { usePitchList } from '../../context/pitchContext';
import { AdminContext } from '../../context/adminContext';
import TagComponent from '../tagComponent/tagComponent';

function PitchCreationTab(props) {
    const { userEmail, setUserEmail, roles, isAdmin } = useContext(AdminContext);
    const { addMyPitch, setMyPitch } = usePitchList();
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
    const members = [];

    const [triggerValue, setTriggerValue] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const userName = localStorage.getItem('userName');

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
        setPitchName(''); 
        setPitchDisc('');
        setUserRole('');
        setPitchTags([]); // Reset the input value to an empty string
        setRolesWanted([]);
    }

    function checkInputs(){
        if(isAdmin){
            if(pitchName === '' || pitchDisc === '' || rolesWanted.length === 0){
                setPitchTriggerValue(true);
                return 400;
            }
            else {
                return 200;
            }
        } else{
            if(pitchName === '' || pitchDisc === '' || userRole === '' || rolesWanted.length === 0){
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
        
        const res = checkInputs();
        console.log(res);

        if(!isAdmin){
            const newMember = { email: userEmail, role: userRole, userName: userName };
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
            setMyPitch(1);
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
        <form class='needs-validation' 
            style={{backgroundColor: '#F1EFEF', position: 'fixed', width: '28%', height: '95%', zIndex: '1000'}} novalidate> 
            <section class="card" className='pitchCreationTab' style={{padding: '5%', alignSelf: 'center'}}>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => {props.setTrigger(false); handleReset()}}></button>
                <section class="card-body" className="pitchInner">
                    <h1 style={{fontSize: '35px', textAlign: "center"}}>Create Pitch</h1>
                    <br />
                    <div class="mb-2" style={{width: '60%'}}>
                        <label for="exampleInputEmail1 validationServer01" class="form-label">Name of pitch:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1 validationServer01" aria-describedby="emailHelp" required
                            value={pitchName}
                            onChange={nameChange}
                            placeholder="Pitch name.."/>
                    </div>
                    <br />

                    <div class="mb-2" style={{width: '60%'}}>
                        <label for="exampleInputEmail1 validationServer01" class="form-label">Discription</label>
                        <textarea  type="text" class="form-control" id="exampleInputEmail1 validationServer01" aria-describedby="emailHelp" required
                            value={pitchDisc}
                            onChange={pitchDiscChange}
                            placeholder="Pitch discription..."/>
                    </div>
                    <br />
                    {isAdmin ? (null) : (
                        <>
                            <label for="validationCustom04">Select your Role:</label>
                            <select id="validationCustom04" required
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
                    

                    <br />

                    <label for="validationCustom04">Select roles wanted:</label>
                    <select id="validationCustom04" required
                        style={{width: '60%'}}
                        class="form-select"
                        aria-label="Default select example"
                        value={rolesWanted}
                        onChange={(e) => {
                            setRolesWanted([...rolesWanted, e.target.value]); // Use e.target.value
                        }}
                        >
                        <option value="">Select roles wanted</option>
                        {roles.map((role, index) => (
                            <option value={role.name} key={index}>
                            {role.name}
                            </option>
                        ))}
                        
                    </select>
                    <section>
                        {rolesWanted.map((role, index) => (
                            <TagComponent key={index} data={role} event={() => deleteRolesTag(role)}/>
                        ))}
                    </section>
                    <br />
                    <label for="exampleInputEmail1 validationServer01" class="form-label">Tags</label>
                    <div class="input-group mb-3" style={{width: '60%'}}>
                        <input type="text" class="form-control" id="exampleInputEmail1 validationServer01" aria-describedby="emailHelp" required
                            value={tempInput}
                            onChange={(e) => {
                                setTempInput(e.target.value)
                            }}
                            placeholder="Projects tags"/>
                        <button class="btn btn-outline-dark" type="button" onClick={handleTagSubmit}>Submit tag</button>
                    </div>
                    <section>
                        {pitchTags.map((tag, index) => (
                            <TagComponent key={index} data={tag} event={() => deleteTags(tag)}/>
                        ))}
                    </section>
                    
                    <br />
                    <button class= 'btn btn-outline-success' 
                        style={{width: '65%'}}
                        onClick={() => {createPitch(); props.setTrigger(pitchTriggerValue);}}>Create</button>
                    {[props.children]}
                </section>
                <br />
            </section>
        </form>
    ) : "";
}

export default PitchCreationTab