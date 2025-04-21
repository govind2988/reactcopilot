import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

function Projects() {
  ModuleRegistry.registerModules([AllCommunityModule]);
  const [rowData, setRowData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
  });
  const [viewModal, setViewModal] = useState(false); // State for view modal
  const [viewData, setViewData] = useState(null); // State for row data to view
  const [editModal, setEditModal] = useState(false); // State for edit modal
  const [editData, setEditData] = useState(null); // State for row data to edit
  const [deleteModal, setDeleteModal] = useState(false); // State for delete confirmation modal
  const [deleteId, setDeleteId] = useState(null); // State for the ID to delete
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" }); // State for alert messages

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000); // Hide alert after 3 seconds
  };

  const handleAdd = () => {
    setShowModal(true); // Show the modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    setNewProduct({ title: "", price: "", category: "" }); // Reset form
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = () => {
    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then((response) => {
        setRowData([...rowData, { ...newProduct, id: response.data.id }]); // Add new product to table
        handleModalClose(); // Close modal after successful submission
        showAlert("Product added successfully!", "success"); // Show success alert
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        showAlert("Failed to add product!", "danger"); // Show error alert
      });
  };

  const handleEdit = (data) => {
    setEditData(data); // Set the row data to edit
    setEditModal(true); // Show the edit modal
  };

  const handleEditModalClose = () => {
    setEditModal(false); // Close the edit modal
    setEditData(null); // Reset the edit data
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value }); // Update the edit data
  };

  const handleEditFormSubmit = () => {
    axios
      .put(`https://fakestoreapi.com/products/${editData.id}`, editData)
      .then((response) => {
        const updatedRowData = rowData.map((row) =>
          row.id === editData.id ? response.data : row
        );
        setRowData(updatedRowData); // Update the rowData with the edited row
        handleEditModalClose(); // Close the modal after saving changes
        showAlert("Product updated successfully!", "success"); // Show success alert
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        showAlert("Failed to update product!", "danger"); // Show error alert
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id); // Set the ID to delete
    setDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDelete = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${deleteId}`)
      .then(() => {
        const filteredRowData = rowData.filter((row) => row.id !== deleteId);
        setRowData(filteredRowData); // Update the rowData after deletion
        setDeleteModal(false); // Close the delete confirmation modal
        setDeleteId(null); // Reset the delete ID
        showAlert("Product deleted successfully!", "success"); // Show success alert
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        showAlert("Failed to delete product!", "danger"); // Show error alert
      });
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false); // Close the delete confirmation modal
    setDeleteId(null); // Reset the delete ID
  };

  const handleView = (data) => {
    setViewData(data); // Set the row data to view
    setViewModal(true); // Show the view modal
  };

  const handleViewModalClose = () => {
    setViewModal(false); // Close the view modal
    setViewData(null); // Reset the view data
  };

  const [columnDefs] = useState([
    { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title" },
    { headerName: "Price", field: "price" },
    { headerName: "Category", field: "category" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div>
          <button
            onClick={() => handleView(params.data)}
            className="btn btn-warning btn-sm me-2"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(params.data)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.data.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setRowData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container border p-4">
      {/* Alert Message */}
      {alert.show && (
        <div
          className={`alert alert-${alert.variant} position-fixed top-0 end-0 m-3 d-flex align-items-center`}
          style={{ zIndex: 1050 }}
        >
          <span className="me-auto">{alert.message}</span>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAlert({ show: false, message: "", variant: "" })}
          ></button>
        </div>
      )}

      <h1>Projects</h1>
      <div className="swipperContainer">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} xl={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab 2</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} xl={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="mb-3">
                    <button
                      onClick={handleAdd}
                      className="btn btn-success btn-sm"
                    >
                      Add Product
                    </button>
                  </div>
                  <div style={{ width: "100%" }} className="ag-theme-alpine">
                    <AgGridReact
                      key={rowData.length}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: true }}
                      pagination={true}
                      paginationPageSize={10}
                      domLayout="autoHeight"
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleFormChange}
                placeholder="Enter product title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleFormChange}
                placeholder="Enter product price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleFormChange}
                placeholder="Enter product category"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Product Modal */}
      <Modal show={viewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewData && (
            <div>
              <p>
                <strong>ID:</strong> {viewData.id}
              </p>
              <p>
                <strong>Title:</strong> {viewData.title}
              </p>
              <p>
                <strong>Price:</strong> ${viewData.price}
              </p>
              <p>
                <strong>Category:</strong> {viewData.category}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={editModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditFormChange}
                  placeholder="Enter product title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditFormChange}
                  placeholder="Enter product price"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditFormChange}
                  placeholder="Enter product category"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Projects;
