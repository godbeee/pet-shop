import Modal from "react-bootstrap/Modal";
import { FaCirclePlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import classes from "./ModalUpdatePet.module.css";
import Resizer from "react-image-file-resizer";
import { useEffect, useState } from "react";
import Spin from "../../components/UI/Spinner";
import { breedList } from "../../data/breed";
import { baseURL } from "../../config/config";
import { toast } from "react-toastify";

function ModalUpdatePet({ show, handleClose, fetchPets, pet, setPet }) {
  const [imageUpload, setImageUpload] = useState("");
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  let breeds = [];
  if (pet?.type) {
    breeds = breedList.find((item) => item.type === pet.type).breeds;
  }
  useEffect(() => {
    setImageUpload(pet?.avatar);
  }, [pet?.avatar]);

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
  function handleChange(e) {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  }
  async function handleUploadAndResizeImage(e) {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
          setIsLoadingImg(true);
          const api = `${baseURL}/uploadimage`;
          const res = await fetch(api, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ image: uri, id: pet?._id }),
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
    const api = `${baseURL}/removeimage`;
    try {
      setIsLoadingImg(true);
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ public_id: id, id: pet?._id }),
      });
      await res.json();
      setIsLoadingImg(false);
      setImageUpload(null);
    } catch (err) {
      console.log(err);
      setIsLoadingImg(false);
    }
  }
  async function handleSubmitUpdatePet(e) {
    e.preventDefault();
    const form = e.target.elements;
    const obj = {
      avatar: imageUpload,
      name: form.name.value,
      sex: form.sex.value,
      type: pet?.type,
      breed: form.breed.value,
      weight: form.weight.value,
      age: form.age.value,
      desc: form.desc.value,
      price: form.price.value,
    };
    const res = await fetch(`${baseURL}/pets/${pet?._id}`, {
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
    setPet(data.pet);
    fetchPets();
    handleClose();
    notify("update pet success!");
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
            <Modal.Title className={classes.title}>update pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitUpdatePet} className="row g-3">
              <div className="col-12">
                <div className={classes.avatar}>
                  {imageUpload && (
                    <>
                      <img src={imageUpload.url} alt=""></img>
                      <TiDelete
                        onClick={(e) => handleRemove(e, imageUpload.public_id)}
                        className={classes.x}
                      />
                    </>
                  )}
                  {!imageUpload && (
                    <img src="https://placehold.co/207x138" alt=""></img>
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
                <input
                  className="form-control"
                  name="name"
                  value={pet?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sex</label>
                <select
                  value={pet?.sex}
                  onChange={handleChange}
                  name="sex"
                  className="form-control"
                >
                  <option value={true}>Male</option>
                  <option value={false}>FeMale</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  onChange={handleChange}
                  className="form-control"
                  name="type"
                  value={pet?.type}
                >
                  <option value={"dog"}>dog</option>
                  <option value={"cat"}>cat</option>
                  <option value={"other"}>other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">breed</label>
                <select
                  value={pet?.breed}
                  onChange={handleChange}
                  name="breed"
                  className="form-control"
                >
                  {breeds.map((breed, i) => (
                    <option key={i} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">weight</label>
                <input
                  className="form-control"
                  name="weight"
                  value={pet?.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={pet?.age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={pet?.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">description</label>
                <input
                  name="desc"
                  className="form-control"
                  placeholder="description"
                  value={pet?.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-end">
                <button className="btn btn-success">update pet</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalUpdatePet;
