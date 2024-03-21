import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

function Customers() {
  let [customers, setCustomers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  const handleOptionChnage = (e) => {
    setSelectedOption(e.target.value);
    navigate("/transactions", { state: { transaction: e.target.value } });
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:4000/activeUsers")
      .then((res) => {
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  //   console.log(customers.accounts);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Accounts</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((curElm, index) => (
          <>
            <tr>
              <td>{index + 1}</td>
              <td>{curElm.name}</td>
              <td>{curElm.address}</td>
              <td>
                <select value={selectedOption} onChange={handleOptionChnage}>
                  <option>Click To View</option>
                  {curElm.accounts.map((accounts, i) => (
                    <option>
                      <Link to="/signin"> {accounts}</Link>
                    </option>
                    // <Link>
                    //   <option value={accounts}>{accounts}</option>
                    // </Link>
                  ))}
                </select>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
}

export default Customers;
