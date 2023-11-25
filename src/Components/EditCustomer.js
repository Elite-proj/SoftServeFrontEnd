import { React, useState, useEffect } from "react";
import { Form, FormControl, FormGroup, Button } from "react-bootstrap";
import moment from "moment";

const EditCustomer = (props) => {
  //Get Customers
  const [customer, setCustomer] = useState({});

  //Form data for validation

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

  const [formError, setFormError] = useState({});

  const [formData, setFormData] = useState({
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

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  //setFormData(() => ({ ...formData, FirstName: customer.FirstName }));

  const Validation = () => {
    let err = {};

    if (formData.FirstName === "") {
      err.FirstName = "Please enter first name";
    }

    if (formData.LastName === "") {
      err.LastName = "Please enter last name";
    }

    if (formData.EmailAddress === "") {
      err.EmailAddress = "Please enter email address";
    } else {
      let regex =
        /^[a-z0-9_\\+-]+(\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\.[a-z0-9]+)*\.([a-z]{2,4})$/;
      if (!regex.test(formData.EmailAddress)) {
        err.EmailAddress = "Email not valid!";
      }
    }

    if (formData.DateOfBirth === "") {
      err.DateOfBirth = "Please select Date of birth";
    }

    setFormError({ ...err });

    return Object.keys(err).length < 1;
  };

  function SubmitHandler(event) {
    event.preventDefault();
    let isValid = Validation();

    if (isValid) {
      fetch("https://localhost:7276/api/Customer/UpdateCustomer", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",

        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: event.target.FirstName.value,
          LastName: event.target.LastName.value,
          UserName: formData.UserName,
          EmailAddress: event.target.EmailAddress.value,
          DateOfBirth: event.target.DateOfBirth.value,
          age: event.target.age.value,
          isDeleted: event.target.isDeleted.value,
          DateCreated: event.target.DateCreated.value,

          CustomerID: props.CustomerID,
        }),
      })
        .then((response) => response.json())
        .then(
          (results) => {
            window.location.reload();
          },
          (error) => {
            window.alert(error);
          }
        );
    }
  }

  return (
    <div className="container">
      <Form onSubmit={(e) => SubmitHandler(e)}>
        <FormGroup controlId="UserName">
          <FormControl
            type="text"
            //name="UserName"
            placeholder="UserName"
            onChange={onChangeHandler}
            value={formData.UserName}
            disabled
          />
          <span className="text-danger">{formError.UserName}</span>
        </FormGroup>

        <br />

        <FormGroup controlId="FirstName">
          <FormControl
            type="text"
            name="FirstName"
            placeholder="First name"
            onChange={onChangeHandler}
            value={formData.FirstName}
          />
          <span className="text-danger">{formError.FirstName}</span>
        </FormGroup>

        <br />

        <FormGroup controlId="LastName">
          <FormControl
            type="text"
            name="LastName"
            placeholder="Last name"
            onChange={onChangeHandler}
            value={formData.LastName}
          />
          <span className="text-danger">{formError.LastName}</span>
        </FormGroup>

        <br />

        <FormGroup controlId="EmailAddress">
          <FormControl
            type="email"
            placeholder="Email Address"
            name="EmailAddress"
            onChange={onChangeHandler}
            value={formData.EmailAddress}
          />
          <span className="text-danger">{formError.EmailAddress}</span>
        </FormGroup>

        <br />

        <FormGroup controlId="DateOfBirth">
          <FormControl
            type="text"
            name="DateOfBirth"
            placeholder="Date of birth"
            onChange={onChangeHandler}
            value={moment(formData.DateOfBirth).format("DD/MM/yyyy")}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            max={moment().format("YYYY-MM-DD")}
          />
          <span className="text-danger">{formError.DateOfBirth}</span>
        </FormGroup>
        <FormControl
          type="text"
          name="isDeleted"
          value={formData.isDeleted}
          hidden
        />
        <FormControl
          type="text"
          name="DateCreated"
          value={formData.DateCreated}
          hidden
        />
        <FormControl
          type="text"
          name="DateEdited"
          value={formData.DateEdited}
          hidden
        />
        <FormControl type="text" name="age" value={customer.age} hidden />
        <FormControl
          type="text"
          name="UserName"
          value={formData.UserName}
          hidden
        />
        <br />
        <FormGroup>
          <Button type="submit" className="primary">
            Save
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EditCustomer;
