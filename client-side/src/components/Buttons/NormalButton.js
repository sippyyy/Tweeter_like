function NormalButton(props) {
    const { name, type, className,onClick=()=>{} } = props
    return (
        <button type={type} onClick={onClick} className={`rounded-full font-bold px-4 py-2 text-white-full ${className}`}>{name}</button>
    );
}

export { NormalButton }
