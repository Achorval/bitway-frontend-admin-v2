import { toast } from "react-toastify";
import { P, Btn } from 'Core/Components';
import CustomerContext from 'Core/Helper/Customer';
import { Form, Table, Modal } from "react-bootstrap";
import React, { useState, useEffect, useContext } from 'react';

const TransactionDetails = () => {
    /** Customer Context */
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const { open, setOpen, transactionDetails, setTransactionDetails, updateTransactionStatus, fetchTransactions  } = useContext(CustomerContext);

    useEffect(() => {
        if (transactionDetails && !isEmpty(transactionDetails)) {
            setSelectedValue(transactionDetails.status);
        }
    }, [transactionDetails]);

    /** Handle Modal Close */
    const onCloseModal = () => { 
        setOpen(false);
        setTransactionDetails(null);
    };

      // Step 3: Attach an onChange event handler to update the state
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    //** Handle Change Status */
    const handleChangeStatus = async (id, selectedValue, amount, userId, service) => { 
        if (window.confirm("Do you want to continue!") === true) {
            setIsLoading(true);
            const response = await updateTransactionStatus(id, selectedValue, amount, userId, service);
            setIsLoading(false);
            onCloseModal();
            fetchTransactions({
                page: 1,
                perPage: 10,
                q: ''
            });
            toast.success(response.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        };
    };
    
    //** Handle Empty */
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    };

    return ( 
        <Modal show={open} onHide={onCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="">
                    <tbody>
                        {transactionDetails && !isEmpty(transactionDetails) ? (
                            <>
                                {transactionDetails.imageUrl !== null && <tr>
                                    <td colSpan="2" className="text-center">
                                        <img src={transactionDetails.imageUrl} alt="" className="img-fluid rounded-circle" />
                                    </td>
                                </tr>}
                                <tr>
                                    <td>Name</td>
                                    <td>{transactionDetails.user.firstname + ' ' + transactionDetails.user.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Service</td>
                                    <td>{transactionDetails.service.name}</td>
                                </tr>
                                <tr>
                                    <td>Reference</td>
                                    <td>{transactionDetails.reference}</td>
                                </tr>
                                <tr>
                                    <td>Narration</td>
                                    <td>{transactionDetails.narration}</td>
                                </tr>
                                <tr>
                                    <td>Amount To Receive</td>
                                    <td>{transactionDetails.amount}</td>
                                </tr>
                                {transactionDetails.bankAccount !== null && <>
                                <tr>
                                    <td>Bank Name</td>
                                    <td>{transactionDetails.bankAccount.bankName}</td>
                                </tr>
                                <tr>
                                    <td>Account Number</td>
                                    <td>{transactionDetails.bankAccount.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td>Account Name</td>
                                    <td>{transactionDetails.bankAccount.accountName}</td>
                                </tr>
                                </>}
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        <Form>
                                            <Form.Select 
                                                name="status"
                                                value={selectedValue}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="">---Select---</option>
                                                <option value="success">Success</option>
                                                <option value="pending">Pending</option>
                                                <option value="failed">Failed</option>
                                            </Form.Select>
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center">
                                        <Btn attrBtn={{ className: "w-100 p-2", color: 'primary', type: "Submit", disabled: (isLoading), onClick: () => handleChangeStatus(transactionDetails.id, selectedValue, transactionDetails.amount, transactionDetails.user.id, transactionDetails.service.name) }}>
                                            Continue {(isLoading) && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
                                        </Btn>
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    <P>No record found!</P>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default TransactionDetails;