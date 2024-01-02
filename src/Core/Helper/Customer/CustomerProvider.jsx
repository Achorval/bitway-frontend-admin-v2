import request from 'Utils/Helper/Request';
import React, { useState } from 'react';
import Context from './index';

const CustomerProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState(null);

  /** Fetch Customer Data */
  const fetchCustomers = async (params) => {
    try {
      setIsLoading(true);
      await request(`${process.env.REACT_APP_API_URL}/admin/users`,{ 
        method: 'GET',
        params: params 
      }).then((res) => {
        setIsLoading(false); 
        setCustomers(res.details);
      });
    } catch (error) {
      setIsLoading(false);
      throw error; 
    }
  };

  /** Fetch Transaction Data */
  const fetchTransactions = async (params) => {
    try {
      setIsLoading(true);
      await request(`${process.env.REACT_APP_API_URL}/admin/transactions`,{ 
        method: 'GET',
        params: params 
      }).then((res) => {
          setIsLoading(false);
          setTransactions(res.details);
        }
      );
    } catch (error) {
      setIsLoading(false);
      throw error; 
    }
  };

  /** Fetch Transaction Data */
  const fetchTransactionDetails = async (id) => {
    try {
      setIsLoading(true);
      await request(`${process.env.REACT_APP_API_URL}/admin/transactions/details`,{ 
        method: 'GET',
        params: {
          id: id
        } 
      }).then((res) => {
          setIsLoading(false);
          setTransactionDetails(res.details);
        }
      );
    } catch (error) {
      setIsLoading(false);
      throw error; 
    }
  };

  const updateTransactionStatus = async (id, status, amount, userId, service) => {
    try {
      setIsLoading(true);
      const result = await request(`${process.env.REACT_APP_API_URL}/admin/transactions/status/update`,{ 
        method: 'POST',
        body: {
          id: id,
          status: status,
          amount: amount,
          userId: userId,
          service: service
        } 
      });
      setIsLoading(false); 
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error; 
    }
  };
  
  /** Block user account details */
  const blockCustomerAccount = async (userId, blocked) => { 
    try {
      console.log(userId)
      console.log(blocked)
      const response = await request(`${process.env.REACT_APP_API_URL}/admin/users/block`, { 
        method: 'POST',
        body: {
          userId: userId,
          blocked: blocked
        }
      });
      return response;
    } catch (error) {
      throw error; 
    }
  };
  
  /** Credit or Debit balance */
  const creditOrDebit = async (username, type, amount) => {
    try {
      setIsLoading(true);
      const customerTemp = {
        username: username,
        type: type,
        amount: amount
      };
      const response = await request(`${process.env.REACT_APP_API_URL}/admin/users/creditordebit`,{ 
        method: 'POST',
        body: customerTemp
      });
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error; 
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        open,
        setOpen,
        isLoading: isLoading,
        customers: customers,
        transactions: transactions,
        transactionDetails: transactionDetails,
        setTransactionDetails: setTransactionDetails,
        fetchCustomers: fetchCustomers,
        fetchTransactions: fetchTransactions,
        fetchTransactionDetails: fetchTransactionDetails,
        updateTransactionStatus: updateTransactionStatus,
        blockCustomerAccount: blockCustomerAccount,
        creditOrDebit: creditOrDebit,        
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CustomerProvider;
