import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import {useDebounceEffect,useSafeState} from "ahooks"
import { waitData } from "../../utils/extraUtils";
import { apiUser } from "../../services";
import { useDispatch } from 'react-redux';

function SearchForm(props) {
    const {classInput,setResult} = props
    const [searchValue,setSearchhValues] = useSafeState('')
    const dispatch = useDispatch()

    useDebounceEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        const params = {
            q: searchValue
        }
        waitData(apiUser,null,'get','search/',params,setResult,dispatch,accessToken)
    },[searchValue],
    {wait:500})

    const handleChangeSearch = (e) => {
        setSearchhValues(e.target.value)
    }

    return ( 
        <form>
            <div className="relative">
                <label className="absolute text-lg top-3 left-2 " ><BsSearch /></label>
                <input
                onChange={handleChangeSearch}
                value={searchValue}
                placeholder="Search user..."  
                className={`text-white-full bg-white-100 border border-white-100 rounded-full focus:bg-transparent focus:border-white-full w-full pl-8 h-10 focus:border-primary border-white-100 ${classInput} `}></input>
            </div>
        </form>
     );
}

export {SearchForm};