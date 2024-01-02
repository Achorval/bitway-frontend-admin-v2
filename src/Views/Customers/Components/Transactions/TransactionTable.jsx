import moment from 'moment';
import CustomerContext from 'Core/Helper/Customer';
import { Card, Form, Table } from 'react-bootstrap';
import TransactionSearch from './TransactionSearch';
import { SvgLoader } from 'Core/Components/SvgIcons';
import search from 'assets/images/search-not-found.png';
import { P, H5, Btn, Badges, Image, Pagination } from 'Core/Components';
import React, { Fragment, useContext, useState, useEffect } from 'react';

const TransactionTable = () => {
    // Number of items to display per page
    let SN = 1;

    // ** States
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /** Customer Context */
    const { isLoading, setOpen, transactions, fetchTransactions, fetchTransactionDetails } = useContext(CustomerContext);

    /** Customers useEffect */
    useEffect(() => {
        fetchTransactions({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        });
    }, []);

    // ** Function to handle filter
    const handleSearchKeyword = value => {
        setSearchValue(value)
        fetchTransactions({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        });
    };

    // ** Function to handle Pagination and get data
    const handlePageChange = page => {
        fetchTransactions({
            page: page + 1,
            perPage: rowsPerPage,
            q: searchValue
        });
        setCurrentPage(page + 1)
    };

    /** Render status */
    const renderStatus = (value) => {
        let badgeClassName = '';
        switch (value) {
            case 'success':
                badgeClassName = 'success';
                break;
            case 'pending':
                badgeClassName = 'warning';
                break;
            case 'processing':
                badgeClassName = 'primary';
                break;
            case 'failed':
                badgeClassName = 'danger';
                break;
            case 'rejected':
                badgeClassName = 'info';
                break;
            default:
                break;
        }
        return <Badges attrBadge={{ className: 'badge rounded-pill', color: `${badgeClassName}` }}>{value}</Badges>
    }; 

    // ** Function to handle per page
    const handleRowsPerPage = rowValue => {
        fetchTransactions({
            page: currentPage,
            perPage: parseInt(rowValue),
            q: searchValue
        });
        setRowsPerPage(parseInt(rowValue))
    }; 

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between card-header-alt pb-0 p-4">
                <div>
                    <H5>Transaction List</H5>
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
                        {transactions && transactions.allItems &&  transactions.allItems.length > 0 ? (
                        <Fragment>
                            <div className="py-2">
                                <TransactionSearch 
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
                                            <th scope="col">{'Service'}</th>
                                            <th scope="col">{'Reference'}</th>
                                            <th scope="col">{'Narration'}</th>
                                            <th scope="col">{'Amount'}</th>
                                            <th scope="col">{'Status'}</th>
                                            <th scope="col">{'Date'}</th>
                                            <th scope="col">{'Action'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions && transactions.allItems.map((item) =>
                                            <tr key={item.id}>
                                                <th scope="row">{SN++}</th>
                                                <td>{item.user.firstname + ' ' + item.user.lastname}</td>
                                                <td>{item.service.name}</td>
                                                <td>{item.reference}</td>
                                                <td>{item.narration}</td>
                                                <td><Badges attrBadge={{ className: 'badge rounded-pill', color: `${item.type !== 'credit' ? 'danger' : 'success'}` }}>₦{item.amount}</Badges></td>
                                                <td>{renderStatus(item.status)}</td>
                                                <td>{moment.utc(item.createdAt).local().format('MM/DD/YYYY')}</td>
                                                <td><Btn attrBtn={{ onClick: ()=> {setOpen(true); fetchTransactionDetails(item.id)} }}>View</Btn></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <Pagination
                                onPageChange={page => handlePageChange(page)}
                                totalPages={Math.ceil(transactions.totalItems / rowsPerPage)}
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
                    <div className="text-center p-5">
                        <SvgLoader /> 
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
export default TransactionTable;