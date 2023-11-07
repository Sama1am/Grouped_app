import { useContext } from 'react';
import { BsFillPersonFill } from 'react-icons/bs'
import { GrUserWorker } from 'react-icons/gr'
import { ImBin } from 'react-icons/im'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';
import Tag2Component from '../tagComponent/tags2Component';
import './myPitch.css'
import { CgCheckO } from 'react-icons/cg'
import { RxCrossCircled } from 'react-icons/rx'
import { GoCircle } from 'react-icons/go'

function MyPitchComp(data, room){
    const { deletePitch } = usePitchList();
    const { roomCodeC } = useContext(AdminContext);

    return(
        <>
            <section style={{width: '70%', boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px'}}>
                <section class="card" style={{padding: '4%'}}>
                    <section class='row'>
                        <section class='col' style={{fontFamily: 'Gabarito', fontSize: '30px'}}>
                            {data.data.name}
                        </section>
                        <section class='col-4 d-flex align-items-center justify-content-end'>
                            {data.data.status === 'pending' ? (
                            <section class='text-align-center btn disabled' style={{backgroundColor: '#FFC28A', padding: '5%', fontWeight: 'bold'}} >
                                <GoCircle size={18}/> {data.data.status}
                            </section>):
                                <>
                                    {data.data.status === 'Approved' ? (
                                        <section class='text-align-center btn disabled' style={{backgroundColor: '#A0F5CE', padding: '5%', fontWeight: 'bold'}} >
                                            <CgCheckO size={18}/> {data.data.status}
                                        </section>) : (
                                            <> 
                                                {data.data.status === 'Denied' ? (
                                                <section class='text-align-center btn disabled' style={{backgroundColor: '#FFBBBC', padding: '5%', fontWeight: 'bold'}} >
                                                    <RxCrossCircled size={18}/> {data.data.status}
                                                </section>) : (null)}
                                            </>
                                    )}
                                </>
                            }
                        </section>

                    </section>
                    <hr />
                    <div class="card-body">
                        <p class="card-text">{data.data.disc}</p>
                    </div> 

                    <ul class="list-group list-group-flush">
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true" style={{fontWeight: 'bold', background: 'linear-gradient(76deg, rgba(97,131,229,0.5) 0%, rgba(182,151,245,0.5) 100%)'}}>Members:</li>
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
                    <section class='row d-flex justify-content-center align-items-center'>
                        <section class='col-4'>
                            <button type="button" className='button-myPitch' style={{alignSelf: 'center'}} onClick={() => {deletePitch(data.data.key, roomCodeC)}}>
                                <ImBin />
                            </button>
                        </section>        
                    </section>
                    
                </section>
            </section>                
        </>

    )


}

export default MyPitchComp;
