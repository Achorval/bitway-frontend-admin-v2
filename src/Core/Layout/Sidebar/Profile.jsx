import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import { Image, P } from 'Core/Components';
import { useAuth } from 'Utils/Helper/UseAuth';
import man from 'assets/images/dashboard/1.png';

const Profile = () => {
    const { currentAdmin } = useAuth();
    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                    <Image attrImage={{ className: 'img-90 rounded-circle', src: man, alt: '' }} />
                    <div className="badge-bottom">
                        <div className="badge badge-primary">Admin</div>
                    </div>
                </Link>
                <P attrPara={{ className: 'mb-0 font-roboto mt-3' }}>{currentAdmin && currentAdmin.firstname +' '+ currentAdmin.lastname}</P>
            </div>
        </Fragment >
    );
};

export default Profile;