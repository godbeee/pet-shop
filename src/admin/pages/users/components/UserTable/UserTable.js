import { baseURL } from "../../../../../config/config";
import { toast } from "react-toastify";

function UserTable({ users, handleShow, setUserId, fetchUsers }) {
  let i = 1;
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
  function handleView(id) {
    setUserId(id);
    handleShow();
  }
  async function handleDelete(id) {
    const isConfirm = window.confirm("are u sure delete this?");
    if (isConfirm) {
      const res = await fetch(`${baseURL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      notify("delete user success!");
      fetchUsers();
    }
  }
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th className="col-md-4" scope="col">
              fullname
            </th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
            <th className="col-md-2" scope="col">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <th scope="row">{i++}</th>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => handleView(user._id)}
                  className="btn btn-success mx-2"
                >
                  view
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger mx-2"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td className="text-center fw-bold" colSpan={5}>
                No User!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
