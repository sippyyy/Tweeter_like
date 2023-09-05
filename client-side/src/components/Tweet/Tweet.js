import { ActionButton } from "../Buttons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../Picture";
import { useSelector } from "react-redux";
import { showNormalPopup } from "../Popup";
import { SelectionsDropdown } from "../Dropdown";
import { TweetForm } from "../Forms/tweetForm";
import { DeleteForm } from "../Forms";



function Tweet(props) {
    const { className, hideActionButtons, didCreateTweet } = props
    const [newTweetFromAction, setNewTweetFromAction] = useState(props?.tweet ?? null)
    const userInfo = useSelector((state) => state.userInfo.base_info)
    const [tweetChoosen, setTweetChoosen] = useState('')
    const [tweetEdited, setTweetEdited] = useState(props?.tweet ?? null)
    const [action, setAction] = useState('Like')

    useEffect(() => {
        if (newTweetFromAction?.id) {
            const liker_list = newTweetFromAction.like_users
            if (liker_list) {
                const existed = liker_list.find(user => user.username === userInfo.username)
                if (existed) {
                    setAction('Unlike')
                } else {
                    setAction('Like')
                }
            }
        }
    }, [newTweetFromAction])


    const triggerAction = (data) => {
        setNewTweetFromAction(data)
    }

    const handleOpenEdit = (e, data) => {
        e.preventDefault()
        if (data.id === tweetChoosen.id) {
            setTweetChoosen('')
        } else {
            setTweetChoosen(data)
        }
    }

    const handleChooseOption = (e, tweet) => {
        e.preventDefault()
        const option = e.target.textContent
        if (option === 'Edit') {
            showNormalPopup(<TweetForm
                setTweetEdited={setTweetEdited}
                didCreateTweet={didCreateTweet}
                form='update'
                tweet={tweetChoosen} />)
        } else if (option === 'Delete') {
            showNormalPopup(<DeleteForm tweetId={tweet.id} setTweetEdited={setTweetEdited} />)
        }
    }

    return (
        <>
            {tweetEdited?.message ?
                null
                :
                <div className={className}>
                    <Link
                        to={`/tweet/${tweetEdited.id}`}
                        className="grid grid-cols-12 grid-row-4 grid-flow-row">
                        {!hideActionButtons ?
                            <div className="col-span-1">
                                <Avatar
                                    className="w-8 h-8"
                                    src='https://taylorramage.files.wordpress.com/2014/04/anna_frozen.jpg?w=640' />
                            </div>
                            :
                            null}
                        <div className="col-span-11">
                            {!hideActionButtons ?
                                <div className="flex items-center justify-between">
                                    <Link className="font-bold" to={`/user_profile/${tweetEdited?.user?.id}`}>
                                        <span className="mr-1">{tweetEdited?.user?.username}</span>
                                        <span className="text-white-100 font-light">{tweetEdited?.user?.email}</span>
                                        <span className="text-white-100 font-light ml-1">{tweetEdited?.created_at}</span>
                                    </Link>
                                    {userInfo?.username === tweetEdited?.user?.username ?
                                        <SelectionsDropdown
                                            name='...'
                                            onClick={(e) => handleOpenEdit(e, tweetEdited)}
                                            items={['Edit', 'Delete']}
                                            display={tweetChoosen && tweetEdited.id === tweetChoosen?.id}
                                            handleChooseOption={(e) => { handleChooseOption(e, tweetEdited) }}
                                        />
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }
                            <div>
                                <div className="my-2">
                                    <p>{tweetEdited.content}</p>

                                </div>
                                {tweetEdited.parent ?
                                    <>
                                        <h5 className="italic">Retweeted:</h5>
                                        <Tweet hideActionButtons={true}
                                            className="border rounded-lg border-white-100 p-2 mx-8"
                                            tweet={tweetEdited.parent} />
                                    </>
                                    :
                                    null
                                }
                            </div>

                        </div>
                    </Link>
                    <div className="grid grid-cols-12 grid-row-4 grid-flow-row">
                        <div className="col-span-1">
                        </div>
                        <div className="col-span-11">
                            {!hideActionButtons ?
                                <div className="mt-2">
                                    <div className="flex items-end">
                                        <ActionButton triggerAction={triggerAction}
                                            newTweetFromAction={newTweetFromAction}
                                            tweet={tweetEdited}
                                            className="mr-2 text-sm text-primary leading-4"
                                            action="Likes" />
                                        <ActionButton triggerAction={triggerAction}
                                            newTweetFromAction={newTweetFromAction}
                                            tweet={tweetEdited}
                                            className="mr-2 text-xl"
                                            action={action} />
                                        <ActionButton triggerAction={triggerAction}
                                            newTweetFromAction={newTweetFromAction}
                                            tweet={tweetEdited}
                                            className="mr-2 text-xl"
                                            didCreateTweet={didCreateTweet}
                                            action="Retweet" />
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>

            }
        </>

    );
}

export { Tweet };