/* eslint-disable no-unused-vars */
import React from "react";
import HeaderSection from "./HeaderSection";
import SearchBar from "./SearchBar";

function HomePageAssembly() {
  return (
    <div>
      <div className="header-section">
        <div className="child">
          <HeaderSection />
          <div className="flex-col">
            <h2>Booking Football Pitches Has Never Been Easier In Lebanon</h2>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageAssembly;
