function SelectionsDropdown(props) {
    const { name, className, items, display, onClick = () => { }, handleChooseOption = () => { } } = props;
    return (
        <div onClick={onClick} className="relative">
            <p className="text-xl inline-flex items-center font-bold">{name}</p>
            <div className={`border border-white-100 rounded absolute right-0 ${display ? '' : 'd-none'} ${className}`} >
                <ul>
                    {items?.map((item, index) => (
                        <li
                            key={item}
                            onClick={handleChooseOption}
                            className={`px-4 py-2 bg-black-full hover:bg-white-100 ${index + 1 < items.length ? 'border-b border-white-100' : ''}`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export { SelectionsDropdown };