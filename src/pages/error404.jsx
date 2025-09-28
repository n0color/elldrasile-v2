import error404 from "../assets/errorMeg.png";
import { Link } from "react-router";
import Header from "../components/header";
import "../styles/error404.scss";
import "../styles/index.scss";
import Footer from "../components/footer";
export default function Error404() {
  return (
    <div className="error404" >
      <Header />
      <h1 className="errorHeader">Йоу! Такой страницы нет!</h1>
      <img className="errorImg" src={error404} alt="error404" />
      <p className="errorText">Давайте вернемся на <Link to={"/"}>главную</Link></p>
      <Footer />
    </div>
  );
}
