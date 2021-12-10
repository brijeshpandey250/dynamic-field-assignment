import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';
import DynamicFieldContext from '../../context/dynamic_field/dynamicFieldContext';
import { Link } from 'react-router-dom';

const GenerateDynamicField = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const dynamicFieldContext = useContext(DynamicFieldContext);
  const { dynamicFields, getDynamicFields, getDynamicFieldDetail, dynamicFieldDetail, isAuthenticated, loading } = dynamicFieldContext;

  const initialDynamicField = {
    name: '',
    id: '',
    size: ''
  };
  const [dynamicAttributes, setDynamicAttributes] = useState({
    name: '',
    id: '',
    size: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/generate-dynamic-field');
    }
    getDynamicFields();
    
  }, []);

  const { name, id, size } = dynamicAttributes;

  const onChange = e => setDynamicAttributes({ ...dynamicAttributes, [e.target.name]: e.target.value });

  const handleChange = async (event) => {
    console.log("event", event.target.value);
    // Dynamic Field Detail
    await getDynamicFieldDetail(event.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
  };

  if (dynamicFields !== null && dynamicFields.length === 0 && !loading) {
    return <div className='form-container'>
      <h1>
        <Link to='/create-dynamic-field'>Create Dynamic Field</Link>
      </h1>
    </div>

  }


  return (
    <>
      <div className='form-container'>
        <h1>
          Select a <span className='text-primary'>dynamic field</span>
        </h1>
        {/* <form onSubmit={onSubmit}> */}
        <div className='form-group'>
          <select
            id='name'
            name='name'
            onChange={(event) => handleChange(event)}
            required
          >
            <option key={0}>--Select dynamic field--</option>
            {dynamicFields && dynamicFields.length > 0 ? dynamicFields.map((current, i) => {
              return (<option key={current._id} value={current._id}>{current.name}</option>)
            }) : loading == true ? <Spinner /> : ""}
          </select>
        </div>
        {
          dynamicFieldDetail && dynamicFieldDetail !== null ?
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
                value='Update Field'
                className='btn btn-primary btn-block'
              />
            </form> : <>
              <h1>Please select dynamic field to load <span className='text-primary'>attributes</span></h1><Spinner /></>
        }
        {/* </form> */}
      </div>
      {
        dynamicFieldDetail && dynamicFieldDetail !== null ?
          <input
            type='text'
            size={size}
          /> : <><h2>Please select dynamic field to stop loader and <span className='text-primary'>load dynamic field</span></h2><Spinner /></>
      }
    </>
  )
};

export default GenerateDynamicField;

