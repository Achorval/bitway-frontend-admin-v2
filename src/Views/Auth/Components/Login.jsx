import * as yup from 'yup';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import request from 'Utils/Helper/Request';
import { useAuth } from 'Utils/Helper/UseAuth';
import { Col, Form, Row } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import authHelper from 'Utils/Helper/AuthHelpers';
import { Image, Btn, H4, P } from "Core/Components";
import { yupResolver } from '@hookform/resolvers/yup'; 

const Login = () => {
  //** State */
  const [isLoading, setIsLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  /** Hooks */
  const {setCurrentAdmin} = useAuth();
  
  //** Default Values */
  const defaultValues = {
    username: '',
    password: ''
  };

  // ** Login Schema
  const loginSchema = yup.object().shape({
    username: yup.string().required('Email or Phone is a required field'),
    password: yup.string().required('Password is a required field')
  });

  //** UseForm */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, resolver: yupResolver(loginSchema) });

  //** Form submit */
  const loginAuth = async (values) => {
    setIsLoading(true);
    try {
      const response = await request(`${process.env.REACT_APP_API_URL}/admin/login`, { 
        method: 'POST', 
        body: values
      });
      console.log(response);
      setIsLoading(false);
      authHelper.setToken(response.accessToken);
      setCurrentAdmin(response.details);
    } catch (error) {
      if (error && error.response.status > 200) {
        setIsLoading(false);
        toast.error(error.response.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="p-0 container-fluid">
        <Row>
          <Col className="col-12">
            <div className="login-card flex-column">
              <div className="d-flex align-items-center p-4">
                <Image attrImage={{ className: 'img-fluid d-inline', src: `${require('assets/images/logo/logo.png')}`, alt: '', style: {width: '120px', height: 'auto'} }} />
              </div>
              <div className="login-main login-tab">
                <Form onSubmit={handleSubmit(loginAuth)} className="theme-form">
                  <H4>Sign </H4>
                  <P>{"Enter your email & password to login"}</P>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        className="p-2"
                        placeholder="Enter email"
                        {...register("username")}
                    />
                    {errors.username && (
                        <Form.Text className="text-danger">
                            {errors.username.message}
                        </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="p-2"
                      placeholder="Password"
                      {...register("password")}
                      type={togglePassword ? 'text' : 'password'}
                    />
                    <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                      <span className={togglePassword ? '' : 'show'}></span>
                    </div>
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="form-group">
                    <div className="checkbox">
                      <input id="checkbox1" type="checkbox" />
                      <Form.Label className="text-muted" htmlFor="checkbox1">Remember password</Form.Label>
                    </div>
                    <Link className="link" to="/auth">Forgot password?</Link>
                  </Form.Group>
                  <Form.Group className="form-group mb-0">
                    <Btn attrBtn={{ color: "primary", className: "btn-block w-100", disabled: isLoading ? isLoading : isLoading }}>
                      Login {(isSubmitting || isLoading) && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
                    </Btn>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Login;