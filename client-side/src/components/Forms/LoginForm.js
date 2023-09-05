import { TextInput } from "../Input";
import { NormalButton } from "../Buttons";
import { useRef } from "react";
import { login } from "../../services";
import { Link, useNavigate } from "react-router-dom";
function LoginForm(props) {
    const { className } = props;
    const userRef = useRef(null)
    const passwordRef = useRef(null)
    const direct = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const dataInputs = {
            username: userRef.current.value,
            password: passwordRef.current.value
        }
        const dataJson = JSON.stringify(dataInputs)
        login(dataJson, 'post', '', '', direct)
    }



    return (
        <div>
            <form onSubmit={handleLogin} className={className}>
                <div className="flex items-center my-4">
                    <label className='mr-2'>Username: </label>
                    <TextInput refName={userRef} required={true} name='username' type='text' placeholder="Enter your username" />
                </div>
                <div className="flex items-center my-4 ">
                    <label className='mr-2'>Password: </label>
                    <TextInput refName={passwordRef} required={true} name='password' type='password' placeholder="Enter your password" />
                </div>
                <NormalButton type="submit" name="Login" className="bg-primary w-full" />
            </form>
            <p className="my-4 text-center">Don't have account ? <Link className="font-bold text-primary hover:text-white-full" to='/register'>Create Now!</Link></p>
        </div>
    );
}

export { LoginForm };