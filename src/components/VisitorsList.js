import React, { useEffect, useState } from "react";
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetVisitorsQuery, useUpdateVisitorQuery } from "../helper/api";

const VisitorsList = () => {
  
  const [visitors, setVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {data, isLoading, refetch} = useGetVisitorsQuery(currentPage)
  const {mutate, isSuccess} = useUpdateVisitorQuery()

  useEffect(() => {
    setVisitors(data?.data?.visitors);
    setTotalPages(data?.data?.totalPages);
  }, [data])

  useEffect(() => {
    refetch()
  }, [currentPage])

  if (isLoading) {
    return <p className="text-center py-5">Loading...</p>
  }

  if (isSuccess) {
    alert("Checkout time updated.")
  }
  
  const handleUpdateCheckOutTime = (id) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const newTime = `${hours}:${minutes}:${seconds}`
    const isOK = window.confirm(`Update checkout to current time: ${newTime}`)
    console.log(isOK, 'isOK');
    if (isOK) {
      console.log('...');
      mutate(id)
      setVisitors(
        visitors?.map((detail) =>
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
          {visitors?.map(({id, nameOfVisitor, nameOfHost, phoneNumber, checkInTime, checkOutTime}, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{nameOfVisitor}</td>
              <td>{nameOfHost}</td>
              <td>{phoneNumber}</td>
              <td>{checkInTime}</td>
              <td>{checkOutTime || '-'}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleUpdateCheckOutTime(id)}
                >
                  Update Checkout Time
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1} className="btn btn-sm btn-success">Previous</button>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={totalPages === 1} className="btn btn-sm btn-success ms-3">Next</button>
        </div>
        <div>
          Page: {`${currentPage}/${totalPages}`}
        </div>
      </div>
    </div>
  );
};

export default VisitorsList;
