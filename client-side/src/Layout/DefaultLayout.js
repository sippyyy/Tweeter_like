import Header from "../components/Header";
import { LeftSideBar, RightSideBar } from "../components/SideBar";

function DefaultLayout(props) {
    const { children } = props
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-full overflow-y-auto">
            <div className="flex flex-col bg-black-full dark:bg-black-full container mx-auto">
                <div className="container mx-auto">
                    <div className="grid grid-cols-6 ">
                        <div className="col-span-1">
                            <LeftSideBar />
                        </div>
                        <div className="col-span-4 border-x border-white-100">
                            <Header />
                            {children}
                        </div>
                        <div className="col-span-1">
                            <RightSideBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export { DefaultLayout };