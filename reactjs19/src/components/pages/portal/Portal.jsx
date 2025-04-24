import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://topiko.com/prod/app/getCityListingCategories.php")
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    const formattedCategoryId = categoryId.replace(/[\s&]+/g, "-");
    navigate(`/category/${formattedCategoryId}`);
  };

  console.log("categories", categories);

  return (
    <>
      <title>Portal | My Website</title>
      <meta
        name="description"
        content="Learn more about us on the about page."
      />
      <meta
        name="keywords"
        content="Portal, React, JavaScript, semantic markup, html"
      />

      <div className="container">
        <h1>Welcome to the Info Page</h1>
        <p>This is the portal page of the application.</p>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() =>
                handleCategoryClick(category.category.toLowerCase())
              }
              style={{ cursor: "pointer", color: "blue" }}
            >
              {category.category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portal;
