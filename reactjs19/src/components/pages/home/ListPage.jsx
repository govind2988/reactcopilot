import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "../../../context/LoaderContext"; // Import useLoader
import profile from "./../../../assets/profile.png";
import Loader from "../../common/home/Loader";

function ListPage() {
  const [businessList, setBusinessList] = useState([]);
  const [city, setCity] = useState("Hyderabad");
  const { loading, setLoading } = useLoader(); // Use global loader state

  useEffect(() => {
    const detectCity = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBeeIWUhRhc2ZW9oKxUugzu8y9JQgFVcvA`
              );
              const addressComponents =
                response.data.results[0]?.address_components || [];
              const cityComponent = addressComponents.find((component) =>
                component.types.includes("locality")
              );
              const detectedCity = cityComponent?.long_name;
              setCity(detectedCity || "Hyderabad");
            } catch (error) {
              console.error("Error detecting city:", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    detectCity();
  }, []);

  useEffect(() => {
    const fetchBusinessList = async () => {
      setLoading(true); // Use global loader
      try {
        const response = await axios.get(
          `https://topiko.com/prod/app/gethpbusinesslistbycity.php?city=${city}`
        );
        setBusinessList(response.data || []);
      } catch (error) {
        console.error("Error fetching business list:", error);
      } finally {
        setLoading(false); // Use global loader
      }
    };

    if (city) {
      fetchBusinessList();
    }
  }, [city, setLoading]);

  return (
    <>
      <div className="text-center">
        <h1>List Page</h1>
        <p>Explore our Lists</p>
      </div>
      {loading ? (
        <Loader /> // Show loader while loading
      ) : (
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
                        src={business.logo || profile}
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
                  <div className="Goodup-grid-footer py-2 px-3">
                    <div className="Goodup-ft-first">
                      <div className="Goodup-rating">
                        <div className="Goodup-pr-average high">
                          {business.rating || "N/A"}
                        </div>
                        <div className="Goodup-aldeio">
                          <div className="Goodup-rates">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${
                                  i < (business.rated_value || 0)
                                    ? "text-warning"
                                    : ""
                                }`}
                              ></i>
                            ))}
                          </div>
                          <div className="Goodup-all-review">
                            <span>{business.rated_value || "0"} Reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Goodup-ft-last">
                      <div className="Goodup-inline">
                        <div className="Goodup-bookmark-btn">
                          <button type="button" tabIndex="0">
                            <i className="lni lni-heart-filled position-absolute"></i>
                          </button>
                        </div>
                        <div className="Goodup-bookmark-btn">
                          {business.bookmarks || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ListPage;
