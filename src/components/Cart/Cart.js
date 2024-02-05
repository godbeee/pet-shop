import { FaTrash } from "react-icons/fa";

function Cart() {
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Product</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Price</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Quantity</div>
              </th>
              <th scope="col" className="border-0 bg-light text-center">
                <div className="py-2 text-uppercase">Remove</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="border-0">
                <div class="p-2">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-cart/product-1.jpg"
                    alt=""
                    width="70"
                    class="img-fluid rounded shadow-sm"
                  />
                  <div className="mx-3 d-inline-block align-middle">
                    <h5 class="mb-0">
                      <a href="#" class="text-dark d-inline-block align-middle">
                        Timex Unisex Originals
                      </a>
                    </h5>
                    <span class="text-muted font-weight-normal font-italic d-block">
                      Category: Watches
                    </span>
                  </div>
                </div>
              </th>
              <td class="border-0 align-middle text-center">
                <strong>$79.00</strong>
              </td>
              <td class="border-0 align-middle text-center">
                <span>-</span>
                <strong>3</strong>
                <span>+</span>
              </td>
              <td class="border-0 align-middle text-center">
                <a href="#" class="text-dark">
                  <FaTrash />
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="p-2">
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-cart/product-2.jpg"
                    alt=""
                    width="70"
                    class="img-fluid rounded shadow-sm"
                  />
                  <div class="mx-3 d-inline-block align-middle">
                    <h5 class="mb-0">
                      <a href="#" class="text-dark d-inline-block">
                        Lumix camera lense
                      </a>
                    </h5>
                    <span class="text-muted font-weight-normal font-italic">
                      Category: Electronics
                    </span>
                  </div>
                </div>
              </th>
              <td class="align-middle text-center">
                <strong>$79.00</strong>
              </td>
              <td class="align-middle text-center">
                <span>-</span>
                <strong>3</strong>
                <span>+</span>
              </td>
              <td class="align-middle text-center">
                <a href="#" class="text-dark">
                  <FaTrash />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
