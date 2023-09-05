function TextInput(props) {
    const {type,placeholder,className,name,required,refName,value,onChange=()=>{}} = props;
    return ( 
        <input value={value} onChange={onChange} ref={refName} required ={required}  name={name} type={type} placeholder={placeholder} className={`bg-transparent border border-white-100 rounded p-1 w-full ${className}`} />
     );
}

export {TextInput};