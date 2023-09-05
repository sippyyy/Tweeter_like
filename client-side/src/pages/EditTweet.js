import { useParams } from "react-router-dom";
import { TweetForm } from "../components/Forms";

function EditTweet(props) {
    const {tweetId} = useParams()
    return ( 
        <TweetForm form="update"  tweetId={tweetId}/>
     );
}

export {EditTweet};