import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Container from "./Container";
import logo from "../../img/gold-coin-money.webp";
import styles from "./NavBar.module.css";

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} style={{ width: "60px" }} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default NavBar;
