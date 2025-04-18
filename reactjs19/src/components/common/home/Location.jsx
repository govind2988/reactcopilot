import React, { useState, useEffect } from "react"; // Add missing imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import profile from "./../../../assets/profile.png";
import axios from "axios"; // Import axios for API calls
const Location = ({ show, handleClose }) => {
  const [city, setCity] = useState("Hyderabad");

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
            setCity(detectedCity || "Hyderabad"); // Default to Chennai if null
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

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const { city: detectedCity } = await detectCity(); // Use imported detectCity
        setCity(detectedCity || "Hyderabad");
      } catch (error) {
        console.error("Error detecting city:", error);
      }
    };

    fetchCity();

    // Cleanup: Remove city from localStorage on browser close
    const handleBeforeUnload = () => {
      localStorage.removeItem("city");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleEnableLocation = async () => {
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
            const detectedCity = cityComponent?.long_name || "Chennai"; // Default to Chennai if null
            localStorage.setItem("city", detectedCity); // Store city in localStorage
            setCity(detectedCity); // Update state
            handleClose(); // Close the modal
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

  console.log("Location Current City:", city);

  return (
    <Modal show={show} onHide={handleClose} className="login-modal">
      <Modal.Header closeButton>
        <Modal.Title>Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="map-container">
          <img src={profile} className="img-fluid w-50" alt="Location" />
        </div>
        <p>
          Location Access Enable location access to help us service your request
          better
        </p>
        <Button variant="primary" onClick={handleEnableLocation}>
          Enable Location Access
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default Location;
