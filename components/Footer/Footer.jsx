import React from 'react'
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={`${styles.footer} bg-dark` }>
            Copyright {" "} {new Date().getFullYear()}
        </footer>
    )
}

export default Footer
