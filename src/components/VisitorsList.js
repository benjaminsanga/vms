import React, { useState } from "react";
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetVisitorsQuery } from "../helper/api";

const VisitorsList = () => {


  const {data, isLoading} = useGetVisitorsQuery()

  const [details, setDetails] = useState([
    {
      id: 1,
      name: "John Doe",
      host: "Lt Sumn",
      phone: "08099485746",
      checkInTime: "08:00 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: 2,
      name: "Jane Smith",
      host: "Lt Sumn",
      phone: "08099485746",
      checkInTime: "09:00 AM",
      checkOutTime: "06:00 PM",
    },
    {
      id: 3,
      name: "Sam Wilson",
      host: "Lt Sumn",
      phone: "08099485746",
      checkInTime: "07:00 AM",
      checkOutTime: "04:00 PM",
    },
    {
      id: 4,
      name: "Mary Johnson",
      host: "Lt Sumn",
      phone: "08099485746",
      checkInTime: "10:00 AM",
      checkOutTime: "07:00 PM",
    },
    {
      id: 5,
      name: "Peter Parker",
      host: "Lt Sumn",
      phone: "08099485746",
      checkInTime: "11:00 AM",
      checkOutTime: "08:00 PM",
    },
  ]);

  if (isLoading) {
    return <p className="text-center py-5">Loading...</p>
  }
  console.log(data, 'data');

  const handleUpdateCheckOutTime = (id) => {
    const newTime = prompt("Enter new checkout time:");
    if (newTime) {
      setDetails(
        details.map((detail) =>
          detail.id === id ? { ...detail, checkOutTime: newTime } : detail
        )
      );
    }
  };

  return (
    <div className="container my-5">
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="mt-3">
          <Link to="/" className="text-decoration-none text-black">
            Home ↩{" "}
          </Link>
        </p>
      </header>
      <h2 className='text-center mb-5'>Visitors Data</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name of Visitor</th>
            <th>Name of Host</th>
            <th>Phone</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={detail.id}>
              <td>{index + 1}</td>
              <td>{detail.name}</td>
              <td>{detail.host}</td>
              <td>{detail.phone}</td>
              <td>{detail.checkInTime}</td>
              <td>{detail.checkOutTime}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateCheckOutTime(detail.id)}
                >
                  Update Checkout Time
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsList;
