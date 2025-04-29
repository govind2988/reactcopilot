import { useEffect, useState } from "react"; // Import useEffect and useState
import axios from "axios"; // Import axios for API calls
import { useLoader } from "../../../context/LoaderContext"; // Import useLoader
import profile from "./../../../assets/profile.png";
import Loader from "../../common/home/Loader";

function ListPage2() {
  const [businessList, setBusinessList] = useState([]);
  const [filters, setFilters] = useState({
    country: "India",
    state: "",
    city: "Chennai", // Default value set to Chennai
    pincode: "",
    page: 0, // Add page to filters
  }); // State for filters
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const { loading, setLoading } = useLoader(); // Use global loader state

  const fetchBusinessList = async (filterParams) => {
    setLoading(true); // Use global loader
    try {
      const response = await axios.post(
        "https://topiko.com/prod/app/getCityListingFilterBusinessListing.php",
        filterParams // Pass filter parameters to the API
      );
      console.log("BLIST", response); // Log the response data
      setBusinessList(response.data.response || []);
      setTotalPages(response.data.totalPages || 1); // Set total pages from API response
    } catch (error) {
      console.error("Error fetching business list:", error);
    } finally {
      setLoading(false); // Use global loader
    }
  };

  useEffect(() => {
    fetchBusinessList(filters); // Fetch data on component mount or filter change
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 0, // Reset to the first page when applying filters
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: newPage, // Update the page in filters
      }));
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>List Page 2</h1>
        <p>Explore our Lists</p>
      </div>

      <div className="text-center mb-4 d-flex justify-content-center flex-wrap filterBlock">
        <select
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
        >
          <option value="India">India</option>
        </select>
        <select
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
        >
          <option value="">Select State</option>
          <option value="Tamilnadu">Tamilnadu</option>
          <option value="Gujarath">Gujarath</option>
        </select>
        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Kerala">Kerala</option>
          <option value="Ahmedabad">Ahmedabad</option>
        </select>
        <input
          type="text"
          name="pincode"
          placeholder="pincode"
          value={filters.pincode}
          onChange={handleFilterChange}
        />
        <button onClick={handleApplyFilters} className="btn btn-primary ms-2">
          Apply Filters
        </button>
      </div>

      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
        <>
          <ul className="bList">
            {businessList.map((business, index) => (
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
                          alt={business.business_name || "Business"} // Use correct title field
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
                          {typeof business.business_name === "string"
                            ? business.business_name
                            : "Business Name"}{" "}
                          // Ensure business_name is a string
                        </a>
                      </h4>
                      <div className="Goodup-location">
                        <i className="fas fa-map-marker-alt me-1 theme-cl"></i>
                        {(business.area, business.city)}
                      </div>
                      <div className="Goodup-location">
                        {typeof business.category.categoryName === "string"
                          ? business.category.categoryName
                          : "Category"}{" "}
                        // Ensure categoryName is a string
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination-controls text-center mt-4">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 0}
            >
              Previous
            </button>
            <span>
              Page {filters.page + 1} of {totalPages}
            </span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page + 1 === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ListPage2;
