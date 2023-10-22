import { useContext } from 'react'
import { FiUser } from 'react-icons/fi'
import { BsFillPersonFill, BsPersonXFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import { FiUserCheck } from 'react-icons/fi'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import { socket } from '../../context/socketContext'

function ApprovePitchComponent(data){
    const { approvePitch, removeGroupMember  } = usePitchList();
    const { roomCodeC, userEmail } = useContext(AdminContext);

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
            <section style={{width: '65%', padding: '2%'}}> 
                <section class="card">
                    <section>
                        <h5 class="card-title card-header" 
                            style={{fontFamily: 'Gabarito', fontWeight: 'bold', width:'100%'}}>{data.data.name}</h5>
                            {data.data.status}
                    </section>
                    <div class="card-body">
                        <p class="card-text">{data.data.disc} </p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" aria-current="true" style={{fontWeight: 'bold'}}>Members:</li>
                        {data.data.groupMembers.map((member, index) => (
                            <li className="list-group-item d-flex justify-content-between" key={index}>
                            <div>
                                <BsFillPersonFill style={{ marginRight: '5px' }} /> {member.userName}
                                <GrUserWorker style={{ marginLeft: '10px', marginRight: '5px' }} /> {member.role}
                            </div>
                            <div>
                                {member.email !== data.data.email && (
                                <button
                                    type="button"
                                    class="btn btn-danger d-flex align-items-center justify-content-center"
                                    onClick={() => { removeGroupMember(index, data.data.key, roomCodeC) }}
                                >
                                    <BsPersonXFill />
                                </button>
                                )}
                            </div>
                            </li>
                        ))}
                    </ul>

                    <section class="card-footer" style={{textAlign: 'center', padding: '1.5%', width: '100%'}}>
                        <button type="button" class="btn btn-outline-success" onClick={approve}
                            style={{padding: '1.5%', marginRight: '10px'}}>
                                <FiUserCheck /> Approve
                            </button>

                        <button type="button" class="btn btn-outline-danger" onClick={deny}
                            style={{padding: '1.5%', marginLeft: '10px'}}>
                                <FiUserCheck /> Deny
                        </button>
                    </section>
                </section>
            </section>                            
        </>

    )


}

export default ApprovePitchComponent;