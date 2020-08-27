import Header from '../Header/Header'
import Footer from "../Footer/Footer"

import styles from "./Layout.module.css"

function Layout({ activePage, children }) {
    return (
        <div className = {styles.layout}>
            <Header activePage={activePage} />
            <main className={`${styles.main}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
