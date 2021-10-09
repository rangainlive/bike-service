// Import the required packages and files
import React from "react";
import "./Navigation.css";

function FooterComponent() {
  return (
    <div className="main-footer">
      <div>
        <div className="footer-line"></div>
        <div className="col">
          Copyright &copy; {new Date().getFullYear()} razorbikeservice.com
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
