import styles from "./SingleChar.module.css"

function SingleChar({ char }) {
    
    return (
        <div className={`row my-4 ${styles.wrapper}`}>
            <div className="col-md-4">
                <img src={char.img} className="img-fluid rounded img-thumbnail" alt={char.name} />
            </div>
            <div className="col-md-8">
                <h2 className="display-3">Name : {char.name}</h2>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">Nickname : {char.nickname}</li>
                    <li className="list-group-item">Portrayed : {char.portrayed}</li>
                    <li className="list-group-item">Birthday : {char.birthday} </li>
                    <li className="list-group-item">Status : {char.status}</li>
                    <li className="list-group-item">Occupation : {char.occupation ? char.occupation?.join(", ") : "Unknown"}</li>
                    <li className="list-group-item">
                        Series that the character is in : {char.category}</li>
                    <li className="list-group-item">
                        Appearing in  : {char.appearance.join(", ")} season</li>
                </ul>


            </div>

        </div>
    )
}

export default SingleChar
