import { useRef, useState } from 'react'
import { apiTweet } from '../../services'
import { waitData } from '../../utils/extraUtils'
import { NormalButton } from '../Buttons/NormalButton'
import { Avatar } from '../Picture'
import { useDispatch } from "react-redux";


function TweetForm(props) {
    const { didCreateTweet, form, tweet, setTweetEdited } = props
    const [contentEdit, setContentEdit] = useState(props?.tweet?.content ?? '')
    const tweetValueRef = useRef(null)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        let dataInput = ''
        if (tweet) {
            dataInput = { "content": contentEdit }
        } else {
            dataInput = { "content": tweetValueRef.current.value }
        }
        const jsonData = JSON.stringify(dataInput)
        const accessToken= localStorage.getItem('access_token')
        if (tweet?.id) {
            if (form === 'update') {
                waitData(apiTweet, jsonData, 'put', `update/${tweet?.id}/`, null, setTweetEdited, dispatch,accessToken)
            }
        } else {
            waitData(apiTweet, jsonData, 'post', "create/", null, didCreateTweet, dispatch,accessToken)
        }
    }

    const handleEditTweet = (e) => {
        setContentEdit(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="flex m-4">
            <div>
                <Avatar className="w-10 h-10 mr-3" src='https://taylorramage.files.wordpress.com/2014/04/anna_frozen.jpg?w=640' />
            </div>
            <div className="flex-1">
                <div>
                    {tweet ?
                        <textarea
                            value={contentEdit}
                            onChange={handleEditTweet}
                            className="w-full focus:outline-none bg-black-full "
                            ref={tweetValueRef}
                            placeholder="What is happening?!" />
                        :
                        <textarea
                            className="w-full focus:outline-none bg-black-full "
                            ref={tweetValueRef}
                            placeholder="What is happening?!" />
                    }
                </div>
                <div className='mt-2 w-full flex justify-end'>
                    <NormalButton className='bg-primary' type='submit' name='Post' />
                </div>
            </div>
        </form>
    );
}

export { TweetForm };