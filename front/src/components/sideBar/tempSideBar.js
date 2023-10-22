import { FiServer } from 'react-icons/fi'
import { BsWindowDock, BsPeople } from 'react-icons/bs'

function TempSideBar() {

    return(
        // <>
        //     <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "16%", height: "100vh"}}>
        //         <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        //         <span class="fs-4" style={{ fontFamily: 'Gabarito' }}>Grouped</span>
        //         </a>
        //         <hr></hr>
        //         <ul class="nav nav-pills flex-column mb-auto">
        //         <li class="nav-item">
        //             <button class="nav-link" aria-current="page"> 
        //                 <FiServer /> Pitches
        //             </button>
        //         </li>
        //         <li class="nav-item">
        //             <button class="nav-link link-dark">
        //                 <BsWindowDock /> My Pitches
        //             </button>
        //         </li>
        //         <li class="nav-item">
        //             <button class="nav-link link-dark">
        //                 <BsPeople /> Approve Pitches
        //             </button>
        //         </li>
        //         </ul>
        //     </div>
        // </>

        <>
            <section className={`outer ${admin ? 'admin' : 'student'}`}>
                <section className='inner'>
                    {/* <NavLink to='/dashboard/Picthes' activeClassName="active-link">Pitches</NavLink> */}
                    <button onClick={ () => setActiveComponent("pitches") }>Pitches</button>
                    <br />
                    <br />
                    {admin ? (
                    // <NavLink to='/dashboard/approveGroups' activeClassName="active-link">Approve groups</NavLink>
                    <button onClick={ () => setActiveComponent("approvePitches") }>Approve groups</button>
                    ) : (
                    // <NavLink to='/dashboard/myPitch' activeClassName="active-link">My pitch</NavLink>
                    <button onClick={ () => setActiveComponent("userPitches") }>My pitch</button>
                    )}
                </section>


                </section>
        </>
    )
    
}

export default TempSideBar;
