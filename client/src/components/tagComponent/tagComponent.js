import './tag.css'
import { RxCrossCircled } from 'react-icons/rx'

function TagComponent({data, event}){
    return(
        <>
            <a  class="badge rounded-pill text-bg-secondary" style={{padding: '2%'}}>
                {data}
                <button style={{padding: '5%', backgroundColor: 'transparent', border: 'none', color: 'white'}} onClick={event}>
                    <RxCrossCircled />
                </button>
            </a>
        </>
    )
}

export default TagComponent;