import React from "react";
import "./FeaturedPage.css";
import HeaderBar from "../HeaderBar/HeaderBar";

export default function FeaturedPage() {
  return (
    <>
      <div className="flex flex-col h-screen App">
        <HeaderBar />
        <div className="mt-4 featured-container">
        <h1 className="mb-1 ml-5 text-2xl font-bold font-mulish">Featured</h1>
          <h4>View community nodes</h4>
          <div className="mt-2 ml-8 featured-buttons"></div>
        </div>
      </div>
    </>
  );
}
