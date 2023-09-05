function Avatar(props) {
    const {className,src} = props
    return ( 
        <img alt='' className={`rounded-full ring-2 ${className} `} src={src} />
     );
}

export {Avatar};