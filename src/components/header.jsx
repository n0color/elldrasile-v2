import "../styles/App.scss"
import { Link } from "react-router"
import React from "react"
import logo from "../assets/logo.svg"
import calculate from "../assets/calculate.svg"
export default function Header() {
  return (
    <header className="header">
      <Link to={"/"} ><img className="logo svg" src={logo} alt="logo"/></Link>
      <Link to={"/calc"} ><img className="calc svg" src={calculate} alt="calc"/></Link>
    </header>
  )
}