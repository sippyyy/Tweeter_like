import { Link } from "react-router-dom";

function Header(props) {
    return ( 
        <div className="px-3">
            <h2 className="h-14 flex items-center ">
                <Link to="/" className="font-bold text-lg">Home</Link>
            </h2>
        </div>
     );
}

export default Header;