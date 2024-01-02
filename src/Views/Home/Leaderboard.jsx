
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, H5, H6, P } from 'Core/Components';
import { Col, Card, Table, CardBody, CardHeader } from 'reactstrap';

const RecentSalesData = [
    {
        image: '1.jpg',
        title: 'Jane Cooper',
        subTitle: '10 minutes ago',
        badge: '$200.00',
    },
    {
        image: '2.jpg',
        title: 'Brooklyn Simmons',
        subTitle: '19 minutes ago',
        badge: '$970.00',
    },
    {
        image: '3.jpg',
        title: 'Leslie Alexander',
        subTitle: '2 hours ago',
        badge: '$300.00',
    },
    {
        image: '4.jpg',
        title: 'Travis Wright',
        subTitle: '8 hours ago',
        badge: '$450.00',
    },
    {
        image: '5.jpg',
        title: ' Mark Green',
        subTitle: '1 day ago',
        badge: '$768.00',
    }
];
const Leaderboard = () => {
    return (
        <Col xxl='4' md='6' className='box-col-12'>
            <Card className="">
                <CardHeader className='card-no-border'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <H5 attrH5={{ className: 'm-0' }}>Leaderboard</H5>
                        <div className="card-header-right-icon">
                            <select className="form-control">
                                <option className="NGN">All Time</option>
                                <option className="USD">7 Days</option>
                            </select>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className='pt-0'>
                    <Table borderless responsive>
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RecentSalesData.map((item, i) => (
                                <tr key={i}>
                                    <td className='d-flex align-items-center image-sm-size gap-3 img-content-box'>
                                        <Image attrImage={{ className: 'img-fluid img-40 rounded-circle', src: require(`assets/images/user/4.jpg`), alt: 'user' }} />
                                        <div className="d-inline-block">
                                            <Link className='d-block f-w-500' to={`${process.env.PUBLIC_URL}/app/users/profile`}>
                                                {item.title}
                                            </Link>
                                            <span className='f-light'>{item.subTitle}</span>
                                        </div>
                                    </td>
                                    <td className='text-end'>
                                        <H6 attrH6={{ className: "mb-0" }}>{'230,300.00'}</H6>
                                        <P attrPara={{ className: 'm-0 font-success' }}>{item.badge}</P>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <button className="btn btn-outline-light w-100 p-3 mt-3">View all Users</button>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Leaderboard;