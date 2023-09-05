import { RegisterForm } from "../components/Forms/RegisterForm";
function Register() {
    return ( 
    <div className="border border-white-100 rounded">
        <h1 className='w-full text-center text-2xl py-2 bg-white-100'>R E G I S T E R</h1>
        <RegisterForm className="p-4" />
    </div>
    );
}

export { Register };