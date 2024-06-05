import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetVisitorsQuery, useUpdateVisitorQuery } from "../helper/api";

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading, refetch } = useGetVisitorsQuery(
    currentPage,
    limit,
    from,
    to
  );
  const { mutate, isSuccess } = useUpdateVisitorQuery();

  let date_options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    setVisitors(data?.data?.visitors);
    setTotalPages(data?.data?.totalPages);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage, limit, from, to]);

  if (isLoading) {
    return <p className="text-center py-5">Loading...</p>;
  }

  if (isSuccess) {
    alert("Checkout time updated.");
  }

  const handleUpdateCheckOutTime = (id) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const newTime = `${hours}:${minutes}:${seconds}`;
    const isOK = window.confirm(`Update checkout to current time: ${newTime}`);
    console.log(isOK, "isOK");
    if (isOK) {
      console.log("...");
      mutate(id);
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
      <h2 className="text-center mb-5">Visitors Data</h2>
      <div className="d-flex flex-row justify-content-end my-3">
        Filter By Date:
        <div className="ms-3">
          <input
            type="date"
            className="me-3 p-1"
            style={{ display: "inline" }}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="date"
            className="p-1"
            style={{ display: "inline" }}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name of Visitor</th>
            <th>Name of Host</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Entered By</th>
          </tr>
        </thead>
        {visitors?.length > 0 ? (
          <tbody>
            {visitors?.map(
              (
                {
                  id,
                  nameOfVisitor,
                  nameOfHost,
                  phoneNumber,
                  checkInTime,
                  checkOutTime,
                  dateOfVisit,
                  enteredBy,
                },
                index
              ) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{nameOfVisitor}</td>
                  <td>{nameOfHost}</td>
                  <td>{phoneNumber}</td>
                  <td>
                    {new Date(dateOfVisit)?.toLocaleDateString(
                      "en-US",
                      date_options
                    )}
                  </td>
                  <td>{checkInTime}</td>
                  <td>
                    {checkOutTime || (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleUpdateCheckOutTime(id)}
                      >
                        Set Checkout Time
                      </button>
                    )}
                  </td>
                  <td>{enteredBy}</td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          <p className="text-center py-5 w-100">No data found...</p>
        )}
      </table>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn btn-sm btn-success"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={totalPages === 1}
            className="btn btn-sm btn-success ms-3"
          >
            Next
          </button>
          <p className="m-0 ps-4">Items per page: 
            <select onChange={(e) => setLimit(e.target.value)} className="m-2">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </p>
          <button
            onClick={() => {window.print()}}
            className="btn btn-sm btn-success ms-3"
          >Print Page</button>
        </div>
        <div className="d-flex flex-row">
          <p className="m-0">Page: {`${currentPage}/${totalPages}`}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorsList;
