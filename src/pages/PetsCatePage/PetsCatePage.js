import { Container } from "react-bootstrap";
import PetList from "../../components/PetList/PetList";
import PetFilter from "../../components/PetFilter/PetFilter";
import classes from "./PetsCatePage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL, pageSize } from "../../config/config";
import ReactPaginate from "react-paginate";
import NavCate from "../../components/NavCate/NavCate";
import { useParams } from "react-router-dom";

function PetsCatePage() {
  const params = useParams();
  const [pets, setPets] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [keyword, setKeyword] = useState("");
  const cate = params.cate;
  console.log(cate);
  //paginate
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  const currentPets = pets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pets.length / pageSize);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 1) % pets.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch(
        `${baseURL}/shop/pets?type=${cate}&name=${keyword}&sort=${sortBy}`
      );
      const data = await res.json();
      setPets(data.pets);
    }
    if (cate === "dog" || cate === "cat") {
      fetchPets();
    }
  }, [keyword, sortBy, cate]);
  return (
    <>
      <Container style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <div className={classes.banner}>
          <div>
            <nav className="breadcrumbs">
              <Link to="/" className="breadcrumbs__item">
                Home
              </Link>
              <Link to="/order" className="breadcrumbs__item is-active">
                Pets
              </Link>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <NavCate cate={cate} />
            <PetFilter setKeyword={setKeyword} setSortBy={setSortBy} />
            <PetList pets={currentPets} />
            <div className="row mt-3">
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
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PetsCatePage;
