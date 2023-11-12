import { CgCheckO } from 'react-icons/cg'

function ApprovedComp(){

    return(
        <>
            <button type="button" class="btn" style={{backgroundColor: '#AFD8D0', fontWeight: 'bold'}} disabled>
                <CgCheckO size={20}/> Approved
            </button>
        </>
    )
}

export default ApprovedComp