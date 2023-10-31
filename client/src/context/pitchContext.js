// Create a context to manage the pitchList
import React, { createContext, useContext, useState } from 'react';
import { socket } from './socketContext';

const PitchListContext = createContext();

export function PitchListProvider({ children }) {
  const [pitchList, setPitchList] = useState([]);
  const [myPitch, setMyPitch] = useState(0);
  const members = [];
  const [maxNumOfMembers, setMaxNumOfMembers] = useState(undefined);
  const [sessionName, setSessionName] = useState('');

 function resetPitchList(){
    setPitchList([]);
    setMyPitch(0);
 }

  const addPitch = (data) => {
    if (Array.isArray(data) && data.length === 0) {
      console.log("data is empty");
      return;
    }  else if (typeof data === 'object' && Object.keys(data).length === 0) {
      console.log("data is an empty object")
      return;
    }

    const res = checkPitchData(data, pitchList);
    if(res === 200) {
      setPitchList((prevPitchList) => [...prevPitchList, data]);
    } else if(res === 400){
      console.log("Pitch already exists"); 
    }
  };

  function checkPitchData(data, pitchList){

    let duplicates = pitchList.filter(pitch => pitch.key === data.key)
  
    if(duplicates.length === 0)
    {
      return 200; 
    } else{
      return 400;
    }
   
  }

  function approvePitch(data, key, room){
    console.log("pitch status is: ", data.data.status);
    try{
      if(data.data.status === "Denied"){
        console.log("pitch was denied updating pitch");
        setPitchList(prevPitchList => {
          const updatedPitches = prevPitchList.map(pitch => {
            if (pitch.key === key) {
              // If it's the pitch you want to update, create a new object with updated groupMembers
              const updatedPitch = {
                ...pitch,
                groupMembers: [pitch.groupMembers[0]],
                status: data.data.status
              };
              socket.emit('approvePitch', room, updatedPitch);
              return updatedPitch;
            }
            return pitch;
          });
    
          return updatedPitches;
        });


      }else if(data.data.status === "Approved"){
        console.log("pitch was approved updating pitch");
        setPitchList(prevPitchList => {
          const updatedPitches = prevPitchList.map(pitch => {
            if (pitch.key === key) {
              // If it's the pitch you want to update, create a new object with updated groupMembers
              const updatedPitch = {
                ...pitch,
                status: data.data.status
              };
              console.log("pitch: ", updatedPitch);
              socket.emit('approvePitch', room, updatedPitch);
              return updatedPitch;
            }
            return pitch;
          });
          console.log("updated status: ", updatedPitches);
          return updatedPitches;
        });
      }
    }catch(e){
      console.log("error: ", e)
    }
  }

  function addGroupMember(email, role, userName, key, room){
    if(email === undefined || email === ''){
      console.log("EMAIL IS UNDEFINED!");
      return;
    } 

    const newMember = { email, role, userName };

    setPitchList(prevPitchList => {
      const updatedPitches = prevPitchList.map(pitch => {
        if (pitch.key === key) {
          // If it's the pitch you want to update, create a new object with updated groupMembers
          const updatedPitch = {
            ...pitch,
            groupMembers: [...pitch.groupMembers, newMember]
          };
          socket.emit('updatePitches', room, updatedPitch);
          return updatedPitch;
        }
        return pitch;
      });

      return updatedPitches;
    });
  }

  function addMember(email, role) {
    const newMember = { email, role };
    members.push(newMember);
  }

  function updatePitch(data){
    try{
      setPitchList(prevPitchList => {
        const updatedPitches = prevPitchList.map(pitch => {
          if (pitch.key === data.key) {
            // If it's the pitch you want to update, create a new object with updated groupMembers
            const updatedPitch = {
              ...pitch,
              groupMembers: data.groupMembers
            };
            return updatedPitch;
          }
          return pitch;
        });
  
        return updatedPitches;
      });
    }catch(e){
      console.log("error: ", e);
    }
    
  }

  function updateApprovedPitch(data){
    try{
      if(data.status === "Approved"){

        setPitchList(prevPitchList => {
          const updatedPitches = prevPitchList.map(pitch => {
            if (pitch.key === data.key) {
              // If it's the pitch you want to update, create a new object with updated groupMembers
              const updatedPitch = {
                ...pitch,
                status: data.status
              };
              return updatedPitch;
            }
            return pitch;
          });
    
          return updatedPitches;
        });

      }else if(data.status === "Denied"){

        setPitchList(prevPitchList => {
          const updatedPitches = prevPitchList.map(pitch => {
            if (pitch.key === data.key) {
              // If it's the pitch you want to update, create a new object with updated groupMembers
              const updatedPitch = {
                ...pitch,
                groupMembers: data.groupMembers,
                status: data.status
              };
              return updatedPitch;
            }
            return pitch;
          });
    
          return updatedPitches;
        });

      }
    }catch(e){
      console.log("error: ", e);
    }
  }

  function removeGroupMember(indexToRemove, key, room){
    setPitchList(prevPitchList => {
      const updatedPitches = prevPitchList.map(pitch => {
        if (pitch.key === key) {
          // If it's the pitch you want to update, create a new object with updated groupMembers
          const updatedPitch = {
            ...pitch,
            groupMembers: [...pitch.groupMembers.slice(0, indexToRemove), ...pitch.groupMembers.slice(indexToRemove + 1)]
          };

          socket.emit('removeGroupMember', room, updatedPitch);
          return updatedPitch;
        }
        return pitch;
      });

      return updatedPitches;
    });
  }

  function deletePitch(key, room){
    setPitchList((prevPitchList) => {
      const updatedPitches = prevPitchList.filter((pitch) => pitch.key !== key);
      // Optionally, you can emit an event to notify the server or perform any other actions
      return updatedPitches;
    });

    console.log(`Pitch with key ${key} deleted.`);
    socket.emit('deletePitch', key, room);
    let temp = myPitch - 1;
    setMyPitch(temp);
  }

  function updateDeletedPitch(key){
    setPitchList(prevPitchList => {
      const updatedPitches = prevPitchList.filter((pitch) => pitch.key !== key);
      // Optionally, you can emit an event to notify the server or perform any other actions
      console.log(`Pitch with key ${key} deleted.`);
      return updatedPitches;
    });
  }

  return (
    <PitchListContext.Provider value={{ 
      pitchList, 
      maxNumOfMembers, 
      setMaxNumOfMembers,
      addPitch,  
      addGroupMember, 
      updatePitch, 
      addMember, 
      updateApprovedPitch,
      approvePitch,
      resetPitchList,
      removeGroupMember,
      deletePitch,
      updateDeletedPitch,
      setMyPitch,
      myPitch,
      sessionName,
      setSessionName
      }}>

      {children}
    </PitchListContext.Provider>
  );
}

export function usePitchList() {
  return useContext(PitchListContext);
}
