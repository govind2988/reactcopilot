import { useEffect, useState } from "react"; // Import useEffect and useState
import axios from "axios"; // Import axios for API calls
import { useLoader } from "../../../context/LoaderContext"; // Import useLoader
import profile from "./../../../assets/profile.png";
import Loader from "../../common/home/Loader";
import { Pagination } from "react-bootstrap"; // Import Pagination from react-bootstrap

function ListPage2() {
  const [businessList, setBusinessList] = useState([]);
  const [filters, setFilters] = useState({
    country: "India",
    state: "",
    city: "Hyderabad", // Default value set to Chennai
    pincode: "",
  }); // State for filters
  const { loading, setLoading } = useLoader(); // Use global loader state

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 10; // Number of items per page

  const fetchBusinessList = async (filterParams) => {
    setLoading(true); // Use global loader
    try {
      const response = await axios.post(
        "https://topiko.com/prod/app/getCityListingFilterBusinessListing.php",
        filterParams // Pass filter parameters to the API
      );
      console.log("BLIST", response); // Log the response data
      setBusinessList(response.data.response || []);
      // Removed setTotalPages as totalPages is calculated dynamically
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

  const totalPages = Math.ceil(businessList.length / itemsPerPage); // Calculate total pages based on businessList

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessList.slice(indexOfFirstItem, indexOfLastItem); // Use businessList for pagination

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
          <option value="hyderabad">Hyderabad</option>
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

export default ListPage2;
