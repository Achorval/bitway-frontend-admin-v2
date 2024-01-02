import moment from 'moment';
import { H5 } from 'Core/Components';
import { P, Badges, Image } from 'Core/Components';
import CustomerContext from 'Core/Helper/Customer';
import { Card, Col, Table } from 'react-bootstrap';
import { SvgLoader } from 'Core/Components/SvgIcons';
import search from 'assets/images/search-not-found.png';
import React, { Fragment, useContext, useEffect } from 'react';

const RecentTransactions = () => {
    // Number of items to display per page
    let SN = 1;
    const rowsPerPage = 5;

    /** Customer Context */
    const { isLoading, transactions, fetchTransactions } = useContext(CustomerContext);

    /** Customers useEffect */
    useEffect(() => {
        fetchTransactions({
            page: 1,
            perPage: rowsPerPage,
            q: ''
        });
    }, []);

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
    
    return (
        <Fragment>
            <Col xl="12" className="box-col-12">
                <Card>
                    <Card.Header className="pb-0 d-flex justify-content-between align-items-center">
                        <H5>Recent Transactions</H5>
                    </Card.Header>
                    <Card.Body>
                        {!isLoading ? (
                            <Fragment>
                                {transactions && transactions.allItems &&  transactions.allItems.length > 0 ? (
                                <div className="table-responsive">
                                    <Table className="table table-bordernone">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Service</th>
                                                <th scope="col">Reference</th>
                                                <th scope="col">Narration</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions && transactions.allItems.map((item) =>
                                                <tr key={item.id}>
                                                    <td>{SN++}</td>
                                                    <td>{item.user.firstname + ' ' + item.user.lastname}</td>
                                                    <td>{item.service.name}</td>
                                                    <td>{item.reference}</td>
                                                    <td>{item.narration}</td>
                                                    <td>{item.imageUrl && <Image attrImage={{ src: item.imageUrl, width: '40px', height: '40px', alt: '' }} />}</td>
                                                    <td><Badges attrBadge={{ className: 'badge rounded-pill', color: `${item.type !== 'credit' ? 'danger' : 'success'}` }}>₦{item.amount}</Badges></td>
                                                    <td>{renderStatus(item.status)}</td>
                                                    <td>{moment.utc(item.createdAt).local().format('MM/DD/YYYY')}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
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
            </Col>
        </Fragment>
    );
};

export default RecentTransactions;