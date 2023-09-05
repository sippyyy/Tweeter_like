import { SimpleButton } from "../Buttons";
import { useState } from "react";

function HeaderContentButtons(props) {
    const {chooseView} = props
    const [view,setView] = useState('foryou')

    const handleChooseView = (e,view)=>{
        e.preventDefault()
        setView(view)
        chooseView(view)

    }

    return ( 
        <div className="grid grid-cols-2 grid-row-4 grid-flow-row h-14">
            <SimpleButton onClick={(e)=>handleChooseView(e,'foryou')} className={view === 'foryou' ? 'border-b-4 border-primary' : ''} name='For you' />
            <SimpleButton onClick={(e)=>handleChooseView(e,'following')} className={view === 'following' ? 'border-b-4 border-primary' : ''} name='Following' />
        </div>
     );
}

export {HeaderContentButtons};