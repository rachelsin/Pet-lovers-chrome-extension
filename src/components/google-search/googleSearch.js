import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Row, Col, ButtonGroup } from 'react-bootstrap';
import { setSearchInput, setSearchType } from '../../store/slice/googleSearchSlice';
import './googleSearch.css';

function GoogleSearch() {
    const dispatch = useDispatch();
    const searchInput = useSelector((state) => state.search.searchInput);
    const searchType = useSelector((state) => state.search.searchType);

    const searchTypes = [
        { name: 'Web', url: 'https://www.google.com/search?q=' },
        { name: 'Images', url: 'https://www.google.com/search?tbm=isch&q=' },
        { name: 'Videos', url: 'https://www.google.com/search?tbm=vid&q=' },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchInput) return;
        const encodedSearchInput = encodeURIComponent(searchInput);
        window.location.href = searchType + encodedSearchInput;
    };

    const handleChange = (event) => {
        dispatch(setSearchInput(event.target.value));
    };

    const handleSearchTypeChange = (url) => {
        dispatch(setSearchType(url));
    };

    return (
        <div className="search-box mt-5 pt-5">
            <ButtonGroup className="mb-3 mt-5">
                {searchTypes.map((type) => (
                    <button
                        key={type.name}
                        type="button"
                        onClick={() => handleSearchTypeChange(type.url)}
                        className={`btn btn-light ${searchType === type.url ? 'bg-warning' : ''}`}
                    >
                        {type.name}
                    </button>
                ))}
            </ButtonGroup>

            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="input-search-left bg-body border border-end-0">
                                <i className="bi bi-search ms-2"></i>
                            </InputGroup.Text>
                            <input
                                type="text"
                                className="form-control input-search-right bi bi-search border border-start-0  form-control-lg"
                                placeholder="Search Google"
                                onChange={handleChange}
                                value={searchInput}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default GoogleSearch;
