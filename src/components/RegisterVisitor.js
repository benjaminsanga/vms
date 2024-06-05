import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import { RegisterVisitorSchema } from '../schema/registerSchema';
import { useRegisterVisitorQuery } from '../helper/api';

const RegisterVisitor = () => {

  const {data, isError, error, mutate, isSuccess} = useRegisterVisitorQuery()

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(RegisterVisitorSchema)
  })

  const submitVisitorData = (data) => {
    mutate(data)
  }
  console.log(data, 'data');
  if (isError) {
    console.log(error);
  }

  return (
    <div className="">
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='mt-3'>
          <Link to='/' className='text-decoration-none text-black'>Home ↩ </Link>
        </p>
      </header>
      <div className="container mt-2 px-5 mx-5">
        <h2 className='text-center mb-5'>Visitor's Form</h2>
        {isSuccess && <div className="alert alert-success" style={{width: '50%', margin: '0 auto'}}>
          <p className='p-0 m-0'><strong>Success!</strong> Visitor data recorded.</p>
        </div>}
        <form className='m-5' onSubmit={handleSubmit(submitVisitorData)}>
          <div className="row mx-5">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nameOfVisitor" className="form-label">
                  Name of Visitor
                </label>
                <input type="text" className="form-control" id="nameOfVisitor" {...register('nameOfVisitor')} />
                <span invalid={!!errors.nameOfVisitor} className='text-danger form-error-message'>
                  {errors?.nameOfVisitor?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="nameOfHost" className="form-label">
                  Name of Host
                </label>
                <input type="text" className="form-control" id="nameOfHost" {...register('nameOfHost')} />
                <span invalid={!!errors.nameOfHost} className='text-danger form-error-message'>
                  {errors?.nameOfHost?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="purposeOfVisit" className="form-label">
                  Purpose of Visit
                </label>
                <select className='form-control' id='purposeOfVisit' {...register('purposeOfVisit')}>
                  <option value=''>Select</option>
                  <option value='Official'>Official</option>
                  <option value='Personal'>Personal</option>
                </select>
                <span invalid={!!errors.purposeOfVisit} className='text-danger form-error-message'>
                  {errors?.purposeOfVisit?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="itemsDeposited" className="form-label">
                  Items Deposited (Indicate Quantity)
                </label>
                <input type="text" className="form-control" id="itemsDeposited" {...register('itemsDeposited')} />
              </div>
              <div className="mb-3">
                <label htmlFor="safeNumber" className="form-label">
                  Safe/Lock Number
                </label>
                <input type="text" className="form-control" id="safeNumber" {...register('safeNumber')} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input type="text" className="form-control" id="phoneNumber" {...register('phoneNumber')} />
                <span invalid={!!errors.phoneNumber} className='text-danger form-error-message'>
                  {errors?.phoneNumber?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="tagNumber" className="form-label">
                  Tag Number
                </label>
                <input type="text" className="form-control" id="tagNumber" {...register('tagNumber')} />
                <span invalid={!!errors.tagNumber} className='text-danger form-error-message'>
                  {errors?.tagNumber?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfVisit" className="form-label">
                  Date
                </label>
                <input type="date" className="form-control" id="dateOfVisit" {...register('dateOfVisit')} />
                <span invalid={!!errors.dateOfVisit} className='text-danger form-error-message'>
                  {errors?.dateOfVisit?.message}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comment
                </label>
                <textarea rows={4} className='form-control' id='comment' {...register('comment')}></textarea>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="input10" className="form-label">
                  Input 10
                </label>
                <input type="text" className="form-control" id="input10" />
              </div> */}
            </div>
          </div>
          <div className='d-flex flex-row justify-content-center my-3'>
            <button type='submit' className='btn btn-md btn-success px-5 py-2'>Submit Visitor Form</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterVisitor