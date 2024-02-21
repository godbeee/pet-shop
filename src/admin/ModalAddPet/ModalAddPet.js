import Modal from "react-bootstrap/Modal";
import { FaCirclePlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import classes from "./ModalAddPet.module.css";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import Spin from "../../components/UI/Spinner";
import { breedList } from "../../data/breed";
import { baseURL } from "../../config/config";
import { toast } from "react-toastify";

function ModalAddPet({ show, handleClose, fetchPets }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [selectedType, setSelectedType] = useState("dog");
  const breeds = breedList.find((item) => item.type === selectedType).breeds;

  function notify(msg, isError) {
    if (isError) {
      return toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function handleChangeSelectType(e) {
    setSelectedType(e.target.value);
  }
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
      avatar: imageUpload,
      name: form.name.value,
      sex: form.sex.value,
      type: selectedType,
      breed: form.breed.value,
      weight: form.weight.value,
      age: form.age.value,
      desc: form.desc.value,
      price: form.price.value,
    };
    const res = await fetch(`${baseURL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    if (data.errors.length) {
      notify(data.errors[0].msg, true);
      return;
    }
    fetchPets();
    e.target.reset();
    setImageUpload(null);
    handleClose();
    notify("create pet success!");
  }
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
            <Modal.Title className={classes.title}>add pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitAddPet} className="row g-3">
              <div className="col-12">
                <div className={classes.avatar}>
                  {imageUpload && (
                    <>
                      <img src={imageUpload.url} alt="avatar" />
                      <TiDelete
                        onClick={(e) => handleRemove(e, imageUpload.public_id)}
                        className={classes.x}
                      />
                    </>
                  )}
                  {!imageUpload && (
                    <img src="https://placehold.co/207x138" alt="avatar" />
                  )}
                </div>
              </div>
              <div className="col-12 d-flex align-items-center gap-3">
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
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input className="form-control" name="name" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sex</label>
                <select name="sex" className="form-control">
                  <option value={true}>Male</option>
                  <option value={false}>FeMale</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  onChange={handleChangeSelectType}
                  className="form-control"
                  name="type"
                >
                  <option value={"dog"}>dog</option>
                  <option value={"cat"}>cat</option>
                  <option value={"other"}>other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">breed</label>
                <select name="breed" className="form-control">
                  {breeds.map((breed, i) => (
                    <option key={i} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">weight</label>
                <input type="number" className="form-control" name="weight" />
              </div>
              <div className="col-md-4">
                <label className="form-label">age</label>
                <input type="number" className="form-control" name="age" />
              </div>
              <div className="col-md-4">
                <label className="form-label">price</label>
                <input type="number" className="form-control" name="price" />
              </div>
              <div className="col-12">
                <label className="form-label">description</label>
                <input
                  name="desc"
                  className="form-control"
                  placeholder="description"
                />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-end">
                <button className="btn btn-success">add pet</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalAddPet;
