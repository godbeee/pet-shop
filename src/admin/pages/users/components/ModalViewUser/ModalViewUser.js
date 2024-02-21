import { Modal } from "react-bootstrap";

function ModalViewUser({ user, show, handleClose }) {
  return (
    <>
      <div>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>detail user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">fullname</label>
                <input
                  className="form-control"
                  name="name"
                  value={user?.fullname}
                  //   onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">email</label>
                <input
                  className="form-control"
                  name="email"
                  value={user?.email}
                  //onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={user?.phone}
                  //onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">address</label>
                <textarea
                  name="desc"
                  className="form-control"
                  value={user?.address}
                  //onChange={handleChange}
                />
              </div>
              {/* <div className="col-12 mt-3 d-flex justify-content-end">
                <button className="btn btn-success">update pet</button>
              </div> */}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalViewUser;
