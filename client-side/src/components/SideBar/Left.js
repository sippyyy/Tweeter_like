import { Link } from "react-router-dom";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { NormalButton } from "../Buttons";
import { showNormalPopup } from "../Popup/NormalPopup";
import { Items } from "./Items";
import { LogoutForm } from "../Forms";
import { useSelector } from "react-redux";


function LeftSideBar() {
    const userInfo = useSelector((state) => state.userInfo.base_info)
    const handleClickLogout = (e)=>{
        e.preventDefault();
        showNormalPopup(<LogoutForm />)
    }


    return (
        <div className="mx-4">
            <Link to="/">
                <h1 className="text-4xl font-bold">X</h1>
            </Link>
            <div className="mt-4">
                <Items link='/' icon={<FaHome />} name='Home' />
                <Items link='/explore' icon={<BsSearch />} name='Explore' />
                <Items link={`/user_profile/${userInfo?.user_id??''}`} icon={<AiOutlineUser />} name='Profile' />
                <NormalButton type='button' onClick={handleClickLogout} name='Log out' className="bg-primary w-full text-lg" />
            </div>
        </div>

    );
}

export { LeftSideBar };