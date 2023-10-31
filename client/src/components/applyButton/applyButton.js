import { useContext, useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { usePitchList } from '../../context/pitchContext'; 
import { AdminContext } from '../../context/adminContext';

function ApplyButton(uniqueKey){
    const [applied, setApplied] = useState(false);
    const { userEmail, roomCodeC, roles, userName } = useContext(AdminContext);
    const { addGroupMember  } = usePitchList();
    const [usersRole, setUsersRole] = useState();

    function applyToPitch(){
        addGroupMember(userEmail, usersRole, userName, uniqueKey.uniqueKey, roomCodeC);
        setApplied(true);
    }


    return(
        <>
            {applied ? null : 
            <section style={{alignSelf: 'center'}}>
                <section class="btn-group" role="group">
                    <select
                        style={{height: '50%', backgroundColor: '#E2E7FF'}}
                        class="form-select"
                        aria-label="Default select example"
                        value={usersRole}
                        onChange={(e) => {
                            setUsersRole(e.target.value); // Use e.target.value
                        }}
                        >
                        <option selected>Select roles wanted</option>
                        {roles.map((role, index) => (
                            <option value={role.name} key={index}>
                            {role.name}
                            </option>
                        ))}
                    </select>
                    <button style={{height: '50%', alignItems: 'center', backgroundColor: '#E2E7FF'}} type="button" class="btn btn-light" onClick={applyToPitch}>
                        <BsFillPersonPlusFill />  
                       
                    </button>
                </section>
                
            </section>
            }
        </>
        
    )

}

export default ApplyButton;