import moment from 'moment';
import { toast } from "react-toastify";
import CustomerSearch from './CustomerSearch';
import CustomerContext from 'Core/Helper/Customer';
import { SvgLoader } from 'Core/Components/SvgIcons';
import search from 'assets/images/search-not-found.png';
import { Card, Form, Table } from 'react-bootstrap';
import { P, H5, Btn, Image, Pagination } from 'Core/Components';
import React, { Fragment, useContext, useState, useEffect } from 'react';

const CustomerTable = () => {
    // Number of items to display per page
    let SN = 1;

    // ** States
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /** Customer Context */
    const { isLoading, customers, fetchCustomers, blockCustomerAccount } = useContext(CustomerContext);

    /** Customers useEffect */
    useEffect(() => {
        fetchCustomers({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        });
    }, []);

    // ** Function to handle filter
    const handleSearchKeyword = value => {
        setSearchValue(value)
        fetchCustomers({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        });
    };

    // ** Function to handle Pagination and get data
    const handlePageChange = page => {
        fetchCustomers({
            page: page + 1,
            perPage: rowsPerPage,
            q: searchValue
        });
        setCurrentPage(page + 1)
    };

    // ** Function to handle per page
    const handleRowsPerPage = rowValue => {
        fetchCustomers({
            page: currentPage,
            perPage: parseInt(rowValue),
            q: searchValue
        });
        setRowsPerPage(parseInt(rowValue))
    }; 

    /** Render status */
    const handleChageStatus = async (userId, blocked) => {
        if (window.confirm("Do you want to continue!") === true) {
            try {
                const response = await blockCustomerAccount(userId, blocked);
                if (response.status === 'Success') {
                    fetchCustomers({
                        page: currentPage,
                        perPage: rowsPerPage,
                        q: searchValue
                    });
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } catch (error) {
                if (error && error.response.status > 200) {
                    toast.error(error.response.payload.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        }
    }; 
    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between card-header-alt pb-0 p-4">
                <div>
                    <H5>Customer List</H5>
                    <span>List of ticket opend by customers</span>
                </div>
                <div className="d-flex align-items-center">
                    <span>Show</span>
                    <Form.Select className="mx-1" value={rowsPerPage} onChange={(e) => handleRowsPerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </Form.Select>
                </div>
            </Card.Header>
            <Card.Body>
                {!isLoading ? (
                <Fragment>
                    {customers && customers.allItems && customers.allItems.length > 0 ? (
                    <Fragment>
                        <div className="py-2">
                            <CustomerSearch 
                                searchValue={searchValue} 
                                handleSearchKeyword={handleSearchKeyword} 
                            />
                        </div>
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">{'#'}</th>
                                        <th scope="col">{'Name'}</th>
                                        <th scope="col">{'Email'}</th>
                                        <th scope="col">{'Phone'}</th>
                                        <th scope="col">{'Date Join'}</th>
                                        <th scope="col">{'Status'}</th>
                                        <th scope="col">{'Action'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers && customers.allItems.map((item) =>
                                        <tr key={item.id}>
                                            <th scope="row">{SN++}</th>
                                            <td>{item.firstname + ' ' + item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{moment.utc(item.completedAt).local().format('MM/DD/YYYY')}</td>
                                            <td>
                                                {item.blocked ? 
                                                    <span className='badge rounded-pill pill-badge-danger'>Inactive</span>
                                                :
                                                    <span className='badge rounded-pill pill-badge-success'>Active</span>
                                                }
                                            </td>
                                            <td>
                                                <Btn attrBtn={{ color: 'primary', size: 'sm', onClick: () => handleChageStatus(item.id, !item.blocked) }}> 
                                                    Change Status
                                                </Btn>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <Pagination
                            onPageChange={page => handlePageChange(page)}
                            totalPages={Math.ceil(customers.totalItems / rowsPerPage)}
                            currentPage={currentPage}
                        />
                    </Fragment>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <Image attrImage={{ src: `${search}`, alt: '' }} />
                            <P attrPara={{ className: 'mb-0 text-center' }}>Sorry, no result Found!</P>
                        </div>
                    )}
                </Fragment>
                ) : (
                    <SvgLoader /> 
                )}
            </Card.Body>
        </Card>
    );
};
export default CustomerTable;