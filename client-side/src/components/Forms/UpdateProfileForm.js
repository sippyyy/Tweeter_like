import { useState } from "react";
import { waitData } from "../../utils/extraUtils";
import { apiUser } from "../../services";
import { useDispatch } from "react-redux";
import { TextInput } from "../Input";
import { NormalButton } from "../Buttons";


function FieldInput(props) {
    const { label, value, onChange = () => { }, name } = props
    return (
        <div className="flex items-center p-2 grid grid-cols-5">
            <label className="mr-2 col-span-1">{label}</label>
            <div className="col-span-4">
                <TextInput onChange={onChange} value={value} name={name} />
            </div>
        </div>
    )
}

function UpdateProFileForm(props) {
    const { info, setDataUser } = props
    const [infoState, setInfoState] = useState(props.info)
    const dispatch = useDispatch()

    const handleOnChange = (e, key) => {
        setInfoState(preInfo => ({ ...preInfo, [key]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, name, phone, birthday, status } = infoState
        const dataInput = {
            email,
            name,
            phone,
            birthday,
            status
        }
        const accessToken = localStorage.getItem('access_token')
        const dataJson = JSON.stringify(dataInput)
        waitData(apiUser,
            dataJson,
            'put',
            `update/${info.id}/`,
            null,
            setDataUser,
            dispatch,
            accessToken)
    }


    return (
        <form onSubmit={handleSubmit} method="PUT">
            <div className="flex p-2 grid grid-cols-5">
                <label className="mr-2 col-span-1">Username</label>
                <div>
                    <p className="font-bold italic">{info?.username ?? ''}</p>
                </div>
            </div>
            <FieldInput
                label="Email"
                onChange={(e) => handleOnChange(e, 'email')}
                value={infoState?.email ?? ''}
                name='email'
            />
            <FieldInput
                label="Name"
                onChange={(e) => handleOnChange(e, 'name')}
                value={infoState?.name ?? ''}
                name='name'
            />
            <FieldInput
                label="Phone Number"
                onChange={(e) => handleOnChange(e, 'phone')}
                value={infoState?.phone ?? ''}
                name='phone'
            />
            <FieldInput
                label="Birthday"
                onChange={(e) => handleOnChange(e, 'birthday')}
                value={infoState?.birthday ?? ''}
                name='birthday'
            />
            <FieldInput
                label="Status"
                onChange={(e) => handleOnChange(e, 'status')}
                value={infoState?.status ?? ''}
                name='status'
            />
            <NormalButton className="rounded p-3 w-full bg-primary font-bold" name="Edit" />
            {/* <button className="rounded p-3 w-full bg-primary font-bold" type='submit'>Edit</button> */}
        </form>
    );
}

export { UpdateProFileForm };