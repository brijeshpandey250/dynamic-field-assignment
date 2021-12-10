import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import DynamicFieldContext from '../../context/dynamic_field/dynamicFieldContext';

const CreateDynamicField = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const dynamicFieldContext = useContext(DynamicFieldContext);
  const { createDynamicField, isAuthenticated, dynamicFieldFlag,setUnsetDynamicFieldFlag } = dynamicFieldContext;

  const initialDynamicField = {
    name: '',
    id: '',
    size: ''
  };
  const [dynamicAttributes, setDynamicAttributes] = useState(initialDynamicField);

  useEffect(() => {

    console.log("props", props)
    console.log("dynamicFieldContext", dynamicFieldContext)
    if (isAuthenticated) {
      props.history.push('/create-dynamic-field');
    }
    if (dynamicFieldFlag === true) {
      setAlert("Dynamic field created successfully", 'success');
      setUnsetDynamicFieldFlag();
    }
    /* if (dynamicFieldFlag === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    } */
    setDynamicAttributes(dynamicAttributes);
  }, [isAuthenticated, dynamicFieldFlag, props.history]);

  const { name, id, size } = dynamicAttributes;

  const onChange = e => setDynamicAttributes({ ...dynamicAttributes, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createDynamicField({ name, id, size });

  };

  return (
    <div className='form-container'>
      <h1>
      Set the textbox <span className='text-primary'>attributes</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='id'>Id</label>
          <input
            id='id'
            type='text'
            name='id'
            value={id}
            onChange={onChange}
            required
          />
        </div>
        {/* <div className='form-group'>
          <label htmlFor='class'>Class</label>
          <input
            id='class_name'
            type='text'
            name='class_name'
            value={class_name}
            onChange={onChange}
            required
            minLength='6'
          />
        </div> */}
        <div className='form-group'>
          <label htmlFor='size'>Size</label>
          <input
            id='size'
            type='number'
            name='size'
            value={size}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Create Field'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default CreateDynamicField;

