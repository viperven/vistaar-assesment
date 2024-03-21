import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

function Transactions() {
  let [transactionsList, setTransactionsList] = useState("");
  let [dataReceived, setDataReceived] = useState(false);

  let transactions = useLocation();
  const transactionsId = transactions.state.transaction;

  useEffect(() => {
    axios
      .post("http://localhost:4000/transactions", { transactionsId })
      .then((res) => {
        // console.log(res.data[0].transactions);
        setDataReceived(true);
        setTransactionsList(res.data[0].transactions);
      })
      .catch((err) => {
        console.error("Error in transaction", err);
      });
  }, []);

  console.log(transactionsList);
  console.log(dataReceived);

  return (
    <>
      {dataReceived ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList.map((curElm, index) => (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{curElm.date}</td>
                  <td>{curElm.amount}</td>
                  <td>{curElm.price}</td>
                  <td>{curElm.total}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h1>Loading..</h1>
        </div>
      )}
    </>
  );
}

export default Transactions;
