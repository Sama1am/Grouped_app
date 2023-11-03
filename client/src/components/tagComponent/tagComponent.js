import './tag.css'
import { RxCross1 } from 'react-icons/rx'

function TagComponent({data, event}){
    return(
        <>
            <a className='pill-x '>
                <section>
                    {data}
                    <button style={{backgroundColor: 'transparent', border: 'none', color: 'black'}} onClick={event}>
                        <RxCross1 size={15}/>
                    </button>

                </section>
                
            </a>
        </>
    )
}

export default TagComponent;