import * as yup from 'yup';
import { Btn } from 'Core/Components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import UserContext from 'Core/Helper/User';
import { Form, Modal } from "react-bootstrap";
import React, { useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const ServiceForm = ({ open, toggleModal }) => {
  // const [isLoading, setIsLoading] = useState(false);

  /** Context */
  const { 
    isLoading, 
    service,
    setService,
    createService,
    updateService,
    fetchServices
  } = useContext(UserContext);

  /** Handle Form Edit */
  useEffect(() => {
    if (service !== null) {
      setValue('name', service.name);
      setValue('rate', service.rate);
      setValue('description', service.description);
      setValue('status', service.status);
    }
  }, [service]);
  
  //** Default Values */
  const defaultValues = {
    name: '',
    rate: '',
    description: '',
    status: ''
  };

  // ** Service Schema
  const serviceSchema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    rate: yup.string().required('Rate is a required field'),
    description: yup.string().required('Description is a required field'),
    status: yup.string().required('Status is a required field')
  });

  /** Onsubmit */
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(serviceSchema) });

  /** Handle Modal Close */
  const onCloseModal = () => { 
    toggleModal();
    if (service !== null) {
      setService(null);
      reset();
    }
  };
  
  /** Handle Onsubmit */
  const onSubmit = async (values) => {
    try {
      let response;
      if (service === null) {
        response = await createService(values.name, values.rate, values.description, values.status);
      } else {
        response = await updateService(service.id, values.name, values.rate, values.description, values.status);
      }
      reset();
      onCloseModal();
      fetchServices({
        page: 1,
        perPage: 15,
        q: ''
      });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (error && error.response.status > 200) {
        toast.error(error.response.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <Modal show={open} onHide={onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{service === null ? "Add New Service" : "Update Service"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Rate"
              {...register("rate")}
              isInvalid={!!errors.rate}
            />
            {errors.rate && (
              <Form.Text className="text-danger">
                {errors.rate.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              {...register("description")}
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <Form.Text className="text-danger">
                {errors.description.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              {...register("status")}
              isInvalid={!!errors.status}
            >
              <option value="">---Select---</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Form.Select>
            {errors.status && (
              <Form.Text className="text-danger">
                {errors.status.message}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Btn attrBtn={{ className: "w-100 p-2", color: 'primary', type: "Submit", disabled: (isSubmitting || isLoading), onClick: handleSubmit(onSubmit) }}>
          Create Service {(isSubmitting || isLoading) && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
        </Btn>
      </Modal.Footer>
    </Modal>
  );
};
export default ServiceForm;