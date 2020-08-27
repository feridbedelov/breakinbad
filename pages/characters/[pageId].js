import Layout from "../../components/Layout/Layout"
import { Card, Button, Pagination, Jumbotron, Container } from "react-bootstrap"
import Link from "next/link"


export default function Characters({ characters, total, currentPage }) {

    return (
        <Layout activePage="chars">
            <Jumbotron fluid>
                <Container>
                    <h2 className="display-1 text-center">All Characters</h2>
                    <p className="lead text-center">
                        This is a modified jumbotron that occupies the entire horizontal space of
                        its parent.
                    </p>
                </Container>
            </Jumbotron>
            <div className="container">

                <div className="row my-4">
                    {characters.map(character => (
                        <div key={character.char_id} className="col-lg-3 col-md-4 col-sm-6 my-2">
                            <Card>
                                <Card.Img style={{ maxHeight: "300px", minHeight: "300px" }} variant="top" src={character.img} />
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Text>{character.nickname}</Card.Text>
                                    <Link href="/char/[cid]" as={`/char/${character.char_id}`} ><Button variant="primary">View More</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="row  my-4">

                    <Pagination style={{ margin: "0 auto" }} >
                        {currentPage > 1 && <Link passHref href="/characters/pageId" as={`/characters/${+currentPage - 1}`}>
                            <Pagination.Item>
                                Prev
                            </Pagination.Item>
                        </Link>
                        }
                        {Array(total).fill("").map((_, index) => (
                            <Link passHref key={index} href="/characters/pageId" as={`/characters/${index + 1}`} >
                                <Pagination.Item active={index + 1 === +currentPage}>
                                    {index + 1}
                                </Pagination.Item>
                            </Link>
                        ))}
                        {
                            currentPage < total && <Link passHref href="/characters/pageId" as={`/characters/${+currentPage + 1}`}>
                                <Pagination.Item>
                                    Next
                                </Pagination.Item>
                            </Link>
                        }
                    </Pagination>

                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch("https://www.breakingbadapi.com/api/characters")
    const characters = await res.json()

    const lengthOfPages = Math.ceil(characters.length / 10.0);

    const paths = Array(lengthOfPages).fill('').map((_, index) => {
        return { params: { pageId: (index + 1).toString() } }
    })



    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params }) {

    const response = await fetch(`https://www.breakingbadapi.com/api/characters`)
    const totalCharacters = await response.json()
    const total = Math.ceil(totalCharacters.length / 10.0);

    const offset = (+params.pageId - 1) * 10

    const res = await fetch(`https://www.breakingbadapi.com/api/characters?limit=10&offset=${offset}`)
    const characters = await res.json()
    return {
        props: { characters, total, currentPage: params.pageId }
    }
}
