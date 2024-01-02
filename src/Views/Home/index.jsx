import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import EarningOverview from './EarningOverview';
import RecentTransactions from './RecentTransactions';
import { Breadcrumbs } from 'Core/Components';
import Leaderboard from './Leaderboard';

const HomeComponent = () => {
    return (
        <Fragment>
            <Breadcrumbs mainTitle="Dashboard" parent="Widgets" title="General" />
            <Container fluid={true} className="general-widget">
                <Row>
                    <EarningOverview />
                    <Leaderboard />
                    <RecentTransactions />
                </Row>
            </Container>
        </Fragment>
    );
};

export default HomeComponent;