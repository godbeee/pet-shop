import classes from "./Pets.module.css";
import Card from "../../../components/UI/Card";
import ModalAddPet from "../../ModalAddPet/ModalAddPet";
import ModalUpdatePet from "../../ModalUpdatePet/ModalUpdatePet";
import PetTable from "../../PetTable/PetTable";
import ReactPaginate from "react-paginate";
import { baseURL, pageSize } from "../../../config/config";
import { debounce } from "../../../utils/ultils";
import { useEffect, useState } from "react";

function Pets() {
  //pets
  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState(null);
  const [pet, setPet] = useState(null);

  //add modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  //paginate
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  const currentPets = pets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pets.length / pageSize);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 1) % pets.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //search
  const [name, setName] = useState("");
  const handleOnChange = debounce((value) => {
    setName(value);
  });
  ///////////////////////////////////////
  useEffect(() => {
    fetchPets(name);
  }, [name]);

  useEffect(() => {
    async function fetchPet() {
      const res = await fetch(`${baseURL}/pets/${petId}`);
      const data = await res.json();
      setPet(data.pet);
    }
    if (petId) {
      fetchPet();
    }
  }, [petId]);

  async function fetchPets(name = "") {
    let api = `${baseURL}/pets`;
    if (name) {
      api = `${baseURL}/pets?name=${name}`;
    }
    const res = await fetch(api);
    const data = await res.json();
    setPets(data.pets);
  }

  return (
    <>
      <div className="p-3">
        <Card className={"p-4"}>
          <div className={classes.head}>
            <h3>pets management</h3>
            <ModalAddPet
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
              fetchPets={fetchPets}
            />
            <ModalUpdatePet
              show={showUpdate}
              handleShow={handleShowUpdate}
              handleClose={handleCloseUpdate}
              fetchPets={fetchPets}
              pet={pet}
              setPet={setPet}
            />
          </div>
        </Card>
        <Card className={"p-4 mt-3"}>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" onClick={handleShow}>
              add pet
            </button>
            <form>
              <input
                onChange={(e) => handleOnChange(e.target.value)}
                className="form-control"
                placeholder="enter search here"
              />
            </form>
          </div>
          <PetTable
            pets={currentPets}
            fetchPets={fetchPets}
            handleShowUpdate={handleShowUpdate}
            setPetId={setPetId}
          />
          <ReactPaginate
            className={classes.paginate}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </Card>
      </div>
    </>
  );
}

export default Pets;
