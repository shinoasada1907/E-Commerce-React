import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  //pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 5;

  //search functionality
  const [search, setSearch] = useState("");

  //sort functionality
  const [sortColumn, setSortColumn] = useState({
    column: "id",
    orderBy: "desc",
  });

  function getProducts() {
    let url =
      "http://localhost:3000/products?_page=" +
      currentPage +
      "&_limit=" +
      pageSize +
      "&q=" +
      search +
      "&_sort=" +
      sortColumn.column +
      "&_order=" +
      sortColumn.orderBy;
    console.log("url=" + url);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          let totalCount = response.headers.get("X-Total-Count");
          console.log("X-Total_Count: " + totalCount);
          let pages = Math.ceil(totalCount / pageSize);
          console.log("Total pages: " + pages);
          setTotalPage(pages);
          return response.json();
        }

        throw new Error();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        alert("Unable to get the data");
      });
  }

  useEffect(getProducts, [currentPage, search, sortColumn]);

  function deleteProduct(id) {
    fetch("http://localhost:3000/products/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response) {
          throw new Error();
        }
        getProducts();
      })
      .catch((error) => {
        alert("Unable to delete the product");
      });
  }

  //pagination functionality
  let paginationButton = [];
  for (let i = 1; i <= totalPage; i++) {
    paginationButton.push(
      <li
        className={i === currentPage ? "page-item active" : "page-item"}
        key={i}
      >
        <a
          className="page-link"
          href={"?page=" + i}
          onClick={(event) => {
            event.preventDefault();
            setCurrentPage(i);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  //search functionality
  function handleSearch(event) {
    event.preventDefault();

    let text = event.target.search.value;
    setSearch(text);
    setCurrentPage(1);
  }

  //sort functionality
  function sortTable(column) {
    let orderBy = "desc";
    if (column === sortColumn.column) {
      if (orderBy === sortColumn.orderBy) orderBy = "asc";
      else orderBy = "desc";
    }

    setSortColumn({ column: column, orderBy: orderBy });
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/products/create"
            role="button"
          >
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={getProducts}
          >
            Refresh
          </button>
        </div>
        <div className="col">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              name="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => sortTable("id")}>
              ID
              <SortArrow
                column={"id"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => sortTable("name")}>
              Name
              <SortArrow
                column={"name"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => sortTable("brand")}
            >
              Brand
              <SortArrow
                column={"brand"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => sortTable("category")}
            >
              Category
              <SortArrow
                column={"category"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => sortTable("price")}
            >
              Price
              <SortArrow
                column={"price"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th>Image</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => sortTable("createdAt")}
            >
              Created At
              <SortArrow
                column={"createdAt"}
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}$</td>
                <td>
                  <img
                    src={
                      "http://localhost:3000/images/" + product.imageFilename
                    }
                    width={100}
                    alt=""
                  />
                </td>
                <td>{product.createdAt.slice(0, 10)}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <Link
                    to={"/admin/products/edit/" + product.id}
                    className="btn btn-primary btn-sm me-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="pagination">{paginationButton}</ul>
    </div>
  );
}

function SortArrow({ column, sortColumn, orderBy }) {
  if (column !== sortColumn) return null;

  if (orderBy === "asc") {
    return <i className="bi bi-arrow-up"></i>;
  }

  return <i className="bi bi-arrow-down"></i>;
}
