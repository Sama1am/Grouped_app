import './tag.css'
import { BiRadioCircle } from 'react-icons/bi'

function Tag2Component({data}){
    return(
        <>
            <section className='pill'>
                <a>
                    <BiRadioCircle /> {data}
                </a>
            </section>
        </>
    )
}

export default Tag2Component;