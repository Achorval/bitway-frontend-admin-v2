import React, { Fragment } from 'react';
import CustomerTable from './CustomerTable';
import { Breadcrumbs } from 'Core/Components';
import { Container } from 'react-bootstrap';

const CustomerContain = () => {
    return (
        <Fragment>
            <Breadcrumbs mainTitle='Customers' parent="Miscellaneous" title="Support Ticket" />
            <Container fluid={true}>
                <CustomerTable />
            </Container>
        </Fragment>
    );
};
export default CustomerContain;