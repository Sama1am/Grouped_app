import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { socket } from '../../context/socketContext';
import { AdminContext } from '../../context/adminContext';
import { usePitchList } from '../../context/pitchContext'; 
import '../login/loginPage.css';

//components 
import ProfilePopUp from '../../components/profile/profileComponent';
import SideBar from '../../components/sideBar/sideBar';
import Pitches from '../../components/pitches/pitches';
import UsersPitches from '../../components/usersPitches/usersPitches';
import ApprovePitch from '../../components/approvePitches/approvePitches';
import MyGroup from '../../components/myGroup/myGroup';

function Dashboard() {
    const { addPitch, 
        pitchList, 
        updatePitch, 
        updateApprovedPitch,  
        maxNumOfMembers, 
        resetPitchList,  
        updateDeletedPitch,
        setMaxNumOfMembers,
        setSessionName,
        sessionName,
        setMyPitch,
        myPitch
    } = usePitchList();

    const { isAdmin, setIsAdmin, roomCodeC, setRoomCodeC, userEmail, setUserEmail, setRoles, roles} = useContext(AdminContext);
    const serverUrl = process.env.REACT_APP_APILINK;
    const baseUrl = window.location.origin;
    const [roomCode, setRoomCode] = useState('');
    const [inRoom, setInRoom] = useState(false);
    const [getExistingPitches, setGetExistingPitches] = useState(false);
    //const [sessionName, setSessionname] = useState('');

    //states
    const [profileState, setProfileState] = useState(true);
    const [activeComponent, setActiveComponent] = useState("pitches");

    const redirectRoute = `${baseUrl}`;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = sessionStorage.getItem('accessToken');

    async function getAdmin(token){
        const url = `${serverUrl}/profile/getAdmin`;
            
            try{
                const response = await fetch(url, {
                  method: 'GET', // Specify the GET method
                  headers: {
                    'Authorization': `Bearer ${token}`, // Set the JWT as a Bearer token
                    'Content-Type': 'application/json', // Set the content type if needed
                    },
                });
            
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
    
                const data = await response.json()
                
                if(data.isAdmin === true)
                {
                    await setIsAdmin(true);
                    sessionStorage.setItem('admin', true);
                }
                else if(data.isAdmin === false)
                {
                    await setIsAdmin(false);
                    sessionStorage.setItem('admin', false);
                }
                else if(response.status === 500){
                    // Handle unexpected response
                    console.log("Unexpected response from the server.");
                }
                
            } 
            catch (error) 
            {
                console.log(error);
                // Handle errors or show an error message to the user
            }
    }

    async function getUserEmail(){
        const url = `${serverUrl}/profile/getEmail`;
        const token = sessionStorage.getItem('accessToken');
        try{

            const response = await fetch(url, {
                method: 'GET', // Specify the GET method
                headers: {
                    'Authorization': `Bearer ${token}`, // Set the JWT as a Bearer token
                    'Content-Type': 'application/json', // Set the content type if needed
                },
            });
          
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
          
            const data = await response.json();
            console.log("USER EMAIL FROM SERVER IS: ", data);
            await setUserEmail(data);
        }
        catch (e)
        {
            console.log(e);
        }
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
          await setRoles(data);
        } catch (error) {
          console.log(error);
          // Handle errors or show an error message to the user
        }
    }

    async function getSessionInfo(code){
        const url = `${serverUrl}/join/getMaxGroupMembers?code=${code}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("MAX MEMBERS IS: ", data.max_group_members);
                setMaxNumOfMembers(data.max_group_members);
            } else {
                console.error("An error occurred: ", response.status);
            }
        } catch (e) {
            console.log("An error occurred: " + e);
        }
    }

    async function getSessionname(code){
        const url = `${serverUrl}/join/sessionName?code=${code}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("SESSION NAME IS: ", data.session_name);
                setSessionName(data.session_name);
            } else {
                console.error("An error occurred: ", response.status);
            }
        } catch (e) {
            console.log("An error occurred: " + e);
        }
    }

    useEffect(() => {
        if(isAdmin === undefined)
        {
            getAdmin(token);
        }

        if(roomCode === ''){
            const sessionCode = queryParams.get('sessionCode');
            setRoomCode(sessionCode);
            setRoomCodeC(sessionCode);
        }
       
        if(roomCode != '' && inRoom === false)
        {
            socket.emit('joinRoom', roomCode);
            setInRoom(true);
            console.log("JOINED ROOM, ", )
        }

        if(userEmail === '')
        {
            getUserEmail();
        }   

        if(roles.length === 0){
            getRoles();
        }

        if(maxNumOfMembers === undefined){
            getSessionInfo(roomCodeC);
        }

        if(sessionName === ''){
            getSessionname(roomCodeC);
        }

        const profileCreated = sessionStorage.getItem('profileCreated');
        if (!profileCreated) {
            setProfileState(true); // Trigger the ProfilePopUp
        } else {
            setProfileState(false); // Don't trigger the ProfilePopUp
        }

    }, [token, roles, pitchList]);

    useEffect(() =>{
            
        socket.on('existingPitches', receivePitchHandler);


        socket.on('redirectUrl', (redirectRoute) => {
            resetPitchList();
            //sessionStorage.clear();
            window.location.href = redirectRoute;
        });

        socket.on('receiveUpdatedPitches', updatePitchesHandler);
        socket.on('recieveApprovedPitch', approvePitchesHandler);
        socket.on('updateDeletedPitch', updateDeletedPitchHandler);

        return () => {
            socket.off('redirectUrl');
            socket.off('existingPitches', receivePitchHandler);
            socket.off('receiveUpdatedPitches', updatePitchesHandler);
            socket.off('recieveApprovedPitch', approvePitchesHandler);
            socket.off('updateDeletedPitch', updateDeletedPitchHandler);
        };

    }, [socket])


    function approvePitchesHandler(data){
        updateApprovedPitch(data);
    }

    function updatePitchesHandler(data){
        updatePitch(data);
    }

    function receivePitchHandler(data){
        if (!getExistingPitches) {
            const individualPitches = [].concat(...data);

            for (const pitch of individualPitches) {
                addPitch(pitch);
                console.log("INDIVIDUAL PITCHES FROM SERVER: " , pitch);
            }
            setGetExistingPitches(true);

            
            console.log(getExistingPitches);

        } else {
            console.log("ALREADY GOT EXISTING PITCHES");
        }
    }

    function updateDeletedPitchHandler(key){
        updateDeletedPitch(key);
        console.log("DELETING PITCH!", key);
    }

    function closeRoom() {
        resetPitchList();
        socket.emit('endSession', roomCode, redirectRoute, 0);
    }
    

    function adminAlert() {
        if (isAdmin) {
            // This flag indicates whether the page is being refreshed
            let isRefreshing = false;
    
            // Listen for the beforeunload event
            window.addEventListener("beforeunload", function (e) {
                // Check if the page is being refreshed
                if (!isRefreshing) {
                    // Display a confirmation message
                    var confirmationMessage = "Are you sure you want to end the session?";
                    (e || window.event).returnValue = confirmationMessage; // For legacy browsers
                    return confirmationMessage; // For modern browsers
                }
            });
    
            // Listen for the beforeunload event when the page is refreshed
            window.addEventListener("unload", function () {
                // Set the refreshing flag to true when the page is refreshed
                isRefreshing = true;
            });
    
            window.onunload = function () {
                if (!isRefreshing) {
                    closeRoom();
                }
            };
        }
    }
    
   
    return(
        <>
           <section style={{ width: '100%', height: '100%', backgroundColor: '#DBE1EE'}}>
                <section class="row" style={{ width: '100%', height: '100%' }}>
                    {isAdmin === false ? <ProfilePopUp trigger={profileState} setTrigger={setProfileState} /> : null}
                    <section class="col-2">
                        <SideBar admin={isAdmin} setActiveComponent={setActiveComponent} roomCode={roomCodeC} maxNumOfMembers={maxNumOfMembers} redirectRoute={redirectRoute} />
                    </section>
                    <section class="col-10" style={{height: '100vh', overflow: 'auto', borderRadius: '25px'}}>
                        <section style={{width: '100%', height: '100%', padding:'2%'}}>
                            {activeComponent === "pitches" && <Pitches name={sessionName} />}
                            {activeComponent === "userPitches" && <UsersPitches />}
                            {isAdmin ? (
                                activeComponent === "approvePitches" && <ApprovePitch />
                            ) : (
                                activeComponent === "myGroup" && <MyGroup />
                            )}
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Dashboard;




