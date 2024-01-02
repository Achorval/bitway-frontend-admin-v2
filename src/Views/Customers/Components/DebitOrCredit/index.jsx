import * as yup from 'yup';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { Breadcrumbs, Btn } from 'Core/Components';
import CustomerContext from 'Core/Helper/Customer';
import React, { Fragment, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Row, Col, Card, Form, Container } from 'react-bootstrap';

const DebitOrCredit = () => {

  const history = useNavigate();
  const { isLoading, creditOrDebit } = useContext(CustomerContext);

  //** Default Values */
  const defaultValues = {
    username: '',
    type: '',
    amount: ''
  };

  // ** Credit & Debit Schema
  const debitCreditSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    type: yup.string().required('Type is a required field'),
    amount: yup.string().required('Amount is a required field')
  });

  /** Onsubmit */
  const {
      reset,
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(debitCreditSchema) });

  /** Handle Onsubmit */
  const onCreditOrDebit = async (values) => {
    try {
      const response = await creditOrDebit(values.username, values.type, values.amount);
      reset();
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      history(`${process.env.PUBLIC_URL}/customers/customer-list`);
    } catch (error) {
      if (error && error.response.status > 200) {
        toast.error(error.response.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Customers" title="Credit Or Debit Customer" mainTitle="Credit Or Debit Customer" />
      <Container fluid>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onCreditOrDebit)} className="theme-form">
              <Row>
                <Col sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email or phone"
                      {...register("username")}
                      isInvalid={!!errors.username}
                    />
                    {errors.username && (
                      <Form.Text className="text-danger">
                        {errors.username.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col sm="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select 
                      aria-label="Select"
                      {...register("type")}
                      isInvalid={!!errors.type}
                    >
                      <option value="">---Select---</option>
                      <option value="Credit">Credit</option>
                      <option value="Debit">Debit</option>
                    </Form.Select>
                    {errors.type && (
                      <Form.Text className="text-danger">
                        {errors.type.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col sm="12">
                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      {...register("amount")}
                      isInvalid={!!errors.amount}
                    />
                    {errors.amount && (
                      <Form.Text className="text-danger">
                        {errors.amount.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-0">
                    <Btn attrBtn={{ color: 'success', className: 'me-3', disabled: isSubmitting || isLoading }} >
                      Submit {(isSubmitting || isLoading) && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
                    </Btn>
                    <Link to={`${process.env.PUBLIC_URL}/customers/customer-list`}>
                      <Btn attrBtn={{ color: 'danger' }} >Cancel</Btn>
                    </Link>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
};

export default DebitOrCredit;