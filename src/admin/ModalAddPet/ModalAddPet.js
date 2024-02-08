import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCirclePlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import classes from "./ModalAddPet.module.css";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Spin from "../../components/UI/Spinner";

function ModalAddPet({ show, handleShow, handleClose }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  async function handleUploadAndResizeImage(e) {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        207,
        138,
        "JPEG",
        80,
        0,
        async (uri) => {
          setIsLoadingImg(true);
          const api = `${process.env.REACT_APP_BASE_URL}/uploadimage`;
          const res = await fetch(api, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ image: uri }),
          });
          const data = await res.json();
          console.log(data);
          setIsLoadingImg(false);
          setImageUpload(data);
        },
        "base64"
      );
    }
  }
  async function handleRemove(e, id) {
    const api = `${process.env.REACT_APP_BASE_URL}/removeimage`;
    try {
      setIsLoadingImg(true);
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ public_id: id }),
      });
      await res.json();
      setIsLoadingImg(false);
      setImageUpload(null);
    } catch (err) {
      console.log(err);
      setIsLoadingImg(false);
    }
  }
  async function handleSubmitAddPet(e) {
    e.preventDefault();
    const form = e.target.elements;
    const obj = {
      name: form.name.value,
      sex: form.sex.value,
    };
  }
  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          add new Pet
        </Button>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className={classes.title}>add pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div class="row mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="title" />
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="hobies" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select className="form-control">
                  <option>Breed</option>
                  <option>Breed</option>
                  <option>Breed</option>
                </select>
              </div>
              <div class="col">
                <select className="form-control">
                  <option>Breed</option>
                  <option>Breed</option>
                  <option>Breed</option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="age" />
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="weight" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <label className={classes["img-choose"]}>
                  <div className="d-flex align-items-center gap-2">
                    choosen image <FaCirclePlus />
                  </div>
                  <input type="file" name="images" multiple hidden />
                </label>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div className={classes["img-preview"]}></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <select className="form-control">
                  <option>Breed</option>
                  <option>Breed</option>
                  <option>Breed</option>
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="short desc"
                />
              </div>
            </div> */}
            <form onSubmit={handleSubmitAddPet} class="row g-3">
              <div class="col-12">
                <div className={classes.avatar}>
                  {imageUpload && (
                    <>
                      <img src={imageUpload.url}></img>
                      <TiDelete
                        onClick={(e) => handleRemove(e, imageUpload.public_id)}
                        className={classes.x}
                      />
                    </>
                  )}
                  {!imageUpload && (
                    <img src="https://placehold.co/207x138"></img>
                  )}
                </div>
              </div>
              <div class="col-12 d-flex align-items-center gap-3">
                <label className={classes.upload}>
                  upload images <FaCirclePlus />
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="images/*"
                    onChange={handleUploadAndResizeImage}
                  ></input>
                </label>
                {isLoadingImg && <Spin />}
              </div>
              <div class="col-md-6">
                <label class="form-label">Name</label>
                <input class="form-control" name="name" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Sex</label>
                <select name="sex" className="form-control">
                  <option value={true}>Male</option>
                  <option value={false}>FeMale</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">breed</label>
                <select className="form-control">
                  <option>Breed</option>
                  <option>Breed</option>
                  <option>Breed</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">breed</label>
                <select className="form-control">
                  <option>Breed</option>
                  <option>Breed</option>
                  <option>Breed</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">weight</label>
                <input class="form-control" name="weight" />
              </div>
              <div class="col-md-6">
                <label class="form-label">age</label>
                <input class="form-control" name="age" />
              </div>
              <div class="col-12">
                <label class="form-label">description</label>
                <input class="form-control" placeholder="description" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ModalAddPet;
