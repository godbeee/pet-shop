import { toast } from "react-toastify";
import { baseURL } from "../../config/config";

function PetTable({ pets, fetchPets, handleShowUpdate, setPetId }) {
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
  async function handleDelete(id, public_id) {
    const isConfirm = window.confirm("are u sure delete this?");
    if (isConfirm) {
      const res = await fetch(`${baseURL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      fetchPets();
      try {
        const res = await fetch(`${baseURL}/removeimage`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ public_id }),
        });
        await res.json();
        notify("delete pet success!");
      } catch (err) {
        console.log(err);
      }
    }
  }
  function handleUpdate(id) {
    setPetId(id);
    handleShowUpdate();
  }
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th className="col-md-4" scope="col">
              Name
            </th>
            <th scope="col">Type</th>
            <th scope="col">Breed</th>
            <th className="col-md-2" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr valign="middle" key={pet._id}>
              <th scope="row">{i++}</th>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.breed}</td>
              <td>
                <button
                  onClick={() => handleUpdate(pet._id)}
                  className="btn btn-primary mx-1"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(pet._id, pet?.avatar?.public_id)}
                  className="btn btn-danger mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {pets.length === 0 && (
            <tr>
              <td className="text-center fw-bold" colSpan={5}>
                No Pet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default PetTable;
