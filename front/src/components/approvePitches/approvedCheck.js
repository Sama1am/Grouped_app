import { CgCheckO } from 'react-icons/cg'

function ApprovedComp(){

    return(
        <>
            <button type="button" class="btn btn-success btn-sm" disabled>
                <CgCheckO size={20}/> Approved
            </button>
        </>
    )
}

export default ApprovedComp