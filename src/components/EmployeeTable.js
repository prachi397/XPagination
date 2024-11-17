import React, { useEffect, useState } from "react";
import "./employeTable.css";

const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  //calculate total pages
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  //get items for the pages
  const currentItems = employeeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //function to change page when user clicks on prev.next button
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  //fetching employee data from backend
  async function fetchEmployeeData() {
    let apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    try {
      let resp = await fetch(apiUrl);
      let result = await resp.json();
      setEmployeeData(result);
    } catch (err) {
      console.log("Error in fetching employee data.");
    }
  }

  return (
    <div className="table-container">
      <h1>Employee Data Table</h1>
      <table className="emp-table">
        <thead>
          <tr>
            {employeeData.length > 0 &&
              Object.keys(employeeData[0]).map((ele) => (
                <th key={ele}>{ele.charAt(0).toUpperCase() + ele.slice(1)}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((employee) => (
              <tr key={employee.id}>
                {Object.keys(employee).map((key) => (
                  <td key={key}>{employee[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className={currentPage === 1 ? "disable-btn" : ""}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className={currentPage === totalPages ? "disable-btn" : ""}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default EmployeeTable;
