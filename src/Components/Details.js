import { React, useState, useEffect } from "react";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import moment from "moment";

const Details = (props) => {
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

    DateEdited: "",
    isDeleted: "",
    LastName: "",
    UserName: "",
    EmailAddress: "",
    DateOfBirth: "",
    DateCreated: "",
  });

  useEffect(() => {
    formData.CustomerID = customer.CustomerID;
    formData.FirstName = customer.FirstName;
    formData.LastName = customer.LastName;
    formData.UserName = customer.UserName;
    formData.EmailAddress = customer.EmailAddress;
    formData.DateOfBirth = customer.DateOfBirth;
    formData.UserName = customer.UserName;
    formData.isDeleted = customer.isDeleted;
    formData.DateCreated = customer.DateCreated;
    formData.DateEdited = customer.DateEdited;
  });

  return (
    <div className="container">
      <Form>
        <FormGroup controlId="UserName">
          <label>Username</label>
          <FormControl
            type="text"
            //name="UserName"

            value={formData.UserName}
            disabled
          />
        </FormGroup>

        <br />

        <FormGroup controlId="FirstName">
          <label>First Name</label>
          <FormControl
            type="text"
            name="FirstName"
            value={formData.FirstName}
            disabled
          />
        </FormGroup>

        <br />

        <FormGroup controlId="LastName">
          <label>Last Name</label>
          <FormControl
            type="text"
            name="LastName"
            value={formData.LastName}
            disabled
          />
        </FormGroup>

        <br />

        <FormGroup controlId="EmailAddress">
          <label>Email Address</label>
          <FormControl
            type="email"
            name="EmailAddress"
            disabled
            value={formData.EmailAddress}
          />
        </FormGroup>

        <br />

        <FormGroup controlId="DateOfBirth">
          <label>Date Of Birth</label>
          <FormControl
            type="text"
            name="DateOfBirth"
            value={moment(formData.DateOfBirth).format("DD/MM/yyyy")}
            disabled
          />
        </FormGroup>
        <br />
        <FormGroup>
          <label>Date Created</label>
          <FormControl
            type="text"
            name="DateCreated"
            value={formData.DateCreated}
            disabled
          />
        </FormGroup>
        <br />
        <FormGroup>
          <label>Date Edited</label>
          <FormControl
            type="text"
            name="DateEdited"
            value={formData.DateEdited}
            disabled
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default Details;
