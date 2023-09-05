import { Link } from "react-router-dom";
import { Avatar } from "../Picture";

function SearchUser(props) {
    const { link, img, username, name } = props
    
    return (
        <Link to={link} className="flex items-center mt-4">
            <Avatar
                className="w-10 h-10 object-cover"
                src={img ? img : "https://fashionmagazine.com/wp-content/uploads/2020/08/Rare_Selena_Single_Shot-480x320-c-top.jpg"} />
            <div className="ml-4">
                <p className="font-bold">{username}</p>
                <p className="text-white-100">{name}</p>
            </div>
        </Link>
    );
}

export { SearchUser };