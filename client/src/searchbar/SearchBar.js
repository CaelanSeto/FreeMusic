import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './SearchBar.css';

function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);

    //Filters the data in the array with the word that is input into the searchbar
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }
  return (
    <div>
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder={placeholder}
                className="me-2"
                aria-label="Search"
                onChange={handleFilter}
            />
        </Form>
        {filteredData.length !== 0 && (
            <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                    return (
                    <a key={value.id} className="dataItem" href={`/files/${value.id}`} 
                        onClick={() => {localStorage.setItem("linkToFiles", `/files/${value.id}`)}}>
                        <p>{value.title}</p>
                    </a>
                    );
                })}
            </div>
        )}
    </div>
  )
}

export default SearchBar