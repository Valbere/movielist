import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface searchProps {
    searchValue: string;
    setSearchValue: React.ChangeEventHandler<HTMLInputElement>;
    searchFilter: string;
    filterSearch: Function;
}

const Search = (props: searchProps) => {
    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchValue(event);
    }

    const filter = (event: { value: string }) => {
        props.filterSearch(event.value);
    }

    const options = [
        { value: 'multi', label: 'Everything' },
        { value: 'movie', label: 'Movies' },
        { value: 'tv', label: 'Tv Shows' },
        { value: 'person', label: 'People' }
      ];

    return (
        <div className="search-wrapper">
            <input type="text" className="searchbar" placeholder="Search" value={props.searchValue} onChange={search} />
            <Dropdown options={options} onChange={filter} value={props.searchFilter} placeholder="Select" />
        </div>
    )
}

export default Search;