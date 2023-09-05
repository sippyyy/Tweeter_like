import { useState, createRef, useImperativeHandle, memo } from 'react';
const normalPopupRef = createRef();

const showNormalPopup = (element) => normalPopupRef.current?.open?.(element)
const closeNormalPopup = () => normalPopupRef.current?.close?.()


function NormalPopup() {

    const [close, setClose] = useState(true)

    const [element, setElement] = useState("")


    const handleClose = () => {
        setClose(true)
    }

    useImperativeHandle(normalPopupRef, () => ({
        close: () => {
            setClose(true)
        },
        open: (element) => {
            setClose(false)
            setElement(element)
        }
    }), [close]);

    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black-100 ${close? 'hidden' : 'flex'}`}>
            <div className="w-96 m-auto bg-black-full relative p-4">
                <p className="absolute right-6 text-xl cursor-pointer " onClick={handleClose}>X</p>
                <h3 className="text-center text-lg pb-2 border-b border-white-100" >Notifications!</h3>
                <div className="my-2">
                    {element}
                </div>
            </div>
        </div>
    );
}


export { showNormalPopup,closeNormalPopup }

export default memo(NormalPopup);