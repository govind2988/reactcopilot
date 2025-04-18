import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "../../../context/LoaderContext"; // Import useLoader
import profile from "./../../../assets/profile.png";
import Loader from "../../common/home/Loader";
import Pagination from "react-bootstrap/Pagination"; // Import Pagination from react-bootstrap

function ListPage() {
  const [businessList, setBusinessList] = useState([]);
  const [filteredBusinessList, setFilteredBusinessList] = useState([]); // State for filtered list
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [activeCategory, setActiveCategory] = useState("all"); // State for active category
  const { loading, setLoading } = useLoader(); // Use global loader state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 12; // Number of items per page

  useEffect(() => {
    const fetchBusinessList = async (category = "all") => {
      setLoading(true); // Use global loader
      try {
        const url =
          category === "all"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${category}`;
        const response = await axios.get(url); // Fetch data based on category
        setBusinessList(response.data || []);
        setFilteredBusinessList(response.data || []); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching business list:", error);
      } finally {
        setLoading(false); // Use global loader
      }
    };

    fetchBusinessList(activeCategory); // Fetch data when activeCategory changes
  }, [activeCategory, setLoading]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredBusinessList(
      businessList.filter((business) =>
        business.title?.toLowerCase().includes(term)
      )
    );
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to the first page
  };

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusinessList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredBusinessList.length / itemsPerPage);

  console.log("Product List:", businessList); // Debugging line

  return (
    <>
      <div className="text-center">
        <h1>List Page</h1>
        <p>Explore our Lists</p>
      </div>

      <div className="text-center mb-4 search-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50 mx-auto"
          value={searchTerm} // Bind search term
          onChange={handleSearchChange} // Handle search input change
        />
      </div>

      <div className="text-center mb-4 category-tabs">
        <ul
          className="nav nav-tabs justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
              role="tab"
            >
              All Categories
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeCategory === "jewelery" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("jewelery")}
              role="tab"
            >
              Jewelery
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeCategory === "men's clothing" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("men's clothing")}
              role="tab"
            >
              Men's Clothing
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeCategory === "women's clothing" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("women's clothing")}
              role="tab"
            >
              Women's Clothing
            </a>
          </li>
        </ul>
      </div>

      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <>
          <ul className="bList">
            {currentItems.map((business, index) => (
              <li key={index} className="w-50 p-2">
                <div className="Goodup-grid-wrap">
                  <div className="Goodup-grid-upper">
                    <div className="Goodup-grid-thumb">
                      <a
                        href="shop-details.html"
                        className="d-block text-center m-auto"
                        tabIndex="0"
                      >
                        <img
                          src={business.image || profile} // Use correct image field
                          className="img-fluid"
                          alt={business.title || "Product"} // Use correct title field
                        />
                      </a>
                    </div>
                  </div>
                  <div className="Goodup-grid-fl-wrap">
                    <div className="Goodup-caption px-3 py-2">
                      <h4 className="mb-0 ft-medium medium">
                        <a
                          href="shop-details.html"
                          className="text-dark fs-md"
                          tabIndex="0"
                        >
                          {business.title || "Product Name"} // Use correct
                          title field
                        </a>
                      </h4>
                      <div className="Goodup-location">
                        <i className="fas fa-map-marker-alt me-1 theme-cl"></i>
                        {business.category || "Category"} // Use correct
                        category field
                      </div>
                    </div>
                    <div className="Goodup-grid-footer py-2 px-3">
                      <div className="Goodup-ft-first">
                        <div className="Goodup-rating">
                          <div className="Goodup-pr-average high">
                            {business.rating?.rate || "N/A"} // Use correct
                            rating field
                          </div>
                          <div className="Goodup-aldeio">
                            <div className="Goodup-rates">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`fas fa-star ${
                                    i < (business.rating?.rate || 0)
                                      ? "text-warning"
                                      : ""
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <div className="Goodup-all-review">
                              <span>
                                {business.rating?.count || "0"} Reviews // Use
                                correct review count field
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination className="justify-content-center">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i}
                active={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </>
  );
}

export default ListPage;
