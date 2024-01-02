import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Breadcrumbs } from 'Core/Components';
import TransactionTable from './TransactionTable';
import TransactionDetails from './TransactionDetails';

const TransactionContain = () => {

    return (
        <Fragment>
            <Breadcrumbs mainTitle='Transaction List' parent="Customers" title="Transaction List" />
            <Container fluid={true}>
                <TransactionTable />
                <TransactionDetails />
            </Container>
        </Fragment>
    );
};
export default TransactionContain;