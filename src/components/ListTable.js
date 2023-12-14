import React, { useState } from 'react';
import Pagination from '../tableConfig/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import '../css/table/table.css'

function ListTable({headers, items, defaultItemsPerPage = 20}) {
    const isEmpty = items.length === 0;

    // Pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
    const itemsPerPageOptions = [ 20, 40, 60, 80, 100]
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Search variables
    const [search, setSearch] = useState("");

    // Sort variables
    const [sortHeader, setSortHeader] = useState({});
    const [sortOrder, setSortOrder] = useState("asc");

    // Search functions
    function onSearchChange(e) {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    function filterItems(items) {
        return items.filter(item => {
            const values = Object.values(item);
            const valuesAsString = values.join("").toLowerCase();
            return valuesAsString.includes(search.toLowerCase());
        })
    }

    //Pagination functions
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    
    function changeItemsPerPage(e) {
        setItemsPerPage(parseInt(e.target.value))
    }

    // Sort functions
    function sortBy(header, order) {
        setSortHeader(header)
        setSortOrder(order)
    }

    function sortItems(items) {
        return items.sort((itemA, itemB) => {

            const valueA = sortHeader.transformer 
                ? sortHeader.transformer(itemA[sortHeader.key]) 
                : itemA[sortHeader.key];

            const valueB = sortHeader.transformer 
                ? sortHeader.transformer(itemB[sortHeader.key]) 
                : itemB[sortHeader.key];

            if(valueA === valueB) {
                return 0
            }

            if(sortOrder === "asc") {
                return valueA > valueB ? 1 : -1;
            }

            return valueA > valueB ? -1 : 1;
        })
    }

    const itemsForCurrentPage = [...sortItems(filterItems(items))].slice(startIndex, endIndex)

    return (
        <div className='table-wrapper'>
            <div className='tools-wrapper'>
                <div className='entry-wrapper'>
                    <p>entry per page:</p>
                    <select onChange={changeItemsPerPage} value={itemsPerPage}>
                        {itemsPerPageOptions.map(itemsPerPageOption => (
                            <option value={itemsPerPageOption} key={itemsPerPageOption}>
                                {itemsPerPageOption}
                            </option>
                        ))}
                    </select>
                </div>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='logo-search'/>
                <input className='input-search' placeholder='search' value={search} onChange={onSearchChange}></input>
            </div>
            <table className="table-container">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header.key}>
                                {header.title}
                                <FontAwesomeIcon icon={faChevronUp} onClick={() => sortBy(header, "asc")} className='chevron-up'/>
                                <FontAwesomeIcon icon={faChevronDown} onClick={() => sortBy(header, "desc")} className='chevron-down'/>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isEmpty ? (
                        <tr>
                            <td colSpan={headers.length} style={{ textAlign: 'center' }}>
                                No data {/* Ajoutez ici le logo si nécessaire */}
                            </td>
                        </tr>
                        ) : ( 
                        itemsForCurrentPage.map((item, index) => (
                            <tr key={index}>
                                {headers.map(column => (
                                    <td key={column.key}>{item[column.key]}</td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        
            <Pagination
                totalItems={filterItems(items).length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ListTable