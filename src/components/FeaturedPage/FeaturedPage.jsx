import React from "react";
import "./FeaturedPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";

export default function FeaturedPage() {
  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderBar />
        <div className="mt-4 featured-container">
          <h2>Featured</h2>
          <h4>View community nodes</h4>
          <div className="mt-2 ml-8 featured-buttons"></div>
        </div>
      </div>
    </>
  );
}
