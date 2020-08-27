import Layout from "../../components/Layout/Layout"
import Spinner from "../../components/Spinner/Spinner"
import { useRouter } from "next/router"
import styles from "../../styles/SingleChar.module.css"
import SingleChar from "../../components/SingleChar/SingleChar"

export default function Character({ char }) {

    const router = useRouter()
    console.log(router)
    return (
        <Layout activePage="chars">
            <div className={``}>
                <div className={`container`} >

                    {router.isFallback ? <div className={`${styles.wrapper}`}>
                        <Spinner />
                    </div> : <SingleChar char={char} />
                    }
                </div>
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch("https://www.breakingbadapi.com/api/characters?limit=10&offset=0")
    const firstTenChars = await res.json()

    const paths = firstTenChars.map(char => (
        { params: { cid: `${char.char_id}` } }
    ))


    return {
        paths: paths,
        fallback: true,
    }
}


export async function getStaticProps({ params }) {

    const res = await fetch(`https://www.breakingbadapi.com/api/characters/${params.cid}`)
    const char = await res.json()
    const selectedCharacted = char[0]
    return {
        props: { char: selectedCharacted }
    }
}
