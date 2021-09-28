import React from "react";
import "./RightSideBar.css";
const RightSideBar = (props) => {
  const inactive = props.inactive;

  const setInactive = () => {
    console.log("hi");
    props.onCollapse(!inactive);
  };
  return (
    <div className={`right-side-menu ${inactive ? "active" : "inactive"}`}>
      <div className="top-section">
        <h2>Search filters</h2>
        <div
          className="toggle-close-btn"
          onClick={() => setInactive(!inactive)}
        >
          <span class="small material-icons">close</span>
        </div>
      </div>

      <div className="main-menu">
        <h3>Sort by</h3>
      </div>
    </div>
  );
};

export default RightSideBar;
