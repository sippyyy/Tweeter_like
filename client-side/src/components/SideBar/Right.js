import { SearchForm } from "../Forms";
import { useSafeState } from "ahooks";
import { SearchUser } from "./SearchUser";
function RightSideBar() {
    const [searchResult, setSearchResult] = useSafeState([])
    return (
        <div className="px-4 py-2">
            <SearchForm setResult={setSearchResult} />
            {searchResult?.hits?.map(user => (
                <SearchUser
                    key={user.username}
                    username={user.username}
                    name={user?.name ?? ''}
                    link={`/user_profile/${user.objectID}`}
                />
            ))}
        </div>
    );
}

export { RightSideBar };