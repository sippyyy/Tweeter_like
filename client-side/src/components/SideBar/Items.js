import { Link } from "react-router-dom";

function Items(props) {
    const {link,icon,name} = props
    return (
        <Link to={link} className="flex items-center my-6">
            <span className="text-2xl">{icon}</span>
            <p className="ml-4 text-xl font-medium">{name}</p>
        </Link>
    );
}

export { Items };