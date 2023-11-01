import { useContext } from 'react';
import { GrUserWorker } from 'react-icons/gr'
import { BsFillPersonXFill, BsFillPersonFill } from 'react-icons/bs'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import  ApprovedComp  from '../approvePitches/approvedCheck'
import './myGroup.css';

function MyGroupComp(data, room){
    const { removeGroupMember } = usePitchList();
    const { userEmail, roomCodeC } = useContext(AdminContext);
    //const [index, setIndex] = useContext(int);
    let index = data.data.groupMembers.findIndex((member) => member.email === userEmail);

    function removeSelf(){
        removeGroupMember(index, data.data.key, roomCodeC);
    }

    return(
        <>
            <section style={{width: '65%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'}}>
                <section class="card" style={{padding: '3%'}}>
                    <section>
                        <h5 class="card-header" className="col-md-9"
                            style={{fontFamily: 'Gabarito', fontSize: '30px'}}>{data.data.name}</h5>
                        <section className="col-md-3 d-flex justify-content-end">
                            {data.data.status === 'Approved' ? (<ApprovedComp />) : (null)}
                        </section>
                    </section>
                    <hr />
                    <section class="card-body">
                        <p class="card-text">{data.data.disc}</p>
                    </section>
                    <ul class="list-group list-group-flush">
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true" style={{fontWeight: 'bold', backgroundColor: '#E2E7FF'}}>Members:</li>
                            {data.data.groupMembers.map((member, index) => (
                                <li class="list-group-item" key={index}>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsFillPersonFill /> {member.userName}
                                    </span>
                                    <span>
                                        <GrUserWorker /> {member.role}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </ul>
                    <br />
                    {data.data.status === 'Approved'? (null) : (
                        <button type="button" className='button-myGroup' onClick={removeSelf}>
                            <BsFillPersonXFill size={22}/> <a style={{marginLeft: '8px'}}>Leave group</a>
                        </button>
                    )}
                    
                </section>
            </section>                
        </>

    )


}

export default MyGroupComp;
