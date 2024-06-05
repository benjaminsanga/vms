import React from 'react'
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='my-5'>
          Welcome to the NAFC Visitor Management System
        </p>
        <div className='d-flex flex-row justify-content-between w-25'>
          <Link to={'/register-visitor'}>
            <Button className="btn btn-md btn-primary px-4">Register Visitor</Button>
          </Link>
          <Link to={'/visitors-list'}>
            <Button className="btn btn-md btn-primary px-4">View Visitors List</Button>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Welcome