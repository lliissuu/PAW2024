import React from "react";

const categories = ["Technologia", "Podróże", "Kulinaria", "Lifestyle"];

const Categories = () => {
  return (
    <div className="container">
      <h2> Kategorie</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
