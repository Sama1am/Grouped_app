import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/adminContext';
import './profilePopUp.css'

const ProfilePopUp = (props) => {
    //const { usePitchList } = usePitchList();
    const { roles, setRoles, setUserName, setStudentNuber } = useContext(AdminContext);
    const serverUrl = process.env.REACT_APP_APILINK;
    const baseUrl = window.location.origin;
 
    const [name, setName] = useState('');
    const [studentNumber, setNumber] = useState();
    const [selectedRole, setSelectedRole] = useState('');
    //const [roles, setRoles] = useState([]); 
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);
    const [triggerValue, setTriggerValue] = useState(true);
    
    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const handleStudentNumberChange = (event) => {
        setNumber(event.target.value);
        
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    }

    async function getRoles(){
        const url = `${serverUrl}/profile/getRoles`;
      
        try {
          const response = await fetch(url, {
            method: 'GET', // Specify the GET method
            headers: {
              'Content-Type': 'application/json',
              // You can add any other headers if needed
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          setRoles(data);
        } catch (error) {
          console.log(error);
          // Handle errors or show an error message to the user
        }
    }

    async function updateProfile(){
        console.log("STUDENT NUMBER IS: ", studentNumber)
        const token = sessionStorage.getItem('accessToken');
        const url = `${serverUrl}/profile/updateProfile`;
        const postData = {
            name: name,
            role: selectedRoleIndex, 
            studentNumber: studentNumber
        };
        
        console.log(postData);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Set the JWT as a Bearer token
                'Content-Type': 'application/json', // Set the content type if needed
            },
            body: JSON.stringify(postData),
        };
    
        const data =  await fetch(url, requestOptions);
        
    }
    
    useEffect(() => {
        if(roles.length === 0)
        {
            getRoles();
        }

        if (props.trigger === true && triggerValue === false) {
            props.setTrigger(false);
        }

    }, [triggerValue, props.trigger, roles]);


    function checkCSSClass(){
        if(document.getElementById('NameInput').classList.contains('invalid')){
            document.getElementById('NameInput').classList.remove('invalid')
        }

        if(document.getElementById('RoleSelector').classList.contains('invalid')){
            document.getElementById('RoleSelector').classList.remove('invalid')
        }
    }

    async function createProfile(){
        if(name && selectedRole && studentNumber)
        {
            checkCSSClass();
            setTriggerValue(false);
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('profileCreated', true);
            setUserName(name);
            setStudentNuber(studentNumber);
            updateProfile();
        }
        else if (name === '' || selectedRole === '' || studentNumber === ''){
            console.log("Input feilds are not full")
            if(name === '' ){
                document.getElementById('NameInput').classList.add('invalid');
            }else if(selectedRole === ''){
                document.getElementById('RoleSelector').classList.add('invalid');
            }else if(studentNumber === ''){
                document.getElementById('studentInput').classList.add('invalid');
            }
            setTriggerValue(true);
        }
    }

    return (props.trigger) ? (
        <>
            <section>
                <section className='bg-backgroun' id='background'>
                    {/* <section className='bg-shape opcaity bg-blur bg-blue'></section>
                    <section className='bg-shape opcaity bg-blur bg-green' style={{textAlign: 'center'}}></section>
                    <section className='bg-shape-sml opcaity bg-blur bg-pink top-right-corner'></section>
                    <section className='bg-shape-sml opcaity bg-blur bg-blue bottom-right-corner'></section> */}

                <section>
                    <section className='blob bg-purple idk  bg-blur'></section>
                    <section className='blob-m bg-green idk-1  bg-blur'></section>
                    <section className='blob-s bg-pink idk-2 blur'></section>
                </section>

                <section>
                    <section className='two-blob bg-purple ps bg-blur-2'></section>
                    <section className='two-blob-2 bg-green ps-1  bg-blur-2'></section>
                    <section className='two-blob-3 bg-pink ps-2 blur-2'></section>
                </section>

                <section>
                    <section className='three-blob two-ps bg-purple sec-blur'></section>
                    <section className='three-blob-2 two-ps-2 bg-green sec-blur'></section>
                    <section className='three-blob-3 two-ps-3 bg-pink sec-blur-2'></section>
                </section>
                </section>

                <section style={{width: '100vh'}}>
                    <section  class="card position-absolute top-50 start-50 translate-middle align-middle" style={{ zIndex: '1001', width: '25%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)', borderRadius: '25px'}}>
                        <section class="card-body mb-2">
                            <br />
                            <section className='d-flex flex-column align-items-center col'>
                                <img src="/logo_grouped.png" alt="My Logo" style={{ width: '38px', height: '100%' }} />
                                <h1 className="text-center card-title mt-3" style={{ fontFamily: 'Gabarito' }}>Profile</h1>
                            </section>

                            <section class='row'>
                                <section class="col mb-3">
                                    <input type="text" class="form-control" id="NameInput"  
                                        placeholder="Name"
                                        value={name}
                                        onChange={handleInputChange}
                                        required
                                        style={{backgroundColor: '#E8F0FE'}}
                                    />
                                </section>

                                <section class="col mb-3">
                                    <input type="text" class="form-control" id="studentInput"  
                                        placeholder="Student number"
                                        value={studentNumber}
                                        onChange={handleStudentNumberChange}
                                        required
                                        style={{backgroundColor: '#E8F0FE'}}
                                    />
                                </section>

                            </section>
                                <br />

                                <section>
                                    <select class="form-select" id="RoleSelector" required
                                        value={selectedRole}
                                        style={{backgroundColor: '#E8F0FE'}}
                                        onChange={(e) => {
                                            const selectedIndex = e.target.selectedIndex;
                                            setSelectedRoleIndex(selectedIndex);
                                            setSelectedRole(e.target.value)
                                    }}>

                                        <option value="">Select a role</option>
                                        {roles.map((role, index) => (
                                            <option key={index} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </section>

                                <br />
                                <section className="d-flex justify-content-center align-items-center">
                                    <button className="button-profile" type="submit" onClick={() => { createProfile(); props.setTrigger(triggerValue); }}>Create</button>
                                </section>
                            {props.children}
                        </section>
                        <br />
                    </section >
                </section>
            </section>
        </>
    ) : null;
}

export default ProfilePopUp;
