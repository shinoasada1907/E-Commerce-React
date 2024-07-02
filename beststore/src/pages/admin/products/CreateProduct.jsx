import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});


  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.description ||
      !product.image.name
    ) {
      alert("Please fill all fiedls!");
      return;
    }
    // alert("Thank You!!! Love you so much hehe ❤️❤️❤️");

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Thank You!!! Love you so much hehe ❤️❤️❤️");
        navigate("/admin/products");
      } else if (response.status === 400) {
        setValidationErrors(data);
        console.log(data);
      } else {
        alert("Unable to create the product!!");
      }
    } catch (error) {
      alert("Unable to connect to the server!");
    }
  }
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Name
              </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="name" />
                <span className="text-danger">{validationErrors.name}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Brand
              </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="brand" />
                <span className="text-danger">{validationErrors.brand}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Category
              </label>
              <div className="col-sm-8">
                <select name="category" className="form-select">
                  <option value="Other">Other</option>
                  <option value="Phones">Phones</option>
                  <option value="Computers">Computers</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Printers">Printers</option>
                  <option value="Cameras">Cameras</option>
                </select>
                <span className="text-danger">{validationErrors.category}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Price
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  step="0.01"
                  min="1"
                />
                <span className="text-danger">{validationErrors.price}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Description
              </label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  rows={4}
                />
                <span className="text-danger">
                  {validationErrors.description}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="" className="col-sm-4 col-form-label">
                Image
              </label>
              <div className="col-sm-8">
                <input type="file" className="form-control" name="image" />
                <span className="text-danger">{validationErrors.image}</span>
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-bg-secondary" to="/admin/products">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
