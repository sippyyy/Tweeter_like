import { NormalButton } from "../Buttons";
import { closeNormalPopup } from "../Popup/NormalPopup";
import { waitData } from "../../utils/extraUtils";
import { apiTweet } from "../../services";
import { useDispatch } from "react-redux";

function DeleteForm(props) {
    const { tweetId,setTweetEdited } = props
    const dispatch = useDispatch()
    const handleChoose = (e, option) => {
        const accessToken = localStorage.getItem('access_token')
        e.preventDefault();
        if (option === 'submit') {
            waitData(apiTweet, null, 'delete', `delete/${tweetId}/`, null, setTweetEdited, dispatch,accessToken);
        } else if (option === 'cancel') {
            closeNormalPopup()
        }
    }

    return (
        <div>
            <p>Do you sure you want to delete this tweet?</p>
            <div className="flex justify-center">
                <NormalButton onClick={(e) => handleChoose(e, 'cancel')} name="Cancel" type='button' className="border border-white-100 mr-4" />
                <NormalButton onClick={(e) => handleChoose(e, 'submit')} name="Yes,delete it!" type='button' className="bg-primary" />
            </div>
        </div>
    );
}

export { DeleteForm };