import { UserItem } from "./UserItem";

function UserTag(props) {
    const {users} = props

    return ( 
        users?.length >0 ?
            users.map(user=>(
                <UserItem key={user.id} user={user} />
            ))
        :
        null
     );
}

export {UserTag};