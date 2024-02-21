import classes from "./Users.module.css";
import Card from "../../../components/UI/Card";
import { useState, useEffect } from "react";
import { baseURL } from "../../../config/config";
import UserTable from "./components/UserTable/UserTable";
import ReactPaginate from "react-paginate";
import { pageSize } from "../../../config/config";
import { debounce } from "../../../utils/ultils";
import ModalViewUser from "./components/ModalViewUser/ModalViewUser";

function Users() {
  //users
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  //view modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //paginate
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize;
  const currentUsers = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / pageSize);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 1) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //search
  const [fullname, setFullname] = useState("");
  const handleOnChange = debounce((value) => {
    setFullname(value);
  });
  ///////////////////////////////////////
  useEffect(() => {
    fetchUsers(fullname);
  }, [fullname]);
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${baseURL}/users/${userId}`);
      const data = await res.json();
      setUser(data.user);
    }
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  async function fetchUsers(fullname = "") {
    let api = `${baseURL}/users`;
    if (fullname) {
      api = `${baseURL}/users?fullname=${fullname}`;
    }
    const res = await fetch(api);
    const data = await res.json();
    setUsers(data.users);
  }
  return (
    <>
      <div className="p-3">
        <Card className={"p-4"}>
          <div className={classes.head}>
            <h3>Users management</h3>
            <ModalViewUser user={user} show={show} handleClose={handleClose} />
          </div>
        </Card>
        <Card className={"p-4 mt-3"}>
          <div className="mb-3 d-flex justify-content-end align-items-center">
            <form>
              <input
                onChange={(e) => handleOnChange(e.target.value)}
                className="form-control"
                placeholder="enter search here"
              />
            </form>
          </div>
          <UserTable
            handleShow={handleShow}
            setUserId={setUserId}
            users={currentUsers}
            fetchUsers={fetchUsers}
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

export default Users;
