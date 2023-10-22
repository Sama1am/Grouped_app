import { React, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiServer } from 'react-icons/fi'
import { BsWindowDock, BsPeople } from 'react-icons/bs'
import { socket } from "../../context/socketContext";
import { AdminContext } from '../../context/adminContext';


function SideBar({ admin, setActiveComponent, roomCode, maxNumOfMembers, redirectRoute}) {
  const { userEmail } = useContext(AdminContext);
  function endSession(){
    socket.emit('endSession', roomCode, redirectRoute, 0);
  }

  function generatePdf(){
    socket.emit('sendAdminEmail', userEmail, roomCode);
  }
  
  return (
    <>
    <section id='SideBar' class="d-flex flex-column flex-shrink-0 p-3 bg-light" 
      style={{width: "19%", height: "100vh", position: "fixed", backgroundColor: '#9BA4B5'}}>
      <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span class="fs-4" style={{ fontFamily: 'Gabarito', fontSize: '35px' }}>Grouped</span>
            </a>
            <hr></hr>
                <ul class="nav nav-underline flex-column mb-auto">
                <li class="nav-item">
                    <button class="nav-link link-dark" aria-current="page"
                      onClick={ () => setActiveComponent("pitches") }> 
                        <FiServer size={22} />  <span style={{ marginLeft: '5px'}}>Pitches</span>
                    </button>
                </li>
                <li class="nav-item">
                      <button class="nav-link link-dark"
                        onClick={ () => setActiveComponent("userPitches") }>
                          <BsWindowDock size={22} />  <span style={{ marginLeft: '5px'}}>My Pitches</span>
                      </button>
                </li>
                {admin ? (
                  <li class="nav-item">
                    <button class="nav-link link-dark"
                      onClick={ () => setActiveComponent("approvePitches") }>
                        <BsPeople size={22} />  <span style={{ marginLeft: '5px'}}>Approve Pitches</span>
                    </button>
                  </li>
                ) : null }
                </ul>

                <ul class="nav nav-pills flex-column mb-auto">
                  <hr></hr>
                  <a style={{fontSize: '20px'}}>Room code: {roomCode}</a>
                  <a>Max group members: {maxNumOfMembers}</a>
                </ul>

                  {admin ? (
                    <section class="align-items-center" style={{alignItems: 'center', width: '90%', paddingBottom: '5%'}}>
                      <button class="btn btn-outline-success col btn-sm" style={{width: '100%'}}
                        onClick={generatePdf}>Generate group list</button>
                      <br />
                      <br />
                      <button class="btn btn-outline-danger col btn-sm" style={{width: '100%'}}
                        onClick={endSession}>End session</button>
                    </section>
                  ) : null}
      </section>

  </>      

    

  ) 
}

export default SideBar;
