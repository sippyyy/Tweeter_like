import { Avatar } from "../Picture";
import { Link } from "react-router-dom";
import { FollowButton } from "../Buttons";
import { useState } from "react";

function UserItem(props) {
    const {user} = props
    const [dataUser,setDataUser] = useState(user)
    
    return ( 
        <Link to={`/user_profile/${user.id}`}>
            <div className="flex items-center p-2 border-b border-white-100">
                <Avatar className="w-8 h-8 mr-4" src='https://www.m1-beauty.de/files/uploads/landingpages/home/211012_Herobanner_mobile.jpg' />
                <div className="flex flex-1 items-center justify-between ">
                    <p className="font-bold">{user?.username??''}</p>
                    {/* <NormalButton className="bg-primary" name='+ Follow' /> */}
                    <FollowButton dataUser={dataUser} setDataUser={setDataUser} />
                </div>
            </div>
        </Link>
     );
}

export {UserItem};