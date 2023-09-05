import { Tweet } from "./Tweet";

function TweetList(props) {
    const {tweets,didCreateTweet} = props
    
    return ( 
        <div>
            {tweets?.map(tweet=>(
                <Tweet 
                className="border-y border-white-100 py-3 px-4"
                didCreateTweet={didCreateTweet}
                key={tweet.id} 
                tweet={tweet} />
            ))}
        </div>
     );
}

export {TweetList};