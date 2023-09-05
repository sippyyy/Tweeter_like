import { TweetForm } from "../components/Forms";
import { useEffect, useState } from "react";
import { apiTweet } from "../services";
import { waitData } from "../utils/extraUtils";
import { TweetList } from "../components/Tweet";
import { useDispatch, useSelector } from "react-redux"
import { HeaderContentButtons } from "../components/Header/HeaderContentButtons";


function Home() {
    const [tweets, setTweets] = useState([])
    const [newTweet, setNewTweet] = useState(null)
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInfo.base_info)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        waitData(apiTweet, null, "get", "", null, setTweets, dispatch, accessToken)
    }, [dispatch, userInfo])

    useEffect(() => {
        if (newTweet) {
            setTweets(preTweet => ([newTweet, ...preTweet]))
        }
    }, [newTweet])

    const handleChangeView = (view) => {
        const accessToken = localStorage.getItem('accessToken')
        if (view === 'foryou') {
            waitData(apiTweet, null, "get", "", null, setTweets, dispatch, accessToken)
        } else if (view === 'following') {
            const params = {
                following: true
            }
            waitData(apiTweet, null, "get", "", params, setTweets, dispatch, accessToken)
        }
    }
    const handleDidCreateTweet = (tweet) => {
        setNewTweet(tweet)
    }

    return (
        <div>
            <HeaderContentButtons chooseView={handleChangeView} />
            <div className="border-y border-white-100 px-3">
                <TweetForm didCreateTweet={handleDidCreateTweet} />

            </div>
            <TweetList didCreateTweet={handleDidCreateTweet} tweets={tweets} />
        </div>
    );
}

export { Home };