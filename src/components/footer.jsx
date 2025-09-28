import "../styles/App.scss";
import logo from "../assets/logo.svg"
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
        <img className="logo svg" src={logo} alt="logo"/>
        <p className="footer__info">© 2025 Vietta Eldrasile. Все права защищены.</p>
        <div className="footer__github">
          <a href="https://github.com/n0color" target="_blank" rel="noopener noreferrer">
            <span>GitHub</span>
          </a>
      </div>
    </footer>
  );
}