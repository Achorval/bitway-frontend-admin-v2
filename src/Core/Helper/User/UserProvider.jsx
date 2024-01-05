import Context from './index';
import React, { useState } from 'react';
import request from 'Utils/Helper/Request';

const UserProvider = (props) => {
    const [dashboard, setDashboard] = useState({});
    const [service, setService] = useState(null);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    /** Fetch Dashboard Data */
    const fetchDashboard = async (period) => {
        try {
        await request(`${process.env.REACT_APP_API_URL}/admin/dashboard`,{ 
            method: 'GET',
            params: {
                period: period
            }
        }).then((res) => 
        setDashboard(res.details)
        );
        } catch (error) {
        throw error; 
        }
    };
    
    /** Add Service */
    const createService = async (name, rate, description, status) => {
        try {
        setIsLoading(true);
        const response = await request(`${process.env.REACT_APP_API_URL}/admin/services/create`,{ 
            method: 'POST',
            body: {
                name: name,
                rate: rate,
                description: description,
                status: status
            }
        });
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            throw error; 
        }
    };

    /** Fetch Service*/
    const fetchServices = async (params) => {
        try {
            setIsLoading(true);
            await request(`${process.env.REACT_APP_API_URL}/admin/services`,{ method: 'GET', params: params }).then((res) => {
                setServices(res.details);
                setIsLoading(false);
            });
        } catch (error) {
            throw error; 
        }
    };
    
    /** Update Service */
    const updateService = async (id, name, rate, description, status) => {
        try {
            setIsLoading(true);
            const response = await request(`${process.env.REACT_APP_API_URL}/admin/services/update/`+id, { 
            method: 'PUT',
            body: {
                name: name,
                rate: rate,
                description: description,
                status: status
            }
        });
            setIsLoading(false);
            return response;
        } catch (error) {
            setIsLoading(false);
            throw error; 
        }
    };

    /** Delete Network Prefix */
    const deleteService = async (id) => {
        try {
            const response = await request(`${process.env.REACT_APP_API_URL}/admin/services/delete/`+id, { 
                method: 'DELETE'
            });
            return response;
        } catch (error) {
            throw error; 
        }
    };
    
    return (
        <Context.Provider
            value={{
                ...props,
                isLoading,
                service,
                services,
                dashboard,
                setService,
                fetchDashboard,
                createService,
                fetchServices,
                updateService,
                deleteService
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default UserProvider;