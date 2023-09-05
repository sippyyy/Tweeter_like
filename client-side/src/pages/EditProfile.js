import { UpdateProFileForm } from "../components/Forms";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { waitData } from "../utils/extraUtils";
import { apiUser } from "../services";
import { useDispatch } from "react-redux";

function EditProfile(props) {
    const { userId } = useParams()
    const [profileInfo, setProfileInfo] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            const accessToken = localStorage.getItem('access_token')
            waitData(apiUser, null, 'get', `${userId}/`, null, setProfileInfo, null, dispatch, accessToken);
        }
    }, [userId, dispatch])


    return (
        <div>
            {profileInfo ? <UpdateProFileForm info={profileInfo} /> : null}
        </div>
    );
}

export { EditProfile };