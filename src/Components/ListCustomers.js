import { React, useState, useEffect } from "react";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import Navigation from "./Navigation";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import Details from "./Details";

const ListCustomers = () => {
  //handle CustomerID
  const [customerID, setCustomerID] = useState("");

  function HandleProps(id) {
    setCustomerID(id);
  }
  const [customers, setCustomers] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [detailsModalShow, setDetailsModalShow] = useState(false);

  const [customerChange, setCustomerChange] = useState(false);
  const [deleteCustomerChange, setDeleteCustomerChange] = useState(false);

  const handleDetailsModalShow = () => setDetailsModalShow(true);
  const handleModalShow = () => setModalShow(true);

  const handleDeleteModalShow = () => setDeleteModalShow(true);

  const handleDetailsModalClose = () => setDetailsModalShow(false);
  const handleDeleteModalClose = () => {
    setDeleteModalShow(false);

    if (deleteCustomerChange === false) {
      setDeleteCustomerChange(true);
    } else setDeleteCustomerChange(false);
  };

  const handleModalClose = () => {
    setModalShow(false);
    if (customerChange === false) {
      setCustomerChange(true);
    } else setCustomerChange(false);
  };

  useEffect(() => {
    const getCustomers = async () => {
      const getResponse = await fetch(
        "https://localhost:7276/api/Customer/GetCustomers",
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

      const CustomersList = await getResponse.json();
      setCustomers(CustomersList);
    };

    getCustomers();
  }, [customerChange, deleteCustomerChange]);

  return (
    <div>
      <Navigation />
      <div className="container">
        <br />
        <br />
        <h3>List Of Customers</h3>
        <div className="shadow rounded-3 overflow-hidden">
          <Table className="table align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>UserName</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Date Created</th>
                <th>Date Edited</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.CustomerID}>
                  <td>{c.UserName}</td>
                  <td>{c.FirstName}</td>
                  <td>{c.LastName}</td>
                  <td>{c.EmailAddress}</td>
                  <td>{c.DateOfBirth}</td>
                  <td>{c.age}</td>
                  <td>{c.DateCreated}</td>
                  <td>{c.DateEdited}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        handleModalShow();
                        HandleProps(c.CustomerID);
                      }}
                    >
                      Edit
                    </button>{" "}
                    |
                    <Modal
                      show={modalShow}
                      onHide={handleModalClose}
                      size="lg"
                      area-labeledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Edit Customer
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <EditCustomer CustomerID={customerID} />
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={handleModalClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={() => {
                        handleDetailsModalShow();
                        HandleProps(c.CustomerID);
                      }}
                    >
                      Details
                    </button>
                    <Modal
                      show={detailsModalShow}
                      onHide={handleDetailsModalClose}
                      size="lg"
                      area-labeledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Customer Details
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <Details CustomerID={customerID} />
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="danger"
                          onClick={handleDetailsModalClose}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>{" "}
                    |
                    <button
                      onClick={() => {
                        handleDeleteModalShow();
                        HandleProps(c.CustomerID);
                      }}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <Modal
                      show={deleteModalShow}
                      onHide={handleDeleteModalClose}
                      size="lg"
                      area-labeledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Delete Customer
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row>
                          <Col>
                            <DeleteCustomer CustomerID={customerID} />
                          </Col>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="danger"
                          onClick={handleDeleteModalClose}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListCustomers;
