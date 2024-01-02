import ServiceForm from './ServiceForm';
import ServiceTable from './ServiceTable';
import { Container } from 'react-bootstrap';
import { Breadcrumbs } from 'Core/Components';
import React, { Fragment, useState } from 'react';

const ServiceContain = () => {
    const [open, setOpen] = useState(false);
    const toggleModal = () => setOpen(!open);

    return (
        <Fragment>
            <Breadcrumbs mainTitle='Services' parent="Settings" title="Services" />
            <Container fluid={true}>
                <ServiceTable toggleModal={toggleModal} />
                <ServiceForm open={open} toggleModal={toggleModal} />
            </Container>
        </Fragment>
    );
};
export default ServiceContain;