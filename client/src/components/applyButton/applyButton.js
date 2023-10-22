import { useContext, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs'
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
            <div class="d-grid gap-2 col-4 mx-auto">
                <div class="btn-group" role="group" aria-label="Basic example">
                <select
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
                    <button type="button" class="btn btn-light" onClick={applyToPitch}>
                        <BsPeopleFill  style={{ marginRight: '8px' }}/>
                        Join 
                    </button>
                </div>
                
            </div>
            }
        </>
        
    )

}

export default ApplyButton;