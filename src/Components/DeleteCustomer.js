import { React, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const DeleteCustomer = (props) => {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const getCustomer = async () => {
      const response = await fetch(
        `https://localhost:7276/api/Customer/GetCustomerByID/${props.CustomerID}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const getResponse = await response.json();

      setCustomer(getResponse);
    };
    getCustomer();
  }, [props.CustomerID]);

  const [formData] = useState({
    FirstName: "",
    CustomerID: props.CustomerID,
    LastName: "",
  });

  useEffect(() => {
    formData.CustomerID = customer.CustomerID;
    formData.FirstName = customer.FirstName;
    formData.LastName = customer.LastName;
  });

  function submitHandler(event) {
    event.preventDefault();

    fetch(
      `https://localhost:7276/api/Customer/DeleteCustomer/${props.CustomerID}`,
      {
        method: "Post",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(
        (results) => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
          window.alert(error);
        }
      );
  }

  return (
    <div className="container">
      <Form onSubmit={submitHandler}>
        <p>
          Are you sure you want to delete {formData.FirstName}{" "}
          {formData.LastName} ?
        </p>

        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </Form>
    </div>
  );
};

export default DeleteCustomer;
