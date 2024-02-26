import classes from "./PetDetailPage.module.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Card from "../../components/UI/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseURL } from "../../config/config";
import Stack from "react-bootstrap/Stack";
import { BiMessageSquareCheck } from "react-icons/bi";
import { LiaWeightSolid } from "react-icons/lia";
import { PiGenderIntersex } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/slices/cartSlice";
import TabCustom from "../../components/Tab/Tab";
import PetListRelate from "../../components/PetListRelate/PetListRelate";

function PetDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const petId = params.id;
  const [pet, setPet] = useState(null);
  const [petRelate, setPetRelate] = useState([]);

  useEffect(() => {
    async function fetchPet() {
      const res = await fetch(`${baseURL}/pets/${petId}`);
      const data = await res.json();
      console.log(data);
      setPet(data.pet);
      setPetRelate(data.petRelate);
    }
    if (petId) {
      fetchPet();
    }
  }, [petId]);

  function handleAddItemToCart(e) {
    dispatch(
      cartAction.addToCart({
        ...pet,
        quantity: 1,
      })
    );
  }
  return (
    <>
      <div className={classes.banner}>
        <div>
          <nav className="breadcrumbs">
            <Link to="/" className="breadcrumbs__item">
              Home
            </Link>
            <Link to="/pets" className="breadcrumbs__item is-active">
              Pets
            </Link>
          </nav>
        </div>
      </div>
      <Container>
        <Card>
          <div className="row">
            <div className="col-md-6">
              <img
                style={{ width: "100%" }}
                src={pet?.avatar?.url}
                alt={pet?.name}
              ></img>
            </div>
            <div className="col-md-6 p-4">
              <div className="row">
                <h2 className="">{pet?.name}</h2>
                <div className="col-md-5">
                  <Stack className="mb-3" direction="horizontal" gap={1}>
                    <div className={classes.tag}>{pet?.type}</div>
                    <div className={classes.tag}>{pet?.breed}</div>
                  </Stack>
                  <div className="d-flex flex-column gap-2 fs-5">
                    <span>
                      <IoPricetagOutline className="mx-1" />
                      <strong>Price:</strong> {pet?.price}
                    </span>
                    <span>
                      <PiGenderIntersex className="mx-1" />
                      <strong>Sex:</strong>{" "}
                      {pet?.sex === true ? "male" : "female"}
                    </span>
                    <span>
                      <BiMessageSquareCheck className="mx-1" />
                      <strong>Age:</strong> {pet?.age} year
                    </span>
                    <span>
                      <LiaWeightSolid className="mx-1" />
                      <strong>Weight:</strong> {pet?.weight} kg
                    </span>
                    <div className={classes.action}>
                      <button
                        onClick={handleAddItemToCart}
                        style={{ gap: "0.5rem" }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        Add to cart <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 fs-5">
                  <div>
                    <strong>Description:</strong>
                  </div>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <TabCustom />
          </div>
        </Card>
        <div className="row mt-5">
          <PetListRelate petRelate={petRelate} />
        </div>
      </Container>
    </>
  );
}

export default PetDetailPage;
