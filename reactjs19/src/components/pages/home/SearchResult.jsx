import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const { state } = useLocation();
  const { searchQuery, searchResults } = state || {};

  return (
    <div className="container py-5">
      <h1 className="text-center">Search Results for "{searchQuery}"</h1>
      {searchResults && searchResults.length > 0 ? (
        <ul className="bList">
          {searchResults.map((business, index) => (
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
                        src={business.logo1 || "/default-profile.png"}
                        className="img-fluid"
                        alt={business.name || "Business"}
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
                        {business.business_name || "Business Name"}
                      </a>
                    </h4>
                    <div className="Goodup-location">
                      <i className="fas fa-map-marker-alt me-1 theme-cl"></i>
                      {business.business_address || "Business Address"}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-4">
          No records found for "{searchQuery}".
        </p>
      )}
    </div>
  );
};

export default SearchResult;
