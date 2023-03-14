import { Link } from "react-router-dom";
import logo from '../images/logo.png'


export default function Header(){
    return(

        <div className="container">
        <header>
        <img src={logo} alt="logo" />
        <Link to={"/homepage"}>Home</Link>
        <Link to={"/minasidor"}>Mina Sidor</Link>
    </header>

</div>
    )
}