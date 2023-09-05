import { Link } from "react-router-dom";
import { ActionButton } from "../components/Buttons";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { waitData } from "../utils/extraUtils";
import { apiTweet } from "../services";
import { useDispatch,useSelector } from "react-redux";
import { Avatar } from "../components/Picture";

function Post(props) {
    const { id } = useParams()
    const [tweet, setTweet] = useState({})
    const dispatch = useDispatch()
    const [action,setAction] = useState('Like')
    const userRequest = useSelector((state) => state.userInfo.base_info)

    useEffect(() => {
        if (id) {
            const accessToken = localStorage.getItem('access_token')
            waitData(apiTweet, null, 'get', `${id}/`, null, setTweet, dispatch, accessToken);
        }
    }, [dispatch, id])

    useEffect(()=>{
        if(tweet?.id){
            const liker_list = tweet.like_users
            const existed = liker_list.find(user => user.username === userRequest.username)
            if(existed){
                setAction('Unlike')
            }
        }
    },[tweet])

    const triggerAction = (data) => {
        setTweet(data)
    }

    return (
        <div className="m-4">
            <div className="flex items-center my-4">
                <Avatar
                    className="h-12 w-12 mr-3"
                    src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg" />
                <div className="hover:text-primary ">
                    <Link className="text-sm font-bold" to={`/profile/${tweet?.user?.id}`}>{tweet?.user?.email}</Link>
                    <p className="italic text-white-100">@{tweet?.user?.username}</p>
                </div>
            </div>
            <div>
                <p className="text-lg">{tweet.content}</p>
                <img src='' alt='' />
                <p className="italic text-white-100 text-[11px] my-4">{tweet?.created_at}</p>
            </div>
            <div className="flex items-end">
                <ActionButton triggerAction={triggerAction}
                    newTweetFromAction={tweet}
                    tweet={tweet}
                    className="mr-2 text-sm text-primary leading-4"
                    action="Likes" />
                <ActionButton triggerAction={triggerAction}
                    newTweetFromAction={tweet}
                    tweet={tweet}
                    className="mr-2 text-xl"
                    action={action} />
                <ActionButton triggerAction={triggerAction}
                    newTweetFromAction={tweet}
                    tweet={tweet}
                    className="mr-2 text-xl"
                    action="Retweet" />
            </div>
        </div>
    );
}

export { Post }