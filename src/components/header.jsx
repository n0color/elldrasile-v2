import "../styles/App.scss"
import { Link } from "react-router"
import React from "react"
import logo from "../assets/logo.svg"
import calculate from "../assets/calculate.svg"
import notepad from "../assets/notepad.svg"
export default function Header() {
  return (
    <header className="header">
      <Link to={"/"} ><img className="logo svg" src={logo} alt="logo"/></Link>
      <div className="left">
        <Link to={"/wiki"} ><img className="wiki svg" src={notepad} alt="calc"/></Link>
        <Link to={"/calc"} ><img className="calc svg" src={calculate} alt="calc"/></Link>
      </div>
    </header>
  )
}