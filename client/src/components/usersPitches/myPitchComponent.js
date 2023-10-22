import { FiUser } from 'react-icons/fi'
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import { BsPersonXFill } from 'react-icons/bs'
import { ImBin } from 'react-icons/im'
import { usePitchList } from '../../context/pitchContext'; 

function MyPitchComp(data, room){
    const { deletePitch } = usePitchList();
    
    return(
        <>
            <section style={{width: '65%', padding: '2%'}}>
                <section class="card" style={{}}>
                    <h5 class="card-header" style={{fontFamily: 'Gabarito', fontWeight: 'bold'}}>{data.data.name}</h5>
                    <div class="card-body">
                        <p class="card-text">{data.data.disc}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true" style={{fontWeight: 'bold'}}>Members:</li>
                            {data.data.groupMembers.map((member, index) => (
                                <li class="list-group-item" key={index}>
                                    <BsFillPersonFill /> {member.userName} <nv /><nv />
                                    <GrUserWorker /> {member.role}
                                </li>
                            ))}
                        </ul>
                    </ul>
                    <button type="button" class="btn btn-danger" onClick={() => {deletePitch(data.data.key)}}>
                        <ImBin />
                    </button>
                </section>
            </section>                
        </>

    )


}

export default MyPitchComp;
