import './tag.css'
import { BiRadioCircle } from 'react-icons/bi'

function Tag2Component({data}){
    return(
        <>
            <section style={{padding:'1%'}}>
                <a  class="badge rounded-pill" 
                    style={{textDecoration: 'none', margin: '5%', 
                        backgroundColor: '#E2E7FF', color: 'black'}}>
                    <BiRadioCircle /> {data}
                </a>
            </section>
        </>
    )
}

export default Tag2Component;