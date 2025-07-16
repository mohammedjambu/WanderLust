import React from "react";
import "../../utils css/CreateListing.css";

const ProgressTracker = ({ currentStep }) => (
  <div className="progress-bar ">
    <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
      <div className="progress-dot">1</div>
      <span>Details</span>
    </div>
    <div className="progress-line"></div>
    <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
      <div className="progress-dot">2</div>
      <span>Category & Photos</span>
    </div>
  </div>
);

export default ProgressTracker;
