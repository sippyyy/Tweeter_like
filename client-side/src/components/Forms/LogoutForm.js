import { NormalButton } from "../Buttons";
import { useNavigate } from "react-router-dom";
import { closeNormalPopup } from "../Popup/NormalPopup";

function LogoutForm() {
    const direct = useNavigate()

    const handleClick= (e,option)=>{
        e.preventDefault()
        if(option === "cancel"){
            closeNormalPopup()
        }else{
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            direct('/login')

        }
    }

    return ( 
        <form onSubmit = {handleClick}>
            <h2 className="text-center">
                Are you sure you want to log out?
            </h2>
            <div className="flex justify-center mt-4">
                <NormalButton name='Cancel' type='button' className="border border-white-100 mr-4" onClick={(e)=>handleClick(e,"cancel")}  />
                <NormalButton name='Yes' type='submit' className="bg-primary"  />
            </div>
        </form>
     );
}

export {LogoutForm};