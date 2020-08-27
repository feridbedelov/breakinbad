import Link from 'next/link'
import { Navbar, Nav } from "react-bootstrap"
import styles from "./Header.module.css"

function Header({ activePage }) {
    return (
        <div className={styles.header}>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Link href="/" passHref><Navbar.Brand>Euphoria</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link href="/" passHref>
                            <Nav.Link className={activePage === "home" && "active"} >Home</Nav.Link>
                        </Link>
                        <Link href="/characters/[pageId]" as={`/characters/1`} passHref>
                            <Nav.Link className={activePage === "chars" && "active"}>Characters</Nav.Link>
                        </Link>
                        <Link href="/contact" passHref>
                            <Nav.Link className={activePage === "contact" && "active"}>Contact</Nav.Link>
                        </Link>
                        <Link href="/about" passHref>
                            <Nav.Link className={activePage === "about" && "active"}>About</Nav.Link>
                        </Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    )
}

export default Header
