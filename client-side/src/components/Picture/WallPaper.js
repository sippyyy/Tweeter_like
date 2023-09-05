function WallPaper(props) {
    const {className,src} = props
    return ( 
        <img alt='' className={`obj-contain ${className}`} src={src} />
     );
}

export {WallPaper};