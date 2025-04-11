import { useEffect, useState } from "react";
import axios from "axios";
import profile from "./../../../assets/profile.png";

const Home = () => {
  const [businessList, setBusinessList] = useState([]);
  const [city, setCity] = useState("Hyderabad");

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
      try {
        const response = await axios.get(
          `https://topiko.com/prod/app/gethpbusinesslistbycity.php?city=${city}`
        );
        setBusinessList(response.data || []);
      } catch (error) {
        console.error("Error fetching business list:", error);
      }
    };

    if (city) {
      fetchBusinessList();
    }
  }, [city]);

  console.log("Business List:", businessList);
  console.log("Current City:", city);

  return (
    <>
      <section className="bg-light py-5 homepage">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xxl-8">
              <div className="text-center my-5">
                <h2 className="display-5 fw-bolder">
                  <span className="text-gradient d-inline">
                    Welcome to the Home Page
                  </span>
                </h2>
                <p className="lead fw-light mb-4">
                  My name is Start Bootstrap and I help brands grow.
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit dolorum itaque qui unde quisquam consequatur autem.
                  Eveniet quasi nobis aliquid cumque officiis sed rem iure ipsa!
                  Praesentium ratione atque dolorem?
                </p>
                <div className="d-flex justify-content-center fs-2 gap-4">
                  <a className="text-gradient" href="#!">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a className="text-gradient" href="#!">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a className="text-gradient" href="#!">
                    <i className="bi bi-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ul className="d-flex justify-content-center w-50 mx-auto list-unstyled mb-0">
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
    </>
  );
};

export default Home;
