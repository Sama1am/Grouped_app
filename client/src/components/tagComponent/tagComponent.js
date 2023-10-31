import './tag.css'
import { RxCross1 } from 'react-icons/rx'

function TagComponent({data, event}){
    return(
        <>
            <a class="badge rounded-pill" style={{padding: '1.5%', textDecoration: 'none', backgroundColor: '#0174BE', marginLeft: '3%'}}>
                <section>
                    {data}
                    <button style={{backgroundColor: 'transparent', border: 'none', color: 'white'}} onClick={event}>
                        <RxCross1 size={15}/>
                    </button>

                </section>
                
            </a>
        </>
    )
}

export default TagComponent;