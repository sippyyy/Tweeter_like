import { LoginForm } from "../components/Forms";

function Login() {
    return ( 
    <div className="border border-white-100 rounded">
        <h1 className='w-full text-center text-2xl py-2 bg-white-100'>L O G I N</h1>
        <LoginForm className="p-4" />
    </div>
    );
}

export { Login };