var express = require("express");
const passport = require('passport');
const path = require("path");
const { join } = require("path");
const pitchRoute = express.Router();

let pitches = []

function addPitch(data){
    if (Array.isArray(data) && data.length === 0) {
        console.log("data is empty");
    } else if (typeof data === 'object' && Object.keys(data).length === 0) {
        console.log("data is an empty object")
    } else {
        pitches.push(data);
    } 
}

// function updatePitches(data){
//     pitches = data;
// }

function deletePitch(key){
    const updatedPitches = pitches.filter((pitch) => pitch.key !== key);
    setPitches(updatedPitches);
    console.log("DELETED PITCH FROM SERVER: ", pitches);
}

function updatePitch(data) {
    // Find the index of the pitch with the matching key
    const indexToUpdate = pitches.findIndex(pitch => pitch.key === data.key);
  
    if (indexToUpdate !== -1) {
      // Create a copy of the pitch you want to update
      const updatedPitch = {
        ...pitches[indexToUpdate],
        // Update the properties you need to change, for example, add an email to groupMembers
        groupMembers: data.groupMembers
      };
  
      // Update the pitch at the found index with the updatedPitch
      pitches[indexToUpdate] = updatedPitch;
    }
  
    // Optionally, you can return the updated pitch or a success message
    return "Pitch updated successfully"; // You can customize the message
}

function approvePitch(data){
    const indexToUpdate = pitches.findIndex(pitch => pitch.key === data.key);
    
    if (indexToUpdate !== -1) {
        // Create a copy of the pitch you want to update
        if(data.status === "Denied"){
            const updatedPitch = {
                ...pitches[indexToUpdate],
                // Update the properties you need to change, for example, add an email to groupMembers
                groupMembers: data.groupMembers,
                status: data.status
            };

            pitches[indexToUpdate] = updatedPitch;

        } else if(data.status === "Approved"){
             const updatedPitch = {
                ...pitches[indexToUpdate],
                // Update the properties you need to change, for example, add an email to groupMembers
                status: data.status
            };

            pitches[indexToUpdate] = updatedPitch;
        }
       
    }

    return "Pitch approved successfully";
}

function getPitches(room){
    let pitchInRoom = pitches.filter(pitch => pitch.room === room);
    if (pitchInRoom.length === 0) {
        return null; // Or you can return an empty array if you prefer []
    }

    return(pitchInRoom);
}

function setPitches(data){
    pitches = data;
}

function removePitchesFromRoom(room){
    const filteredPitches = pitches.filter(pitch => pitch.room !== room);

    // Replace the original pitches array with the filteredPitches array
    pitches.length = 0; // Clear the original array
    Array.prototype.push.apply(pitches, filteredPitches); // Copy the filtered elements back to the original array

    console.log(pitches);
}


module.exports = {
    pitchRoute,
    pitches, 
    addPitch,
    getPitches,
    removePitchesFromRoom,
    setPitches,
    updatePitch,
    approvePitch,
    deletePitch,
};