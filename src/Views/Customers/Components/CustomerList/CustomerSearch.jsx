import React from 'react';
import { Form } from 'react-bootstrap';

const CustomerSearch = ({searchValue, handleSearchKeyword}) => {
    return (
        <div className="feature-products">
            <div className="product-search">
                <Form>
                    <Form.Group className="m-0 form-group">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            defaultValue={searchValue}
                            onChange={(e) => handleSearchKeyword(e.target.value)}
                        />
                        <i className="fa fa-search"></i>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default CustomerSearch;