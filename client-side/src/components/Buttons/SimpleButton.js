function SimpleButton(props) {
    const {name,className,onClick=()=>{}} = props
    return ( 
        <button onClick={onClick} className='flex justify-center items-center'>
            <span className={`font-bold text-base flex items-center h-full  ${className}`}>{name}</span>
        </button>
     );
}

export {SimpleButton};