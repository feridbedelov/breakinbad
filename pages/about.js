import Layout from "../components/Layout/Layout"
import { Accordion, Card, Button, ListGroup, Jumbotron, Container } from "react-bootstrap"

function about({ episodes, deaths }) {
    return (
        <Layout activePage="about">
            <Jumbotron fluid>
                <Container>
                    <h1 className="display-4 text-center">About Breaking Bad</h1>

                </Container>
            </Jumbotron>
            <div className="container">
                <div className="row my-4">
                    <div className="col-12 col-md-6 mb-4">
                        <h2 className='display-4'>All Series - {episodes.length} </h2>
                        <Accordion defaultActiveKey="1">
                            {episodes.map(episodeItem => {

                                const { episode_id, episode, air_date, title, season, characters } = episodeItem
                                return <Card key={episode_id}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={episode_id}>
                                            Season {season} - Episode {episode}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={episode_id}>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>Title : {title}</ListGroup.Item>
                                                <ListGroup.Item>Air Data : {air_date}</ListGroup.Item>
                                                <ListGroup.Item>Characters : {characters.join(", ")} </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            })}
                        </Accordion>
                    </div>


                    <div className="col-12 col-md-6 mb-4">
                        <h2 className='display-4'>All Deaths - {deaths.length}</h2>
                        <Accordion defaultActiveKey="1">
                            {deaths.map(deathItem => {

                                const { death_id, death, cause, responsible, last_words, season, episode } = deathItem
                                return <Card key={death_id}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={death_id}>
                                            {death}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={death_id}>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>Responsible : {responsible}</ListGroup.Item>
                                                <ListGroup.Item>Cause : {cause}</ListGroup.Item>
                                                <ListGroup.Item>Last Words : {last_words}</ListGroup.Item>
                                                <ListGroup.Item>In Which episode : {season}S {episode}E   </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            })}
                        </Accordion>
                    </div>

                </div>


            </div>
        </Layout >
    )
}

export async function getStaticProps() {

    const response = await fetch(`https://www.breakingbadapi.com/api/deaths`)
    const deaths = await response.json()

    const res = await fetch(`https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad`)
    const episodes = await res.json()
    return {
        props: { episodes, deaths }
    }
}


export default about
