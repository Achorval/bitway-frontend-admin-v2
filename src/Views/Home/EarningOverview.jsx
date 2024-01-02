import Charts from 'react-apexcharts';
import { H4, H6 } from 'Core/Components';
import UserContext from 'Core/Helper/User';
import ConfigDB from "Utils/Config/ThemeConfig";
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { ShoppingBag, MessageCircle, UserPlus } from 'react-feather';
import React, { Fragment, useContext, useEffect, useState } from 'react';

//  '#014278'
const primary = localStorage.getItem("default_color") || ConfigDB.data.color.primary_color;
//  '#c29873'
const secondary = localStorage.getItem("secondary_color") || ConfigDB.data.color.secondary_color;

const EarningOverview = () => {
    /** Context */
    const { dashboard, fetchDashboard } = useContext(UserContext);
    const [period, setPeriod] = useState('All');

    /** Handle useEffect */
    useEffect(() => {
        fetchDashboard(period);
    }, [period]);

    /** Handle Period change */
    const handlePeriodChange = (event) => {
      setPeriod(event.target.value);
    };

    /** Handle Earning data */
    const EarningData = [
        {
            id: 1,
            classCompo: 'bg-primary',
            icon: <UserPlus />,
            title: 'Users',
            count: dashboard && dashboard.userCountOverview,
            iconWithClass: <UserPlus className="icon-bg" />
        },
        {
            id: 2,
            classCompo: 'bg-secondary',
            icon: <ShoppingBag />,
            title: 'Transactions',
            count: dashboard && dashboard.transactionOverview,
            iconWithClass: <ShoppingBag className="icon-bg" />
        },
        {
            id: 3,
            classCompo: 'bg-danger',
            icon: <MessageCircle />,
            title: 'Withdrawals',
            count: dashboard && dashboard.withdrawalOverview,
            iconWithClass: <MessageCircle className="icon-bg" />
        }
    ];

    /** Market Chart */
    const MarketChart = {
        series: [
        {
            name: "Giftcard Trade",
            data: [23, 44, 55, 57, 56, 61, 58, 63, 60, 66, 73, 50],
        },
        {
            name: "Crypto Trade",
            data: [56, 76, 85, 101, 98, 87, 105, 91, 114, 94, 46, 99],
        },
        ],
        options: {
        chart: {
            height: 360,
            type: "bar",
            toolbar: {
            show: false,
            },
        },
        plotOptions: {
            bar: {
            borderRadius: 10,
            rangeBarOverlap: true,
            columnWidth: "60%",
            colors: {
                ranges: [
                {
                    from: 0,
                    to: 0,
                    color: undefined,
                },
                ],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
            },
            dataLabels: {
                position: "top", // top, center, bottom
            },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
            title: {
            text: "$ (thousands)",
            },
        },
    
        fill: {
            opacity: 1,
            colors: [primary, secondary],
            type: "gradient",
            gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 0.8,
            stops: [0, 100],
            },
        },
        colors: [primary, secondary],
        tooltip: {
            y: {
            formatter: function (val) {
                return "$ " + val + " thousands";
            },
            },
        },
        },
    };

    return (
        <Fragment>
            <Col xl="8" className="box-col-12">
                <Card className="">
                    <CardHeader className="d-flex justify-content-between align-items-center pb-0">
                        <H6 attrH6={{ className: "mb-0" }}>Overview</H6>
                        <div className="card-header-right-icon">
                            <select className="form-control" value={period} onChange={handlePeriodChange}>
                                <option className="All">All</option>
                                <option className="Weekly">Weekly</option>
                                <option className="Monthly">Monthly</option>
                                <option className="Yearly">Yearly</option>
                            </select>
                        </div>
                    </CardHeader>
                    <CardBody className="cal-date-widget">
                        <Row>
                            {EarningData.map((item) =>
                                <Col sm="6" xl="4" lg="6" key={item.id}>
                                    <Card className="o-hidden border-0 mb-3 mb-lg-0">
                                        <CardBody className={item.classCompo}>
                                            <div className="media static-top-widget">
                                                <div className="align-self-center text-center">
                                                    {item.icon}
                                                </div>
                                                <div className="media-body">
                                                    <span className="m-0">{item.title}</span>
                                                    <H4 attrH4={{ className: 'mb-0 counter' }} >{item.count}</H4>
                                                    {item.iconWithClass}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        <div className="bar-chart-widget">
                            <div id="chart-widget4">
                                <Charts options={MarketChart.options} series={MarketChart.series} type="bar" height={360} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default EarningOverview;