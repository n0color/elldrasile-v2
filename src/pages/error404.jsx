import error404 from "../assets/errorMeg.png";
import { Link } from "react-router";
import Header from "../components/header";
import "../styles/error404.scss";
export default function Error404() {
  return (
    <div className="error404" >
      <Header />
      <h1>Йоу! Такой страницы нет!</h1>
      <img src={error404} alt="error404" />
      <p>Давайте вернемся на <Link to={"/"}>главную</Link></p>
    </div>
  );
}