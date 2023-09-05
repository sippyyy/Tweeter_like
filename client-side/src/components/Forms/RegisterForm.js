import { TextInput } from "../Input";
import { useRef,useState } from "react";
import { NormalButton } from "../Buttons";
import { Link } from "react-router-dom";
import { waitData } from "../../utils/extraUtils";
import { apiUser } from "../../services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function RegisterForm() {

    const userRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nameRef = useRef(null)
    const dispatch = useDispatch()
    const direct = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();

        const callbacksuccess = (data)=>{
            if(data?.message){
                direct('/login')
            }
        }

        const dataInput= {
            username: userRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value
        }
        const dataJson = JSON.stringify(dataInput)
        waitData(apiUser, dataJson,'non-author','register/',null,callbacksuccess,dispatch)
    }


    return (
        <div className="mx-4">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center my-4">
                    <label className='mr-2'>Username: </label>
                    <TextInput 
                        refName={userRef}
                        required={true}
                        type='text'
                        placeholder="Enter your username" />
                </div>
                <div className="flex items-center my-4">
                    <label className='mr-2'>Email: </label>
                    <TextInput refName={emailRef}
                        required={true}
                        type='text'
                        placeholder="Enter your email" />
                </div>
                <div className="flex items-center my-4">
                    <label className='mr-2'>Password: </label>
                    <TextInput refName={passwordRef}
                        required={true}
                        type='password'
                        placeholder="Enter your password" />
                </div>
                <div className="flex items-center my-4">
                    <label className='mr-2'>Fullname: </label>
                    <TextInput refName={nameRef}
                        required={true}
                        type='text'
                        placeholder="Enter your fullname" />
                </div>
                <NormalButton className="bg-primary w-full" name='Register'/>
            </form>
            <p className="my-4 text-center">Already have an account ? <Link className="font-bold text-primary hover:text-white-full" to='/login'>Sign In Now!!</Link></p>
        </div>
    );
}

export { RegisterForm };