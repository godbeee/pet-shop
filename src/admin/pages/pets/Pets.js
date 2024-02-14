import classes from "./Pets.module.css";
import Card from "../../../components/UI/Card";
import ModalAddPet from "../../ModalAddPet/ModalAddPet";
import ModalUpdatePet from "../../ModalUpdatePet/ModalUpdatePet";
import PetTable from "../../PetTable/PetTable";

import { baseURL } from "../../../config/config";
import { useEffect, useState } from "react";

function Pets() {
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

  useEffect(() => {
    fetchPets();
  }, []);

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

  async function fetchPets() {
    const res = await fetch(`${baseURL}/pets`);
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
          <button className="btn btn-primary mb-3" onClick={handleShow}>
            add pet
          </button>
          <PetTable
            pets={pets}
            fetchPets={fetchPets}
            handleShowUpdate={handleShowUpdate}
            setPetId={setPetId}
          />
        </Card>
      </div>
    </>
  );
}

export default Pets;
