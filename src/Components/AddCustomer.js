import { React, useState } from "react";
import moment from "moment";
import {
  FormGroup,
  FormControl,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const AddCustomer = () => {
  //debugger;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",

    EmailAddress: "",
    DateOfBirth: "",
  });

  const [formError, setFormError] = useState({});

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

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
      fetch("https://localhost:7276/api/Customer/AddCustomer", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: event.target.FirstName.value,
          LastName: event.target.LastName.value,

          EmailAddress: event.target.EmailAddress.value,
          DateOfBirth: event.target.DateOfBirth.value,
        }),
      })
        .then((response) => response.json())
        .then(
          (results) => {
            navigate("/Components/ListCustomers");
          },
          (error) => {
            console.log(error);
            window.alert(error);
          }
        );
    }
  }

  return (
    <div>
      <Navigation />
      <div className="container">
        <br />
        <br />

        <h3>Create Customer</h3>
        <div className="d-flex justify-content-center">
          <Form onSubmit={(e) => SubmitHandler(e)}>
            <Row>
              <Col sm={12}></Col>
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
            </Row>
            <br />
            <Row>
              <Col sm={12}>
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
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={12}>
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
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={12}>
                <FormGroup controlId="DateOfBirth">
                  <FormControl
                    type="text"
                    name="DateOfBirth"
                    placeholder="Date of birth"
                    onChange={onChangeHandler}
                    value={formData.DateOfBirth}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    max={moment().format("YYYY-MM-DD")}
                  />
                  <span className="text-danger">{formError.DateOfBirth}</span>
                </FormGroup>
              </Col>
            </Row>
            <br />
            <FormGroup>
              <Button type="submit" className="primary">
                Add Customer
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
