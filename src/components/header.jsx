import "../App.scss"
import { Link } from "react-router"
import React from "react"
export default function Header() {
  return (
    <header className="header">
      <Link to={"/"} ><img className="logo svg" src="logo.svg" alt="logo"/></Link>
      <Link to={"/calc"} ><img className="calc svg" src="calculate.svg" alt="calc"/></Link>
    </header>
  )
}