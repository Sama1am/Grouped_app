import { useContext } from 'react'
import { BsFillPersonFill, BsPersonXFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import { FiUserCheck } from 'react-icons/fi'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import { socket } from '../../context/socketContext'
import './approvePitch.css';


function ApprovePitchComponent(data){
    const { approvePitch, removeGroupMember  } = usePitchList();
    const { roomCodeC } = useContext(AdminContext);

    function approve(){
        const emailArray = data.data.groupMembers.map((member) => member.email);
        const commaSeparatedEmails = emailArray.join(', ');
        const approve = 'Approved';
        data.data.status = approve;
        console.log(data);
        approvePitch(data, data.data.key, roomCodeC);
        socket.emit('sendEmail', commaSeparatedEmails, data);
        console.log("approved pitch: ", data.data.status);
    }

    function deny(){
        const deny = 'Denied';
        data.data.status = deny;
        console.log(data);
        approvePitch(data, data.data.key, roomCodeC);

        console.log("denyed pitch: ", data.data.status);
    }




    return(

        <>
            <section style={{width: '70%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'}}> 
                <section class="card" style={{padding: '3%'}}>
                    <section>
                        <h5 
                            style={{fontFamily: 'Gabarito', width:'100%', fontSize: '30px'}}>{data.data.name}</h5>
                            Status: {data.data.status}
                    </section>
                    <hr />
                    <div class="card-body">
                        <p class="card-text">{data.data.disc} </p>
                    </div>
                    <section className="list-group list-group-flush">
                        <section class="list-group">
                            <li className="list-group-item" style={{fontWeight: 'bold', backgroundColor: '#E2E7FF'}}>Members:</li>
                            {data.data.groupMembers.map((member, index) => (
                                <li className="list-group-item d-flex justify-content-between" key={index}>
                                <div>
                                    <BsFillPersonFill style={{ marginRight: '5px' }} /> {member.userName}
                                    <GrUserWorker style={{ marginLeft: '10px', marginRight: '5px' }} /> {member.role}
                                </div>
                                <div>
                                    {member.email !== data.data.email ? (
                                        <>
                                            {data.data.status === 'Approved' ? (null) : (
                                                <button
                                                    style={{backgroundColor: '#ACC18A'}}
                                                    type="button"
                                                    class="btn d-flex align-items-center justify-content-center"
                                                    onClick={() => { removeGroupMember(index, data.data.key, roomCodeC) }}
                                                >
                                                    <BsPersonXFill />
                                                </button>
                                            )}
                                        </>
                                    ) : (null)}
                                </div>
                                </li>
                            ))}
                        </section>
                        
                    </section>
                    <br />
                    {data.data.status === 'Approved' ? (null) : (
                        <section class='row d-flex justify-content-center align-items-center' style={{textAlign: 'center', padding: '1%', width: '100%'}}>
                            <section class='col-5 d-flex justify-content-center align-items-center'> 
                                <button type="button" onClick={approve}
                                    className='button-approve button-normal'
                                    style={{padding: '1%'}}>
                                        <FiUserCheck style={{marginRight: '5px'}}/> Approve
                                </button>
                            </section>

                            <section class='col-5 d-flex justify-content-center align-items-center'> 
                                <button type="button" onClick={deny}
                                    className='button-approve button-red'
                                    style={{padding: '1%'}}>
                                        <FiUserCheck style={{marginRight: '5px'}}/> Deny
                                </button>
                            </section>
                        </section>
                    )}
                   
                </section>
            </section>                            
        </>

    )


}

export default ApprovePitchComponent;
