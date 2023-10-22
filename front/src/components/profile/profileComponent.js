import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../../context/adminContext';

const ProfilePopUp = (props) => {
    //const { usePitchList } = usePitchList();
    const { roles, setRoles, setUserName } = useContext(AdminContext);
    const serverUrl = process.env.REACT_APP_APILINK;
    const baseUrl = window.location.origin;
 
    const [name, setName] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    //const [roles, setRoles] = useState([]); 
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);
    const [triggerValue, setTriggerValue] = useState(true);
    
    const handleInputChange = (event) => {
        setName(event.target.value);
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
        const token = sessionStorage.getItem('accessToken');
        const url = `${serverUrl}/profile/updateProfile`;
        const postData = {
            name: name,
            role: selectedRoleIndex
        };
    
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

    async function createProfile(){
        if(name && selectedRole)
        {
            setTriggerValue(false);
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('profileCreated', true);
            setUserName(name);
            updateProfile();
        }
        else if (name === '' || selectedRole === ''){
            console.log("Input feilds are not full")
            setTriggerValue(true);
        }
    }

    return (props.trigger) ? (
        <>
            <section  class="card position-absolute top-50 start-50 translate-middle align-middle" style={{ zIndex: '1001', width: '30%'}}>
                <section class="card-body mb-2">
                    <br />
                    <h1 class="text-center card-title" style={{ fontFamily: 'Gabarito' }}>Profile</h1>

                    <section class="mb-3">
                        <label for="validationServer01" class="form-label">Name</label>
                        <input type="text" class="form-control" id="validationServer01" required 
                            placeholder="Name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </section>
                    
                        <br />
                        <br />


                        <section>
                            <label for="validationCustom04" class="form-label">Select a Role:</label>
                            <select class="form-select" id="validationCustom04" required
                                value={selectedRole}
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
                        <br />
                    <section class="text-center">
                        <button class="btn btn-primary" type="submit" onClick={() => {createProfile(); props.setTrigger(triggerValue);}}>Create</button>
                    </section>
                    {props.children}
                </section>
                <br />
            </section >
        </>
    ) : null;
}

export default ProfilePopUp;
