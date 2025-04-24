import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
  const { categoryId } = useParams();
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://topiko.com/prod/app/getCityListingFilterBusinessListing.php",
        {
          category: categoryId,
        }
      )
      .then((response) => {
        const allbusinesses = response.data.response || [];
        console.log("Allbusinesses", allbusinesses);
        const filteredBusinesses = (response.data.response || []).filter(
          (business) =>
            business.category.categoryName.replace(/[\s&]+/g, "-") ===
            categoryId
        );
        setBusinesses(filteredBusinesses);
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
      });
  }, [categoryId]);

  console.log("selectedbusinesses", businesses);
  console.log("categoryId", categoryId);

  return (
    <div className="container">
      <h1>Businesses in {categoryId.replace(/-/g, " ")}</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            <h2>{business.business_name}</h2>
            <p>{business.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
