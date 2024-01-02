import { toast } from "react-toastify";
import { PlusCircle } from 'react-feather';
import UserContext from 'Core/Helper/User';
import { Card, Table } from 'react-bootstrap';
import { SvgLoader } from 'Core/Components/SvgIcons';
import search from 'assets/images/search-not-found.png';
import { P, H5, Btn, Badges, Image, Pagination } from 'Core/Components';
import React, { Fragment, useContext, useState, useEffect } from 'react';

const ServiceTable = ({ toggleModal }) => {
    // Number of items to display per page
    let SN = 1;
    const rowsPerPage = 15;

    // ** States
    const [currentPage, setCurrentPage] = useState(1);
    
    /** Context */
    const { isLoading, services, setService, fetchServices, deleteService } = useContext(UserContext);

    /** Services useEffect */
    useEffect(() => {
        fetchServices({
            page: currentPage,
            perPage: rowsPerPage,
            q: ''
        });
    }, []);

    // ** Function to handle Pagination and get data
    const handlePageChange = page => {
        fetchServices({
            page: page + 1,
            perPage: rowsPerPage,
            q: ''
        });
        setCurrentPage(page + 1)
    };

    /** Handle Delete */
    const handleDelete = async (id) => { 
        if (window.confirm(`Are you sure you want to delete?`)) {
            const response = await deleteService(id);
            fetchServices({
                page: currentPage,
                perPage: rowsPerPage,
                q: ''
            });
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center pb-0">
                <div>
                    <H5>Service List</H5>
                    <span>List of services opend by Admin</span>
                </div>
                <Btn attrBtn={{ color: "primary", className: "d-flex align-items-center gap-2", onClick: () => toggleModal() }}> 
                    <PlusCircle /> Create New Service
                </Btn>
            </Card.Header>
            <Card.Body>
                {!isLoading ? (
                <Fragment>
                    {services && services.allItems && services.allItems.length > 0 ? (
                    <Fragment>
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">{'#'}</th>
                                        <th scope="col">{'Name'}</th>
                                        <th scope="col">{'Rate'}</th>
                                        <th scope="col">{'Description'}</th>
                                        <th scope="col">{'Status'}</th>
                                        <th scope="col">{'Action'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services && services.allItems.map((item) =>
                                        <tr key={item.id}>
                                            <th scope="row">{SN++}</th>
                                            <td>{item.name}</td>
                                            <td>{item.rate}</td>
                                            <td>{item.description}</td>
                                            <td><Badges attrBadge={{ className: 'badge rounded-pill', color: `${item.status ? 'success' : 'danger'}` }}>{item.status ? 'Active' : 'Inactive'}</Badges></td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Btn attrBtn={{ color: 'primary', size: 'sm', onClick: () => { toggleModal(); setService(item)} }}> 
                                                        <i className='fa fa-pencil'></i> Edit
                                                    </Btn>
                                                    <Btn attrBtn={{ color: 'danger', size: 'sm', onClick: () => handleDelete(item.id) }}>
                                                        <i className='fa fa-trash'></i> Delete
                                                    </Btn>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <Pagination
                            onPageChange={page => handlePageChange(page)}
                            totalPages={Math.ceil(services.totalItems / rowsPerPage)}
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
export default ServiceTable;