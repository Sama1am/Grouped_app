import { React, useContext } from "react";
import { FiServer } from 'react-icons/fi'
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsWindowDock, BsPeople, BsCardChecklist } from 'react-icons/bs'
import { socket } from "../../context/socketContext";
import { AdminContext } from '../../context/adminContext';
import './sideBar.css'
import { RxCrossCircled } from 'react-icons/rx'


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
      <section id='SideBar' class="d-flex flex-column flex-shrink-0" 
        style={{height: "100vh", position: "fixed", backgroundColor: 'white', padding: '1.5%', borderTopRightRadius: '25px', borderBottomRightRadius: '25px'}}>
          <a class=" d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <img class="col" src="/logo_grouped.png" alt="My Logo" className='logo-sb'/>
              <span class="col" style={{ fontFamily: 'Gabarito', fontSize: '28px', marginLeft: '10px'}}>Grouped</span>
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
                            <BsWindowDock size={22} />  <span style={{ marginLeft: '5px'}}>My Pitch</span>
                        </button>
                  </li>
                  {admin ? (
                    <li class="nav-item">
                      <button class="nav-link link-dark"
                        onClick={ () => setActiveComponent("approvePitches") }>
                          <FaRegCheckCircle size={22} />  <span style={{ marginLeft: '5px'}}>Approve Pitches</span>
                      </button>
                    </li>
                  ) : 
                  <li class="nav-item">
                        <button class="nav-link link-dark"
                          onClick={ () => setActiveComponent("myGroup") }>
                            <BsPeople size={22} />  <span style={{ marginLeft: '5px'}}>My Group</span>
                        </button>
                  </li> }
                  </ul>

                  <ul class="nav nav-pills flex-column mb-auto">
                    <hr></hr>
                    <a style={{fontSize: '20px'}}>Room code: {roomCode}</a>
                    {maxNumOfMembers === undefined ? (
                      <a class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                      </a>
                    ) : (
                      <a>Max group members: {maxNumOfMembers}</a>
                    )}
                    
                  </ul>

                    {admin ? (
                      <section class="align-items-center" style={{alignItems: 'center', width: '90%', paddingBottom: '5%'}}>
                        <button class="col" className='button-46 button-normal' style={{width: '100%'}}
                          onClick={generatePdf}>< BsCardChecklist size={20} style={{marginRight: '5px'}}/>Generate group list</button>
                        <br />
                        <button class="col" className='button-46 button-red' style={{width: '100%'}}
                          onClick={endSession}> <RxCrossCircled size={20} style={{marginRight: '5px'}}/>End session</button>
                      </section>
                    ) : null}
        </section>

    </>      
  ) 
}

export default SideBar;
