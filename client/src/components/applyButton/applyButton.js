import { useContext, useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';

function ApplyButton(uniqueKey){
    const [applied, setApplied] = useState(false);
    const { userEmail, roomCodeC, roles, userName, studentNumber } = useContext(AdminContext);
    const { addGroupMember  } = usePitchList();
    const [usersRole, setUsersRole] = useState();

    function applyToPitch(){
        setApplied(true);
        addGroupMember(userEmail, usersRole, userName, uniqueKey.uniqueKey, roomCodeC, studentNumber);
        setApplied(true);
    }


    return(
        <>
            {applied ? (null) :(
                <section style={{alignSelf: 'center'}}>
                    <section class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <select
                            style={{backgroundColor: '#E8F0FE', border: 'solid 1px', paddingLeft: '2%', borderTopLeftRadius: '0.27rem', borderBottomLeftRadius: '0.27rem'}}
                            class="dropdown-toggle "
                            aria-label="Default select example"
                            value={usersRole}
                            onChange={(e) => {
                                setUsersRole(e.target.value); // Use e.target.value
                            }}
                            >
                            <option selected class="dropdown-menu ">Select roles wanted</option>
                            {roles.map((role, index) => (
                                <option value={role.name} key={index}>
                                {role.name}
                                </option>
                            ))}
                        </select>
                        <button style={{alignItems: 'center', backgroundColor: '#E8F0FE', border: 'solid 1px'}} type="button" class="btn" onClick={applyToPitch}>
                            <BsFillPersonPlusFill />  
                        
                        </button>
                    </section>
                    
                </section>
            )}
            
        </>
        
    )

}

export default ApplyButton;