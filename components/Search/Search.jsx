import { useEffect, useState } from 'react'
import styles from "./Search.module.css"
import { Form, Media, Spinner } from 'react-bootstrap'
import axios from "axios"
import Link from "next/link"

function Search() {

    const [searchTerm, setSearchTerm] = useState("")
    const [requestCount, setRequestCount] = useState(0)
    const [results, setResults] = useState([])
    const [status, setStatus] = useState("neither")

    useEffect(() => {
        if (searchTerm.trim()) {
            setStatus("loading")
            const delay = setTimeout(() => {
                setRequestCount(prev => prev + 1)
            }, 600)
            return () => clearTimeout(delay)
        } else {
            setStatus("neither")
        }

    }, [searchTerm])


    useEffect(() => {
        if (requestCount) {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            async function fetchResults() {
                try {
                    const res = await axios("https://www.breakingbadapi.com/api/characters", {
                        params: {
                            name: searchTerm
                        },
                        cancelToken: source.token
                    })
                    if (res.data.length > 0) {
                        setStatus("showResults")
                        setResults(res.data)
                    } else {
                        setResults([])
                        setStatus("neither")
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            fetchResults()
            return () => source.cancel()

        }
    }, [requestCount])


    return (
        <div className={`jumbotron jumbotron-fluid `}>
            <div className="container">
                <h2 className="display-4 text-center mb-4">Search Character</h2>
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Look for character" />
                            </Form.Group>
                        </Form>

                        {status === "loading" && <div className="text-center" ><Spinner animation="border" variant="primary" /></div>}
                        {status === "showResults" &&
                            results.map(char => (
                                <Link key={char.char_id} href="/char/[cid]" as={`/char/${char.char_id}`} >
                                    <Media style={{ cursor: "pointer" }} className="border-bottom" >
                                        <img
                                            width={64}
                                            height={64}
                                            className="mr-3 rounded img-fluid img-thumbnail"
                                            src={char.img}
                                            alt={char.name}
                                        />
                                        <Media.Body>
                                            <h5>Name : {char.name}</h5>
                                            <p> NickName :  {char.nickname}</p>
                                        </Media.Body>
                                    </Media>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
