import { CloseOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";
import { MouseEventHandler, useState } from "react";
import "./SearchInput.css";

interface ISearchInput {
    placeholder: string;
    onChange: (selectedValue: string) => void;
}

interface IFilterTag {
    onClick: MouseEventHandler
    value: string;
}

export const SearchInput = ({ placeholder, onChange } : ISearchInput) => {

    const [searchValue, setSearchValue] = useState<string>('');

    const clearSearchInput = () => {
        let inputElement : HTMLInputElement = document.querySelector('.search-input--container>input')!
        inputElement.value='';
        setSearchValue('')
    }

    const submitSearch = () => {
        onChange(searchValue);
        clearSearchInput()
    };
    
    return (
        <section className="search-input--container">
            {
                searchValue ?
                <CloseOutlined 
                    onClick={clearSearchInput}
                    className="flex items-center text-[0.7rem]"
                />
                :
                <SearchOutlined/>
            }
            <input 
                onChange={(e) => {setSearchValue(e.target.value)}}
                maxLength={25}
                autoComplete="off"
                className=""
                placeholder={placeholder}
                type="text" 
                name="search-input" 
                onKeyDown={(e) => { if (e.key === 'Enter') { submitSearch() } }}
            />
            <button onClick={submitSearch} className="search-input--button flex items-center">
                <SendOutlined/>
             </button>
        </section>
    );
};

export const FilterTag = ({ value, onClick } : IFilterTag) => {
    return (
        <section className="gap-5 flex flex-row border mr-2 outline-none rounded-md w-fit border-grey1 hover:shadow-md" title={`Active filter: '${value}'`}>
            <span className="ml-2">
                {value}
            </span>
            <button onClick={onClick} className="filter--tag-button flex items-center mr-2">
                <CloseOutlined/>
             </button>
        </section>
    );
};