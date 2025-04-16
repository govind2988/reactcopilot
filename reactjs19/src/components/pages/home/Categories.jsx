import React, { useEffect, useState } from "react";

import profile from "./../../../assets/profile.png";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://topiko.com/prod/app/getcategories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  console.log("categories", categories);

  return (
    <>
      <div className="text-center">
        <h1>Categories</h1>
        <p>Explore our categories</p>
      </div>
      <div className="categoryList">
        {categories.slice(0, 8).map((category, index) => (
          <div className="card" key={index}>
            <img
              className="card-img-top"
              src={category.image1 || profile}
              alt={category.name || "Category"}
            />
            <div className="card-body">
              <h4 className="card-title">{category.name || "Unknown"}</h4>
              <a
                href={category.link || "javascript:void(0)"}
                className="btn btn-primary"
              >
                View More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
