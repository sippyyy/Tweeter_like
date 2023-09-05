
function SecondLayout(props) {
    const { className, children } = props
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-full">
            <div className={`fixed flex top-0 bottom-0 left-0 right-0 bg-black-full mx-auto container ${className}`}>
                <div className="m-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export { SecondLayout };