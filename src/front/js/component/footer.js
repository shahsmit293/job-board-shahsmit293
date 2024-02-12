import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <div className="footer">
    <div className="logo">
      <h3>
        <b>HireMastery</b>
      </h3>
    </div>
    <div className="tags">
      <p>About</p>
      <p>Home</p>
      <p>Blog</p>
      <p>FAQ</p>
      <p>Contact</p>
    </div>
    <div className="icons">
      <p>
        <i class="fa-brands fa-instagram"></i>
      </p>
      <p>
        <i class="fa-brands fa-facebook"></i>
      </p>
      <p>
        <i class="fa-brands fa-twitter"></i>
      </p>
    </div>
    <div>
      <p>© Made by hiremastery @ 2024 </p>
    </div>
  </div>
);
