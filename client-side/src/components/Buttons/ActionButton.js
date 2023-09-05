import { waitData } from "../../utils/extraUtils";
import { apiTweet } from "../../services";
import { useDispatch } from "react-redux";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiOutlineShareAlt } from "@react-icons/all-files/ai/AiOutlineShareAlt";


function ActionButton(props) {
    const { className, action, tweet, newTweetFromAction, triggerAction, didCreateTweet } = props
    const Icon = action === "Like" || action === "Unlike" ? <AiFillLike /> : action === "Retweet" ? <AiOutlineShareAlt /> : ''
    const dispatch = useDispatch()
    const handleSendAction = (e, action, id) => {
        const accessToken = localStorage.getItem('access_token')
        const dataResponse = (data) => {
            triggerAction(data)
            if (didCreateTweet) {
                didCreateTweet(data)
            }
        }
        const lowerCaseAction = action.toLowerCase();
        const dataInput = {
            id,
            action: lowerCaseAction,
        }
        const jsonData = JSON.stringify(dataInput)
        waitData(apiTweet, jsonData, 'post', 'action/', null, dataResponse, dispatch, accessToken)
    }

    return (
        <>
            {action === "Likes" ?
                <p className={`${className} flex items-end`}>{newTweetFromAction?.likes}</p>
                :
                <button
                    onClick={(e) => { handleSendAction(e, action, tweet.id) }}
                    className={`rounded-full ${className} ${action === 'Unlike' ? 'text-primary' : ''}`}>
                    {Icon}
                </button>
            }
        </>

    );
}

export { ActionButton };