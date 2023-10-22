import './tag.css'
import { BiRadioCircle } from 'react-icons/bi'

function Tag2Component({data}){
    return(
        <>
            <section style={{padding:'0.5%'}}>
                <a  class="badge rounded-pill text-bg-secondary" style={{textDecoration: 'none', padding: '1%'}}>
                    <BiRadioCircle /> {data}
                </a>
            </section>
        </>
    )
}

export default Tag2Component;