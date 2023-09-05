import { waitData } from "../../utils/extraUtils";
import { apiUser } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { NormalButton } from "./NormalButton";


function FollowButton(props) {
    const { dataUser, setDataUser } = props
    const dispatch = useDispatch()
    const userRequest = useSelector((state) => state.userInfo.base_info)


    const handleOnClick = (e, data, option) => {
        e.preventDefault()
        if (data) {
            if (option === 'follow' || option === 'unfollow') {
                const accessToken = localStorage.getItem('access_token')
                const dataInput = {
                    follow_user: data.username,
                    follow_action: option
                }
                waitData(apiUser, dataInput, 'post', 'follow/', '', setDataUser, dispatch, accessToken)
            }
        }
    }
    return (
        userRequest.username !== dataUser.username ?
            <NormalButton
                onClick={(e) => handleOnClick(e, dataUser, dataUser.followed ? "unfollow" : "follow")}
                className={dataUser.followed ? "border-white-100 border" : "bg-primary border-none"}
                name={dataUser.followed ? "Following" : "+ Follow"} />
            :

            null
    );
}

export { FollowButton };