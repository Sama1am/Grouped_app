import { useContext } from 'react';
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import { ImBin } from 'react-icons/im'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';

function MyPitchComp(data, room){
    const { deletePitch } = usePitchList();
    const { roomCodeC } = useContext(AdminContext);

    return(
        <>
            <section style={{width: '70%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'}}>
                <section class="card" style={{padding: '3%'}}>
                    <h5 style={{fontFamily: 'Gabarito', fontSize: '30px'}}>{data.data.name}</h5>
                    <hr />
                    <div class="card-body">
                        <p class="card-text">{data.data.disc}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true" style={{fontWeight: 'bold', backgroundColor: '#E2E7FF'}}>Members:</li>
                            {data.data.groupMembers.map((member, index) => (
                                <li class="list-group-item" key={index}>
                                    <span style={{ marginRight: '10px' }}>
                                        <BsFillPersonFill size={22}/> {member.userName}
                                    </span>
                                    <span>
                                        <GrUserWorker size={22}/> {member.role}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </ul>
                    <br />
                    <section>
                        <button type="button" class="btn btn-outline-secondary" style={{width: '100%', alignSelf: 'center'}} onClick={() => {deletePitch(data.data.key, roomCodeC)}}>
                            <ImBin />
                        </button>            
                    </section>
                    
                </section>
            </section>                
        </>

    )


}

export default MyPitchComp;
