import { NormalButton } from "../Buttons";
import { TweetList } from "../Tweet"
import { WallPaper } from "../Picture";
import { waitData } from "../../utils/extraUtils";
import { apiUser } from "../../services";
import { showNormalPopup } from "../Popup";
import { useDispatch } from "react-redux";
import { UserTag } from "../UserBar";
import { useSelector } from "react-redux";
import { UpdateProFileForm } from "../Forms";
import { useSafeState } from "ahooks";
import { useEffect } from "react";
import { FollowButton } from "../Buttons";

function ProfileUser(props) {
    const { tweets, userProfile } = props
    const [dataUser, setDataUser] = useSafeState(userProfile)
    const userRequest = useSelector((state) => state.userInfo.base_info)
    const dispatch = useDispatch()

    useEffect(() => { setDataUser(userProfile) }, [userProfile, setDataUser])


    const handleOpenFollowTab = (e, user, tab) => {
        const accessToken = localStorage.getItem('access_token')
        const getFollowData = (data) => {
            if (data?.length > 0) {
                showNormalPopup(<UserTag users={data} />)
            }
        }
        const params = {
            user_id: user.id
        }
        waitData(apiUser, null, "get", `${tab}/`, params, getFollowData, dispatch, accessToken)

        if (tab === "following") {

        } else if (tab === 'followers') {

        }
    }

    const handleOnClick = (e) => {
        e.preventDefault()
        showNormalPopup(<UpdateProFileForm info={dataUser} setDataUser={setDataUser} />)
    }

    return (
        <div>
            <div>
                <WallPaper className="w-full h-52" src="https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/4:3/w_2664,h_1998,c_limit/gettyimages-1146431497.jpg" />
                <div className="px-4 flex justify-between items-end mt-negative">
                    <WallPaper className="w-32 h-32 rounded" src='https://taylorramage.files.wordpress.com/2014/04/anna_frozen.jpg?w=640' />
                    <div className="flex justify-end">
                        {userRequest.username === dataUser?.username ?
                            <div className="mr-2">
                                <NormalButton onClick={(e) => handleOnClick(e, dataUser, "edit")} className="bg-black-full border border-white-100" name="Edit Profile" />
                            </div>
                            :
                            null
                        }
                        {userRequest.username !== dataUser?.username ?
                            <div>
                                <FollowButton dataUser={dataUser} setDataUser={setDataUser} />
                            </div>
                            :
                            null
                        }


                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="my-2">
                    <h2 className="text-lg font-bold">{dataUser?.name ?? ''}</h2>
                    <span className="text-white-100 text-sm">@{dataUser?.username ?? ''}</span>
                </div>
                <div className="my-2">
                    <p>{dataUser?.status ?? ''}</p>
                </div>
                <div className="flex my-2">
                    <p className="mr-2">Location</p>
                    <p>Time join</p>
                </div>
                <div className="flex my-2">
                    <span onClick={(e) => handleOpenFollowTab(e, dataUser, 'following')} className="mr-2 text-white-100 text-sm">
                        <span className="text-white-full font-bold">{dataUser?.following + " " ?? ''}</span>
                        Following</span>
                    <span onClick={(e) => handleOpenFollowTab(e, dataUser, 'followers')} className="mr-2 text-white-100 text-sm">
                        <span className="text-white-full font-bold">{dataUser?.followers + " " ?? ''}</span>
                        Followers </span>
                </div>
            </div>
            <div>
                <TweetList tweets={tweets} />
            </div>
        </div>
    );
}

export { ProfileUser };