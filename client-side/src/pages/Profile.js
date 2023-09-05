import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { waitData } from "../utils/extraUtils";
import { apiTweet, apiUser } from "../services";
import { ProfileUser } from "../components/UserDetail";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
    const { userId } = useParams()
    const [tweets, setTweets] = useState([])
    const [profileInfo, setProfileInfo] = useState('')
    const dispatch = useDispatch()
    const token = useSelector((state) => state.userInfo.base_info)

    useEffect(() => {
        if (userId) {
            const params = {
                user_id: userId
            }
            const accessToken = localStorage.getItem('access_token')
            waitData(apiTweet, null, 'get', '', params, setTweets, dispatch, accessToken);
            waitData(apiUser, null, 'get', `${userId}/`, params, setProfileInfo, dispatch, accessToken);
        }
    }, [userId, dispatch, token])


    return (
        <div>
            {tweets && profileInfo ?
                <ProfileUser tweets={tweets} userProfile={profileInfo} />
                :
                null
            }
        </div>
    );
}

export { Profile };