import classes from "./Pets.module.css";
import Card from "../../../components/UI/Card";
import ModalAddPet from "../../ModalAddPet/ModalAddPet";
import { useState } from "react";

function Pets() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [imgsPreview, setImgsPreview] = useState([]);
  // function handlePreview(e) {
  //   const files = e.target.files;
  //   if (files.length) {
  //     const arr = [];
  //     for (let file of files) {
  //       arr.push(URL.createObjectURL(file));
  //     }
  //     setImgsPreview(arr);
  //   }
  // }
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
            />
          </div>
          <div className={classes.body}>body</div>
        </Card>
      </div>
    </>
  );
}

export default Pets;
